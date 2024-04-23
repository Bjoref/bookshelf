import { ref } from 'vue'
import { defineStore } from 'pinia'

export const pagesData = defineStore('pagesData', () => {
  const currentPage = ref<number>(0)
  const maxPages = ref<number>(0)
  return { currentPage, maxPages }
})
