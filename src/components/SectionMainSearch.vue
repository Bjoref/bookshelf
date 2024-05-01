<template>
  <input type="text" v-model="searchText" class="section-main__input-search" @input="$emit('search', searchText)"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchText = ref('')
</script>
