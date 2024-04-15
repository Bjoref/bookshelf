<template>

  <div>
    {{ book }}
  </div>

</template>

<script setup lang="ts">
import type {IBook} from "@/types/book";
import {computed, ref} from "vue";

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
.product {
  width: 200px;
  margin: 10px;
  border: 1px solid transparent;
  border-radius: 6px;
}
.product-with-small-price {
  border: 1px solid #027502;
}
.product-img-top {
  width: 100%;
  height: 200px;
  object-fit: contain;
  background-color: white;
  border-radius: 6px 6px 0 0;
}
.product-title {
  font-size: 1.25rem;
  font-weight: 700;
}
.product-text {
  font-size: 1rem;
}
.product-text-with-small-price {
  color: #027502;
}
.product-body {
  padding: 4px;
}
h5 {
  margin: 16px 0;
}
</style>