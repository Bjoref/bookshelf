<template>
  <div class="container section-main__container">
    <Pagination
      :pages-number="currentPage.pages"
      :current-page="currentPage.currentPage"
      :max-pages="currentPage.maxPages"
      @get-page="checkoutNav"
    />
    <Search @search="search" />
    <div class="section-main__content">
      <NavList @checkout-nav="checkoutNav" />
      <RouterView
        :books="bookList.currentBookList"
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
import Search from './SectionMainSearch.vue'
import router from '@/router/router'

//stores
import { newBookList } from '@/stores/currentBookList'
import { pagesData } from '@/stores/currentPage'
import { userAuthorization } from '@/stores/login'

//api
import { getBooks } from '@/api/getBooks'
import { sliceIntoChunks } from '@/api/sliceIntoChunks'
import { getPage } from '@/api/getPage'
import { returnArrayAndExcludedObj } from '@/api/returnArrayAndExcludedObj'
import { intoOneArray } from '@/api/intoOneArray'

//types
import type { IPage } from '@/types/page'
import type { IObjInSearch } from '@/types/objInSearch'
import type { IBook } from '@/types/book'

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
      getPage(
        currentPage.currentPage,
        intoOneArray(bookList.bookshelfList).length,
        bookList.bookshelfList
      )
      break
    case 'readinglist':
      canAdd.value = false
      canRemove.value = true
      getPage(
        currentPage.currentPage,
        intoOneArray(bookList.toReadList).length,
        bookList.toReadList
      )
      break
    case 'alreadyreadlist':
      canAdd.value = true
      canRemove.value = false
      getPage(
        currentPage.currentPage,
        intoOneArray(bookList.alreadyReadList).length,
        bookList.alreadyReadList
      )
      break
  }
}

const loadProducts = async (searchText?: string) => {
  if (!authorization.loggedIn) {
    const response = getBooks(searchText)
    bookList.bookshelfList = await response
    books.value = await response
    currentPage.maxPages = 5
    currentPage.currentPage = 1
    authorization.loggedIn = true
  } else {
    return
  }
}

const addToRead = (id: number) => {
  if (router.currentRoute.value.name === 'home') {
    addBookToList(bookList.bookshelfList, id, 'bookshelfList', bookList.toReadList, 'toReadList')
  } else if (router.currentRoute.value.name === 'alreadyreadlist') {
    addBookToList(
      bookList.alreadyReadList,
      id,
      'alreadyReadList',
      bookList.toReadList,
      'toReadList'
    )
  }
}
const addToAlreadyRead = (id: number) => {
  if (router.currentRoute.value.name === 'home') {
    addBookToList(
      bookList.bookshelfList,
      id,
      'bookshelfList',
      bookList.alreadyReadList,
      'alreadyReadList'
    )
  } else if (router.currentRoute.value.name === 'readinglist') {
    addBookToList(
      bookList.toReadList,
      id,
      'toReadList',
      bookList.alreadyReadList,
      'alreadyReadList'
    )
  }
}

const addBookToList = (
  propList: IPage[],
  id: number,
  listName: string,
  listTo: IPage[],
  listToName: string
) => {
  if (propList.length) {
    const obj: IObjInSearch = returnArrayAndExcludedObj(propList, id)
    if (obj.newArray.length) {
      switch (listName) {
        case 'bookshelfList':
          bookList.bookshelfList = sliceIntoChunks(obj.newArray, 10)
          bookList.currentBookList = bookList.bookshelfList[currentPage.currentPage - 1].content
          break
        case 'alreadyReadList':
          bookList.alreadyReadList = sliceIntoChunks(obj.newArray, 10)
          bookList.currentBookList = bookList.alreadyReadList[currentPage.currentPage - 1].content
          break
      }
    } else {
      switch (listName) {
        case 'bookshelfList':
          bookList.bookshelfList = []
          break
        case 'toReadList':
          bookList.toReadList = []
          break
        case 'alreadyReadList':
          bookList.alreadyReadList = []
          break
      }
      bookList.currentBookList = []
    }
    if (!listTo.length) {
      switch (listToName) {
        case 'toReadList':
          bookList.toReadList = sliceIntoChunks(obj.excluded, 10)
          break
        case 'alreadyReadList':
          bookList.alreadyReadList = sliceIntoChunks(obj.excluded, 10)
          break
      }
    } else {
      if (listToName === 'toReadList') {
        const privateArray = intoOneArray(bookList.toReadList)
        privateArray.push(obj.excluded[0])
        bookList.toReadList = sliceIntoChunks(privateArray, 10)
      } else if (listToName === 'alreadyReadList') {
        const privateArray = intoOneArray(bookList.alreadyReadList)
        privateArray.push(obj.excluded[0])
        bookList.alreadyReadList = sliceIntoChunks(privateArray, 10)
      }
    }
    switch (listName) {
      case 'bookshelfList':
        updateMaxPages(bookList.bookshelfList)
        break
      case 'toReadList':
        updateMaxPages(bookList.toReadList)
        break
      case 'alreadyReadList':
        updateMaxPages(bookList.alreadyReadList)
        break
    }
  }
}

const updateMaxPages = (value: IPage[]): void => {
  if (value.length <= currentPage.pages.length) {
    currentPage.setPages(value.length)
  }
}

const search = (data: string) => {
  const allBooks: IBook[] = intoOneArray(bookList.bookshelfList)
  bookList.currentBookList = []
  allBooks.forEach((book) => {
    if(book.title.toLocaleLowerCase().includes(data.toLocaleLowerCase())) {
      bookList.currentBookList.push(book)
    }
  })
  // switch (router.currentRoute.value.name) {
  //   case 'home':

  //     break
  //   case 'readinglist':
  //     console.log(intoOneArray(bookList.toReadList))

  //     break
  //   case 'alreadyreadlist':
  //     console.log(intoOneArray(bookList.alreadyReadList))

  //     break
  // }
}

watch(
  books,
  () => {
    if (!books.value.length) {
      bookList.currentBookList = []
      return
    }
    checkoutNav(router.currentRoute.value.name as string)
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

  &__input {
    &-search {
      max-width: 30%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid var(--primary-color);
    }
  }

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
