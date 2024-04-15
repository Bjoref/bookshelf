<template>
  <nav class="header__nav">
    <ul class="header__nav-list">
      <li class="header__nav-item">
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

<style lang="scss"></style>
