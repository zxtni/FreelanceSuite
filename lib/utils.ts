/**
 * Utility Functions
 * Helper functions for class names, formatting, etc.
 * 
 * @author Rahul Mondal (zxtni)
 * @website https://www.zxtni.dev
 * @github https://github.com/zxtni
 * @telegram https://t.me/zxtni
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Class name merger - www.zxtni.dev
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
