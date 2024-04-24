<template>
  <div class="container section-main__container">
    <Pagination
      :pages-number="currentPage.pages"
      :current-page="currentPage.currentPage"
      :max-pages="currentPage.maxPages"
      @get-page="getPage"
    />
    <div class="section-main__content">
      <NavList @checkout-nav="checkoutNav" />
      <RouterView
        :books="
          router.currentRoute.value.name === 'home'
            ? bookList.currentBookList
            : router.currentRoute.value.name === 'readinglist'
              ? bookList.toReadList
              : bookList.alreadyReadList
        "
        :can-add="canAdd"
        :can-remove="canRemove"
        @add-to-read="addToRead"
        @add-to-already-read="addToAlreadyRead"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { RouterView } from 'vue-router'
import NavList from './SectionMainNavList.vue'
import Pagination from './SectionMainPagination.vue'
import { sliceIntoChunks } from '@/functions/sliceIntoChunks'
import router from '@/router/router'

import { newBookList } from '@/stores/currentBookList'
import { pagesData } from '@/stores/currentPage'
import { userAuthorization } from '@/stores/login'

import { getBooks } from '@/api/getBooks'
import type { IPage } from '@/types/page'

const bookList = newBookList()
const currentPage = pagesData()
const authorization = userAuthorization()

const canAdd = ref(true)
const canRemove = ref(true)

const books = ref<IPage[]>([])

const searchText = ref('')

const checkoutNav = (to: string) => {
  switch (to) {
    case 'home':
      canAdd.value = true
      canRemove.value = true
      books.value = sliceIntoChunks(bookList.allBooks, 10)
      break
    case 'readinglist':
      canAdd.value = false
      books.value = sliceIntoChunks(bookList.toReadList, 10)
      break
    case 'alreadyreadlist':
      canAdd.value = true
      canRemove.value = false
      books.value = sliceIntoChunks(bookList.alreadyReadList, 10)
      break
  }
}

const loadProducts = async (searchText?: string) => {
  if (!authorization.loggedIn) {
    const response = getBooks(searchText)
    books.value = await response
    currentPage.maxPages = 5
    currentPage.currentPage = 1
    authorization.loggedIn = true
  } else {
    return
  }
}

const getPage = (selectedPage: number): void => {
  if (!books.value.length) {
    bookList.currentBookList = []
  } else {
    currentPage.currentPage = selectedPage
    currentPage.setPages(books.value.length)
    books.value.forEach((item) => {
      if (item.page === selectedPage) {
        bookList.currentBookList = item.content
      }
    })
  }
}

const addToRead = (id: number) => {
  bookList.allBooks.forEach((book, index) => {
    if (book.id === id) {
      bookList.toReadList.push(book)
      bookList.allBooks.splice(index, 1)
      return
    }
  })

  if (bookList.alreadyReadList.length > 0) {
    bookList.alreadyReadList.forEach((book, index) => {
      if (book.id === id) {
        bookList.alreadyReadList.splice(index, 1)
        bookList.toReadList.push(book)
      }
    })
  }
  books.value = sliceIntoChunks(bookList.allBooks, 10)
  updateMaxPages(books.value)
}

const addToAlreadyRead = (id: number) => {
  bookList.toReadList.forEach((book, index) => {
    if (book.id === id) {
      bookList.alreadyReadList.push(book)
      bookList.toReadList.splice(index, 1)
    }
  })
  books.value = sliceIntoChunks(bookList.allBooks, 10)
  updateMaxPages(books.value)
}

const updateMaxPages = (value: IPage[]): void => {
  if (value.length <= currentPage.pages.length) {
    currentPage.setPages(value.length)
  }
}

router.beforeEach((to) => {
  checkoutNav(to.name as string)
})

checkoutNav(router.currentRoute.value.name as string)

watch(
  books,
  () => {
    if (!books.value.length) {
      bookList.currentBookList = []
      return
    }
    getPage(1)
  },
  { immediate: true }
)
watch(
  searchText,
  (newValue) => {
    if (newValue.length > 2) {
      loadProducts(newValue)
    } else {
      loadProducts()
    }
  },
  { immediate: true }
)
</script>

<style lang="scss">
.section-main {
  padding-top: 80px;
  padding-bottom: 80px;
  font-size: 16px;

  &__container {
    display: flex;
    flex-direction: column;
  }

  &__pagination {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    grid-gap: 10px;

    &-button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      color: var(--primary-color);
      font-weight: 700;
      border: 2px solid var(--primary-color);
      transition:
        border 0.2s,
        color 0.2s;
      &_active {
        color: var(--bright-primary-color);
        border: 2px solid var(--bright-primary-color);
      }
      &_disabled {
        pointer-events: none;
        opacity: 0.5;
        background-color: var(--grey-color);
      }
    }
  }

  &__content {
    display: flex;
  }

  &__nav {
    &-list {
      margin-right: 30px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 20px;
      width: 200px;
      justify-content: flex-start;
      background: var(--white-color);
      grid-gap: 10px;
      font-size: 16px;
    }

    &-link {
      padding-left: 10px;
      color: var(--primary-color);
      transition: border 0.1s;

      &.router-link-active {
        padding-left: 9px;
        color: var(--bright-primary-color);
        border-left: 4px solid var(--primary-color);
      }
    }
  }
}
</style>
