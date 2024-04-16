<template>
  <div class="container section-main__container">
    <NavList/>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import NavList from './SectionMainNavList.vue'
import { RouterView } from 'vue-router'
</script>

<style lang="scss">
.section-main {
  padding-top: 80px;
  padding-bottom: 80px;
  font-size: 16px;

  &__container {
    display: flex;
  }

  &__nav {
    &-list {
    margin-right: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 20px;
    width: 200px;
    justify-content: flex-start;
    background: var(--white-color);
    grid-gap: 10px;
    font-size: 16px;
    }
  }
}
</style>
