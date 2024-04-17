import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IBook } from '@/types/book'


export const newBookList = defineStore('bookList', () => {
  const currentBookList = ref<IBook[]>([])

  function newListValue(newValue:IBook[]):void {
    currentBookList.value = newValue
  }

  return { currentBookList }
})
