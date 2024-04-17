<template>
  <div class="book-list__content-left">
    <h3 class="book-list__item-title">
      {{ book.title }}
    </h3>
    <p class="book-list__item-author">
      <b>Author:</b> {{ book.author }}
    </p>
    <p class="book-list__item-year">
      <b>Year:</b> {{ book.publication_year }}
    </p>
    <p class="book-list__item-genre">
      <b>Genre:</b> {{ genreString }}
    </p>
    <p class="book-list__item-description">
      {{ book.description }}
    </p>
    <div class="book-list__button-group">
      <button v-if="canAdd" class="book-list__item-button_add book-list__item-button">
        Want to read!
      </button>
      <button v-if="canRemove" class="book-list__item-button_delete book-list__item-button">
        Already read
      </button>
    </div>
  </div>
  <img :src="book.cover_image" alt="Book Image" class="book-list__item-image" />
</template>

<script setup lang="ts">
import type { IBook } from '@/types/book'

const props = defineProps<{ book: IBook; canAdd?: boolean; canRemove?: boolean }>()

const genreString = (props.book.genre as string[]).join(', ')
</script>

<style scoped></style>
