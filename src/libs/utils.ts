import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { uuid } from 'uuidv4'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }

export function getUIDClassName(){
  //return Math.floor(Math.random() * 10000).toString();
  return uuid();
}