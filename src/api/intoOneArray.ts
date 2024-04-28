import type { IBook } from '@/types/book'
import type { IPage } from '@/types/page'

export const intoOneArray = (pagesArray: IPage[]): IBook[] => {
    const privateArray: IBook[] = []
  pagesArray.forEach((page: IPage) => {
    page.content.forEach((book: IBook) => {
      privateArray.push(book)
    })
  })
  return privateArray
}
