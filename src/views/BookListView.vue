<template>
  <!-- <div class="filters">
    <p>Поиск</p>
    <input type="searchText" v-model="searchText" placeholder="Введите больше 2-ух символов" />

  </div> -->
  <ul class="book-list__list">
    <li class="book-list__item" v-for="book in props.books" :key="book.id">
      <BookCard
        :book="book"
        :can-add="canAdd"
        :can-remove="canRemove"
        @add-to-read="addToRead"
        @add-to-already-read="addToAlreadyRead"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { IBook } from '@/types/book'
import BookCard from '../components/BookCard.vue'
const emits = defineEmits(['addToRead', 'addToAlreadyRead'])

const addToRead = (id: number) => {
  emits('addToRead', id)
}
const addToAlreadyRead = (id: number) => {
  emits('addToAlreadyRead', id)
}
const props = defineProps<{ books: IBook[]; canAdd?: boolean; canRemove?: boolean }>()
</script>

<style lang="scss">
.book-list {
  &__list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-gap: 20px;
  }

  &__content {
    &-left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  &__item {
    display: flex;
    grid-gap: 10px;
    background-color: var(--white-color);
    padding: 16px;

    &-description {
      margin-bottom: 16px;
    }

    &-genre {
      margin-bottom: 8px;
    }

    &-image {
      width: 150px;
      height: 200px;
    }

    &-button {
      width: 150px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      &_add {
        margin-bottom: 8px;
        border: 2px solid var(--primary-color);
        transition:
          border 0.2s,
          color 0.2s,
          background-color 0.2s;
        &:hover {
          color: var(--bright-primary-color);
          border: 2px solid var(--bright-primary-color);
        }
        &:active {
          color: var(--white-color);
          border: 2px solid var(--primary-color);
          background-color: var(--primary-color);
        }
      }
      .un:hover::after {
        width: 100%;
      }
      &_delete {
        display: inline-block;

        transition:
          color 0.2s,
          background-color 0.2s;
        &::after {
          content: '';
          width: 0px;
          height: 1px;
          display: block;
          background: var(--primary-color);
          transition: 300ms;
        }

        &:hover {
          &::after {
            width: 100%;
          }
        }
        &:active {
          color: var(--white-color);
          border: 2px solid var(--primary-color);
          background-color: var(--primary-color);
        }
      }
    }
  }
}
</style>
