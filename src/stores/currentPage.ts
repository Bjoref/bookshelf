import { ref } from 'vue'
import { defineStore } from 'pinia'

export const pagesData = defineStore('pagesData', () => {
  const currentPage = ref<number>(0)
  const maxPages = ref<number>(0)
  const pages = ref<number[]>([])

  const setPages = (value: number) => {
    let closeNumbers: number
    if (value >= 3) {
      closeNumbers = 2
    } else if (value === 0) {
      closeNumbers = 0
    } else {
      closeNumbers = value - 1
    }

    pages.value = []

    if (currentPage.value === 1) {
      if (2 >= value && value !== 0) {
        closeNumbers = 1
      } else if (value === 0) {
        closeNumbers = 0
      } else {
        closeNumbers = 2
      }
      if (value !== 0 && value !== 1) {
        for (let i = 1; i <= closeNumbers; i++) {
          pages.value.push(i + 1)
        }
      }
      pages.value.push(currentPage.value)
    } else if (currentPage.value === maxPages.value) {
      pages.value.push(currentPage.value)
      for (let i = 1; i <= closeNumbers; i++) {
        pages.value.push(maxPages.value - i)
      }
    } else {
      pages.value.push(currentPage.value - 1)
      pages.value.push(currentPage.value)
      if (currentPage.value + 1 <= value) {
        pages.value.push(currentPage.value + 1)
      }
    }

    pages.value.sort()
  }

  return { currentPage, maxPages, pages, setPages }
})
