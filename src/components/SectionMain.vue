<template>
  <div class="container section-main__container">
    <Pagination :pages-number="books.length" :current-page="1" @get-page="getPage"/>
    <div class="section-main__content">
      <NavList/>
      <RouterView :books="bookList.currentBookList" :can-add="canAdd" :can-remove="canRemove"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { RouterView } from 'vue-router'
import NavList from './SectionMainNavList.vue'
import Pagination from './SectionMainPagination.vue'

import { newBookList } from '@/stores/currentBookList'

import { getBooks } from '@/api/getBooks'
import type { IPage } from '@/types/page'

const bookList = newBookList();

const canAdd = ref(true)
const canRemove = ref(true)

const books = ref<IPage[]>([])

const searchText = ref('')

const loadProducts = async (searchText?: string) => {
  const response = getBooks(searchText)
  books.value = await response
}

const getPage = (selectedPage:number):void => {
  books.value.forEach((item) => {
    if(item.page === selectedPage) {
      bookList.currentBookList = item.content
    }
  })
}

watch(
  books,
  (newValue, oldValue) => {
    getPage(1)
  },
  { immediate: true }
)

watch(
  searchText,
  (newValue, oldValue) => {
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
    grid-gap: 10px;

    &-button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      color: var(--primary-color);
      font-weight: 700;
      border: 2px solid var(--primary-color);
      transition: border .2s, color .2s;
      &_active {
        color: var(--bright-primary-color);
        border: 2px solid var(--bright-primary-color);
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
