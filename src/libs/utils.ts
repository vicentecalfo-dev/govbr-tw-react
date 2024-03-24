import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }

export function getUIDClassName(){
  return Math.floor(Math.random() * 10000).toString();
}