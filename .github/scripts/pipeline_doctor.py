#!/usr/bin/env python3
"""
Pipeline Doctor: Autonomous CI/CD Self-Healing Agent powered by Google Gemini API.
"""

import argparse
import json
import os
import re
import subprocess
import sys
from typing import Dict, List, Optional

try:
    from google import genai
    from google.genai import types
except ImportError:
    print("❌ Error: 'google-genai' is not installed. Run 'pip install google-genai'.")
    sys.exit(1)


def run_command(cmd: List[str], check: bool = False) -> subprocess.CompletedProcess:
    """Helper to run a shell command safely."""
    return subprocess.run(cmd, capture_output=True, text=True, check=check)


def read_log_file(log_path: str) -> str:
    """Read and sanitize error logs."""
    if not os.path.exists(log_path):
        return "No log file found."
    with open(log_path, "r", encoding="utf-8", errors="replace") as f:
        content = f.read()
    # Strip potential ANSI escape codes
    ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')
    clean = ansi_escape.sub('', content)
    # Return the tail end of the log where the actual error occurs
    return clean[-5000:] if len(clean) > 5000 else clean


def get_git_diff() -> str:
    """Retrieve recent git diff context."""
    res = run_command(["git", "diff", "HEAD~1"])
    if res.returncode == 0 and res.stdout.strip():
        return res.stdout[:4000]
    return "No git diff available."


def ask_gemini_for_fix(error_log: str, git_diff: str, api_key: str) -> Optional[dict]:
    """Invoke Gemini API to diagnose and propose file fixes."""
    client = genai.Client(api_key=api_key)

    prompt = f"""
You are an expert CI/CD self-healing agent. A software build failed in the CI/CD pipeline.
Analyze the error log and the recent git diff to determine the exact root cause, then fix the code.

=== ERROR LOG ===
{error_log}

=== RECENT GIT DIFF ===
{git_diff}

INSTRUCTIONS:
1. Diagnose the exact cause of failure (e.g. missing import, typo, missing dependency/shade, syntax error, export mismatch).
2. Provide the FULL revised file content for any modified file.
3. Respond ONLY in valid JSON matching this exact schema:

{{
  "analysis": "Short explanation of what broke and why",
  "files": [
    {{
      "path": "relative/path/to/file.tsx",
      "content": "// COMPLETE new file content here"
    }}
  ]
}}
"""

    print("🤖 Consulting Gemini (gemini-3.8-flash) for diagnosis and patch...")
    try:
        response = client.models.generate_content(
            model="gemini-3.8-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=0.2,
            ),
        )

        raw_text = response.text.strip()
        return json.loads(raw_text)
    except Exception as e:
        print(f"❌ Gemini API call failed: {e}")
        return None


def apply_fixes(files: List[Dict[str, str]]) -> List[str]:
    """Write proposed fixes to the repository filesystem."""
    modified_paths = []
    for item in files:
        rel_path = item.get("path")
        content = item.get("content")
        if not rel_path or content is None:
            continue

        abs_path = os.path.abspath(rel_path)
        os.makedirs(os.path.dirname(abs_path), exist_ok=True)
        with open(abs_path, "w", encoding="utf-8") as f:
            f.write(content)
        modified_paths.append(rel_path)
        print(f"📝 Applied patch to: {rel_path}")

    return modified_paths


def verify_build(build_cmd: str) -> bool:
    """Run verification in the current environment to ensure the patch works."""
    print(f"🧪 Verifying patch with '{build_cmd}'...")
    res = subprocess.run(build_cmd, shell=True, capture_output=True, text=True)
    if res.returncode == 0:
        print("✅ Verification PASSED! The build succeeded with the patch.")
        return True
    else:
        print("❌ Verification FAILED. The patch did not resolve the issue.")
        print("Verification Output Tail:\n", res.stderr[-1000:] or res.stdout[-1000:])
        return False


