<template>
  <div>
    <h3 class="book-list__item-title">
      {{ book.title }}
    </h3>
    <p class="book-list__item-author">
      {{ book.author }}
    </p>
    <p class="book-list__item-year">
      {{ book.publication_year }}
    </p>
    <p v-for="genre in book.genre" :key="genre" class="book-list__item-genre">
      {{ genre }}
    </p>
    <p class="book-list__item-description">
      {{ book.description }}
    </p>
  </div>
  <img :src="book.cover_image" alt="Book Image" class="book-list__item-image"/>
</template>

<script setup lang="ts">
import type { IBook } from '@/types/book'

const props = defineProps<{ book: IBook }>()
</script>

<style scoped></style>
