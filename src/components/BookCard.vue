<template>
  <h3 class="section-main__item-title">
    {{ book.title }}
  </h3>
  <p class="section-main__item-author">
    {{ book.author }}
  </p>
  <p class="section-main__item-year">
    {{ book.publication_year }}
  </p>
  <p v-for="genre in book.genre" :key="genre" class="section-main__item-genre">
    {{ genre }}
  </p>
  <p class="section-main__item-description">
    {{ book.description }}
  </p>
  <img :src="book.cover_image" alt="Book Image" class="section-main__item-image"/>
</template>

<script setup lang="ts">
import type { IBook } from '@/types/book'

const props = defineProps<{ book: IBook }>()
</script>

<style scoped></style>
