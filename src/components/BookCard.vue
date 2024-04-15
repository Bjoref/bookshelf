<template>

  <div>
    {{ book }}
  </div>

</template>

<script setup lang="ts">
import type {IBook} from "@/types/book";
import {ref} from "vue";

const productPrivate = ref<IBook>();
const getBook = async (productId: number): Promise<void>  => {
  const fetchResponse = await fetch(`https://freetestapi.com/api/v1/books/${productId}`);
  const response = await fetchResponse.json();
  productPrivate.value = response
}


const props = defineProps<{ book: IBook }>();

getBook(props.book.id)

</script>

<style scoped>

</style>