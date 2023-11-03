import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { ChatListProps } from '@/contents/conversation/chat-list'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const markConsecutiveDuplicates = (
  arr: (ChatListProps & { position?: string })[]
) => {
  const result: (ChatListProps & { position?: string })[] = []
  let consecutiveCount = 1

  for (let i = 1; i < arr.length; i++) {
    if (arr[i]?.sender === arr[i - 1]?.sender) {
      consecutiveCount++
    } else {
      if (consecutiveCount >= 2) {
        result.push({ ...arr[i - consecutiveCount], position: 'first' })
        for (let j = 1; j < consecutiveCount - 1; j++) {
          result.push({
            ...arr[i - consecutiveCount + j],
            position: 'middle',
          })
        }
        result.push({ ...arr[i - 1], position: 'last' })
      } else {
        result.push({ ...arr[i - 1] })
      }
      consecutiveCount = 1
    }
  }

  if (consecutiveCount >= 2) {
    result.push({ ...arr[arr.length - consecutiveCount], position: 'first' })
    for (let j = 1; j < consecutiveCount - 1; j++) {
      result.push({
        ...arr[arr.length - consecutiveCount + j],
        position: 'middle',
      })
    }
    result.push({ ...arr[arr.length - 1], position: 'last' })
  } else {
    result.push({ ...arr[arr.length - 1] })
  }

  return result
}
