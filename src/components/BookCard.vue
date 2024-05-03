<template>
  <div class="book-list__content-left">
    <h3 class="book-list__item-title font-bold">
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
      <button v-if="canAdd" @click="addToRead" class="book-list__item-button_add book-list__item-button" :data-book-id="book.id">
        Want to read!
      </button>
      <button v-if="canRemove" @click="addToAlreadyRead" class="book-list__item-button_delete book-list__item-button" :data-book-id="book.id">
        Already read
      </button>
      <button v-if="canReturn" @click="addToLibrary" class="book-list__item-button_add book-list__item-button" :data-book-id="book.id">
        Return To Library
      </button>
    </div>
  </div>
  <img :src="book.cover_image" alt="Book Image" class="book-list__item-image" />
</template>

<script setup lang="ts">
import type { IBook } from '@/types/book'

const emits = defineEmits(['addToRead', 'addToAlreadyRead', 'addToLibrary'])
const props = defineProps<{ book: IBook; canAdd?: boolean; canRemove?: boolean, canReturn?: boolean }>()

const genreString = (props.book.genre as string[]).join(', ');

const addToRead = (e: Event) => {
  const target = e.target as HTMLButtonElement;
  emits('addToRead', Number(target.dataset.bookId));
}
const addToAlreadyRead = (e: Event) => {
  const target = e.target as HTMLButtonElement;
  emits('addToAlreadyRead', Number(target.dataset.bookId));
}

const addToLibrary = (e: Event) => {
  const target = e.target as HTMLButtonElement;
  emits('addToLibrary', Number(target.dataset.bookId));
}
</script>

<style scoped></style>