def create_pr_or_commit(analysis: str, modified_files: List[str], branch_name: str, mode: str):
    """Commit and either open a Pull Request or push directly."""
    run_command(["git", "config", "user.name", "github-actions[bot]"])
    run_command(["git", "config", "user.email", "github-actions[bot]@users.noreply.github.com"])

    gh_token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    repo = os.environ.get("GITHUB_REPOSITORY")
    if gh_token and repo:
        run_command(["git", "remote", "set-url", "origin", f"https://x-access-token:{gh_token}@github.com/{repo}.git"])

    fix_branch = f"auto-fix/ci-{os.environ.get('GITHUB_RUN_ID', 'local')}"

    if mode == "pr":
        print(f"🔀 Creating branch '{fix_branch}'...")
        run_command(["git", "checkout", "-b", fix_branch])
        run_command(["git", "add"] + modified_files)
        commit_msg = f"fix(ci): autonomous self-healing fix\n\n{analysis}"
        run_command(["git", "commit", "-m", commit_msg])
        
        # Push branch
        print("🚀 Pushing fix branch to origin...")
        push_res = run_command(["git", "push", "--set-upstream", "origin", fix_branch])
        if push_res.returncode != 0:
            print(f"Warning: git push failed ({push_res.stderr.strip()}). Skipping PR creation.")
            return

        # Open Pull Request using GitHub CLI if available
        pr_title = "🤖 [Auto-Heal] Fix CI/CD pipeline failure"
        pr_body = f"""## 🩺 Automated CI/CD Self-Healing Report

### Root Cause Analysis:
{analysis}

### Modified Files:
{chr(10).join(f"- `{f}`" for f in modified_files)}

---
*Generated autonomously by **Pipeline Doctor** via Google Gemini API.*
"""
        gh_res = run_command([
            "gh", "pr", "create",
            "--title", pr_title,
            "--body", pr_body,
            "--head", fix_branch,
            "--base", branch_name
        ])
        if gh_res.returncode == 0:
            print(f"🎉 Created Self-Healing Pull Request: {gh_res.stdout.strip()}")
        else:
            print(f"Note: gh pr create returned: {gh_res.stderr.strip()}")

    elif mode == "commit":
        print(f"📌 Committing fix directly to '{branch_name}'...")
        run_command(["git", "add"] + modified_files)
        run_command(["git", "commit", "-m", f"fix(ci): autonomous self-healing fix\n\n{analysis}"])
        run_command(["git", "push", "origin", branch_name])
        print("🚀 Pushed self-healing commit directly to branch.")


def main():
    parser = argparse.ArgumentParser(description="Autonomous CI/CD Healing via Google Gemini")
    parser.add_argument("--log-file", required=True, help="Path to build error log file")
    parser.add_argument("--build-cmd", default="npm run build", help="Command to verify build")
    parser.add_argument("--branch", default="main", help="Target branch name")
    parser.add_argument("--mode", choices=["pr", "commit"], default="pr", help="Open a PR or commit directly")
    args = parser.parse_args()

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("❌ Error: GEMINI_API_KEY environment variable is not set.")
        sys.exit(1)

    print("🔍 Reading pipeline error logs and git history...")
    error_log = read_log_file(args.log_file)
    git_diff = get_git_diff()

    # Step 1: Diagnose and get proposed fix from Gemini
    result = ask_gemini_for_fix(error_log, git_diff, api_key)
    if not result or "files" not in result or not result["files"]:
        print("⚠️ Gemini could not generate a verified patch. Escalating to human.")
        sys.exit(1)

    analysis = result.get("analysis", "Automated fix applied.")
    print(f"📋 Diagnosis: {analysis}")

    # Step 2: Apply the proposed files
    modified_files = apply_fixes(result["files"])
    if not modified_files:
        print("⚠️ No valid files to modify. Aborting.")
        sys.exit(1)

    # Step 3: Sandbox Verification
    verified = verify_build(args.build_cmd)
    if not verified:
        print("⚠️ Rollback: Discarding unverified changes to prevent regressions.")
        run_command(["git", "reset", "--hard", "HEAD"])
        sys.exit(1)

    # Step 4: Act (PR or Direct Commit)
    create_pr_or_commit(analysis, modified_files, args.branch, args.mode)


if __name__ == "__main__":
    main()
