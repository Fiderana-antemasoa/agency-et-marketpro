// Shared utilities library
// These are minimal stubs; actual implementations are in each frontend's lib/utils.ts

export type ClassValue = string | undefined | null | { [key: string]: any } | ClassValue[]

export function cn(...inputs: ClassValue[]): string {
  // This is a simplified version - each project imports from their own @/lib/utils
  // which has the real implementation with clsx + tailwind-merge
  return String(inputs.filter(Boolean).join(' '))
}