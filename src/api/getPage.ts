import { newBookList } from '@/stores/currentBookList'
import { pagesData } from '@/stores/currentPage'
import type { IPage } from '@/types/page'

export const getPage = (selectedPage: number, books: number, list: IPage[], to:string): void => {
  const bookList = newBookList()
  const currentPage = pagesData()
  currentPage.currentPage = selectedPage
  currentPage.setPages(books, to)
  if (list && list.length < 1) {
    bookList.currentBookList = []
  } else {
    bookList.currentBookList = list[selectedPage - 1].content
  }
}
