<template>
  <nav class="section-main__nav">
    <ul class="section-main__nav-list">
      <li class="section-main__nav-item">
        <RouterLink class="section-main__nav-link" to="/" data-to="home" @click="checkoutNav">Bookshelf</RouterLink>
      </li>
      <li class="section-main__nav-item">
        <RouterLink class="section-main__nav-link" to="/readinglist" data-to="readinglist" @click="checkoutNav">Reading list</RouterLink>
      </li>
      <li class="section-main__nav-item">
        <RouterLink class="section-main__nav-link" to="/alreadyreadlist" data-to="alreadyreadlist" @click="checkoutNav">Finished Books</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
const emits = defineEmits(['checkoutNav'])

const checkoutNav = (e: Event) => {
  const target = e.target as HTMLLinkElement
  emits('checkoutNav', target.dataset.to)
}
</script>

