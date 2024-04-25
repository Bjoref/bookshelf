import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IBook } from '@/types/book'
import type { IPage } from '@/types/page'


export const newBookList = defineStore('bookList', () => {
  const bookshelfList = ref<IPage[]>([])
  const toReadList = ref<IPage[]>([])
  const alreadyReadList = ref<IPage[]>([])
  const currentBookList = ref<IBook[]>([])
  return { currentBookList, toReadList, alreadyReadList, bookshelfList }
})
