<template>
  <!-- <div class="filters">
    <p>Поиск</p>
    <input type="searchText" v-model="searchText" placeholder="Введите больше 2-ух символов" />

  </div> -->
  <ul class="section-main__list">
    <li class="section-main__item" v-for="book in books" :key="book.id">
      <BookCard :book="book" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { getBooks } from '@/api/getBooks'
import BookCard from '@/components/BookCard.vue'
import type { IBook } from '@/types/book'

const books = ref<IBook[]>([])

const searchText = ref('')

const loadProducts = async (searchText?: string) => {
  const response = getBooks(searchText)
  books.value = await response
}

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
  &__list {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 20px;
  }
}
</style>
