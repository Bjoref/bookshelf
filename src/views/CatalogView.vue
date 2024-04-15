<template>
  <h2>Каталог</h2>
  <div class="filters">
    <p>Поиск</p>
    <input type="searchText" v-model="searchText" placeholder="Введите больше 2-ух символов" />

  </div>
  <div class="product-list">
    <BookCard
      v-for="book in books"
      :key="book.id"
      :book="book"
    />
  </div>

</template>

<script setup lang="ts">
import {watch, ref} from "vue";
import { getBooks } from "@/api/getBooks";
import BookCard from "@/components/BookCard.vue";
import type { IBook } from "@/types/book";

const books = ref<IBook[]>([]);

const searchText = ref('');

const loadProducts = async (searchText?: string) => {
  const response = getBooks(searchText);
  books.value = (await response);
};

watch(searchText, (newValue, oldValue) => {
  if(newValue.length > 2) {
    loadProducts(newValue);
  } else {
    loadProducts();
  }
}, {immediate: true});
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
