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
import type { IBook } from '@/types/book'
import type { IObjInSearch } from '@/types/objInSearch'

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
      getPage(1, intoOneArray(bookList.bookshelfList).length, bookList.bookshelfList)
      break
    case 'readinglist':
      canAdd.value = false
      getPage(1, intoOneArray(bookList.toReadList).length, bookList.toReadList)
      break
    case 'alreadyreadlist':
      canAdd.value = true
      canRemove.value = false
      getPage(1, intoOneArray(bookList.alreadyReadList).length, bookList.alreadyReadList)
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
    if (bookList.bookshelfList.length) {
      const obj:IObjInSearch = returnArrayAndExcludedObj(bookList.bookshelfList, id)
      bookList.bookshelfList = sliceIntoChunks(obj.newArray, 10)
      bookList.currentBookList = bookList.bookshelfList[currentPage.currentPage-1].content
      if(!bookList.toReadList.length) {
        bookList.toReadList = sliceIntoChunks(obj.excluded, 10)
      } else {
        const privateArray = intoOneArray(bookList.toReadList)
        privateArray.push(obj.excluded[0])
        bookList.toReadList = sliceIntoChunks(privateArray, 10)
      }
    }
  }
  // if (router.currentRoute.value.name === 'readinglist') {
  //   if (bookList.toReadList.length) {
  //     bookList.toReadList= sliceIntoChunks(returnArrayAndExcludedObj(bookList.toReadList, id), 10)
  //   }
  // }
  // if (router.currentRoute.value.name === 'alreadyreadlist') {
  //   if (bookList.alreadyReadList.length) {
  //     bookList.alreadyReadList= sliceIntoChunks(returnArrayAndExcludedObj(bookList.alreadyReadList, id), 10)
  //   } 
  // }
  // let foundId = returnArrayAndExcludedObj(pagesArray, id)
  // console.log(foundId)
  // bookList.bookshelfList.forEach((item) => {
  //   console.log(item)
  // })
}

const addToAlreadyRead = (id: number) => {
  // bookList.toReadList.forEach((book, index) => {
  //   if (book.id === id) {
  //     bookList.alreadyReadList.push(book)
  //     bookList.toReadList.splice(index, 1)
  //   }
  // })
  // books.value = sliceIntoChunks(bookList.allBooks, 10)
  // updateMaxPages(books.value)
}

const updateMaxPages = (value: IPage[]): void => {
  if (value.length <= currentPage.pages.length) {
    currentPage.setPages(value.length)
  }
}

router.beforeEach((to) => {
  checkoutNav(to.name as string)
})


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
