import { newBookList } from '@/stores/currentBookList'
import { pagesData } from '@/stores/currentPage'
import type { IPage } from '@/types/page'

export const getPage = (selectedPage: number, books: number, list:IPage[]): void => {
  const bookList = newBookList()
  const currentPage = pagesData()
  currentPage.currentPage = selectedPage
  currentPage.setPages(books)
  bookList.currentBookList = list[selectedPage - 1].content
}
