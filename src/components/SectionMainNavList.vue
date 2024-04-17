<template>
  <nav class="section-main__nav">
    <ul class="section-main__nav-list">
      <li class="section-main__nav-item">
        <RouterLink class="section-main__nav-link" to="/">Bookshelf</RouterLink>
      </li>
      <li class="section-main__nav-item">
        <RouterLink class="section-main__nav-link" to="/finished">Finished Books</RouterLink>
      </li>
      <li class="section-main__nav-item">
        <RouterLink class="section-main__nav-link" to="/about">Finished Books</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

