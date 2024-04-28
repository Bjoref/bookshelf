import type { IBook } from '@/types/book'
import type { IPage } from '@/types/page'


export const binarySearch = (pagesArray: IPage[], id: number): IBook[] => {
  const privateArray: IBook[] = []
  pagesArray.forEach((page: IPage) => {
    page.content.forEach((book: IBook) => {
      privateArray.push(book)
    })
  })

  privateArray.splice(search(privateArray, id), 1)
  return privateArray
}

function search(arr: IBook[], target: number): number {
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
