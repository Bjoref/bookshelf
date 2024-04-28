import { newBookList } from '@/stores/currentBookList'
import { pagesData } from '@/stores/currentPage'

export const getPage = (selectedPage: number, books: number): void => {
  const bookList = newBookList()
  const currentPage = pagesData()
  currentPage.currentPage = selectedPage
  currentPage.setPages(books)
  bookList.currentBookList = bookList.bookshelfList[selectedPage - 1].content
}
