import { ref } from 'vue'
import { defineStore } from 'pinia'

export const pagesData = defineStore('pagesData', () => {
  const currentPage = ref<number>(0)
  const maxPages = ref<number>(0)
  const pages = ref<number[]>([])

  const setPages = (value: number) => {
    let closeNumbers:number
    console.log(value)
    if(value >= 3) {
      closeNumbers = 2
    } else {
      closeNumbers = value-1
    }

    pages.value = []

    if (currentPage.value === 1) {
      console.log(1)
      if(2 >= value) {
        closeNumbers = 1
      } else {
        closeNumbers = 2
      }
      pages.value.push(currentPage.value)
      for (let i = 1; i <= closeNumbers; i++) {
        pages.value.push(i + 1)
      }
    } else if (currentPage.value === maxPages.value) {
      pages.value.push(currentPage.value)
      for (let i = 1; i <= closeNumbers; i++) {
        pages.value.push(maxPages.value - i)
      }
    } else {
      pages.value.push(currentPage.value - 1)
      pages.value.push(currentPage.value)
      if(currentPage.value + 1 <= value) {
        pages.value.push(currentPage.value + 1)
      }
      console.log(currentPage.value)
    }

    pages.value.sort()
  }

  return { currentPage, maxPages, pages, setPages }
})
