<template>
  <div class="container section-welcome__container mx-auto">
    <div>
      <h1 class="section-welcome__title">Hello there!</h1>
      <h2 class="section-welcome__second-title">Stack:</h2>

      <ul class="section-welcome__list">
        <li class="section-welcome__item">
          <IconVue />
          <a
            class="section-welcome__item-link"
            href="https://vuejs.org/guide/quick-start"
            target="_blank"
          >
            Vue.js
          </a>
        </li>
        <li class="section-welcome__item">
          <IconPinia />
          <a class="section-welcome__item-link" href="https://pinia.vuejs.org/" target="_blank">
            Pinia
          </a>
        </li>
        <li class="section-welcome__item">
          <IconTs />
          <a
            class="section-welcome__item-link"
            href="https://www.typescriptlang.org/"
            target="_blank"
          >
            TypeScript
          </a>
        </li>
        <li class="section-welcome__item">
          <IconScss />
          <a
            class="section-welcome__item-link section-welcome__item-link"
            href="https://sass-lang.com/guide/"
            target="_blank"
          >
            SCSS
          </a>
          &&
          <a
            class="section-welcome__item-link"
            href="https://cli.vuejs.org/guide/css.html#pre-processors"
            target="_blank"
          >
            SCSS in Vue
          </a>
        </li>
      </ul>
    </div>
    <Pagination
      :pages-number="currentPage.pages"
      :current-page="currentPage.currentPage"
      :max-pages="currentPage.maxPages"
      :welcome="true"
      @get-page="checkoutNav"
    />
    <ul class="book-list__list">
      <li class="book-list__item" v-for="book in bookList.currentBookList" :key="book.id">
        <BookCard :book="book" :can-add="false" :can-remove="false" :can-return="false" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import IconPinia from './icons/IconPinia.vue'
import IconVue from './icons/IconVue.vue'
import IconTs from './icons/IconTs.vue'
import IconScss from './icons/IconScss.vue'

import Pagination from './SectionMainPagination.vue'

import BookCard from './BookCard.vue'

import { getBooks } from '@/api/getBooks'
import { getPage } from '@/api/getPage'
import { intoOneArray } from '@/api/intoOneArray'

import { newBookList } from '@/stores/currentBookList'
import { pagesData } from '@/stores/currentPage'

const bookList = newBookList()
const currentPage = pagesData()

const loadProducts = async (searchText?: string) => {
  const response = getBooks(searchText)
  bookList.welcomeBookshelf = await response
  currentPage.maxPages = bookList.welcomeBookshelf.length
  currentPage.currentPage = 1
  checkoutNav('welcome')
}

const checkoutNav = (to: string = 'welcome') => {
  getPage(
    currentPage.currentPage,
    intoOneArray(bookList.welcomeBookshelf).length,
    bookList.welcomeBookshelf,
    to
  )
}
loadProducts()
</script>

<style lang="scss">
.section-welcome {
  padding-top: 80px;
  padding-bottom: 80px;
  font-size: 16px;
  &__title {
    margin-bottom: 8px;
    font-size: 48px;
  }

  &__second-title {
    margin-bottom: 8px;
    font-size: 32px;
  }

  &__list {
    margin-bottom: 20px;
    display: flex;
    align-items: flex-start;
    font-size: 20px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-gap: 8px;
    & > svg {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
