<template>
  <!-- <div class="filters">
    <p>Поиск</p>
    <input type="searchText" v-model="searchText" placeholder="Введите больше 2-ух символов" />

  </div> -->
  <ul class="book-list__list">
    <li class="book-list__item" v-for="book in books" :key="book.id">
      <BookCard :book="book" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { IBook } from '@/types/book'
import BookCard from '../components/BookCard.vue'

const props = defineProps<{ books: IBook[] }>()
</script>

<style lang="scss">
.book-list {
  &__list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-gap: 20px;
  }

  &__item {
    display: flex;
    grid-gap: 10px;

    &-image {
      width: 150px;
      height: 200px;
    }
  }
}
</style>
