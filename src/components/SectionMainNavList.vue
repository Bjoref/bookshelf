<template>
  <nav class="section-main__nav">
    <ul class="section-main__nav-list">
      <li class="section-main__nav-item">
        <RouterLink to="/">Reading List</RouterLink>
      </li>
      <li>
        <RouterLink to="/finished">Finished Books</RouterLink>
      </li>
      <li>
        <RouterLink to="/about">Finished Books</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

