import type { IBook } from "@/types/book"

export const binarySearch = (arr: IBook[], target: number): number => {
    arr = arr.sort((a, b) => a.id - b.id)
    let low = 0
    let high = arr.length - 1
  
    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
  
      if (arr[mid].id === target) {
        return mid
      } else if (arr[mid].id < target) {
        low = mid + 1
      } else {
        high = mid - 1
      }
    }
    return -1
  }
  