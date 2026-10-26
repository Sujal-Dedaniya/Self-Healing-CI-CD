import { type ClassValue, clsx as clsxImport } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsxImport(inputs))
}