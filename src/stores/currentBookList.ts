import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IBook } from '@/types/book'


export const newBookList = defineStore('bookList', () => {
  const allBooks = ref<IBook[]>([])
  const currentBookList = ref<IBook[]>([])
  return { currentBookList, allBooks }
})
