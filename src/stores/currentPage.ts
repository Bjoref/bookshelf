import { ref } from 'vue'
import { defineStore } from 'pinia'
import { newBookList } from '@/stores/currentBookList'

export const pagesData = defineStore('pagesData', () => {
  const currentPage = ref<number>(0)
  const maxPages = ref<number>(0)
  const pages = ref<number[]>([])
  const bookList = newBookList()
  const closeNumbers = ref<number>(1)

  const setPages = (value: number, to: string): void => {
    switch (to) {
      case 'home':
        pages.value = [...Array(bookList.bookshelfList.length).keys()].map((i) => i + 1)
        break
      case 'readinglist':
        pages.value = [...Array(bookList.toReadList.length).keys()].map((i) => i + 1)
        break
      case 'alreadyreadlist':
        pages.value = [...Array(bookList.alreadyReadList.length).keys()].map((i) => i + 1)
        break
    }
    if (!pages.value.length) pages.value = [...Array(1).keys()].map((i) => i + 1)

    if (pages.value.length > 3) {
      closeNumbers.value = 1
      if(currentPage.value === 1) {
        pages.value = [...Array(3).keys()].map((i) => i + 1)
      } else if(currentPage.value-1 !== 0) {
        if(currentPage.value + 1 > maxPages.value) {
          pages.value = [currentPage.value - 2, currentPage.value - 1, currentPage.value]
        } else {
          pages.value = [currentPage.value - 1, currentPage.value, currentPage.value + 1]
        }
        pages.value.sort()
      }
    }
  }

  return { currentPage, maxPages, pages, setPages }
})
