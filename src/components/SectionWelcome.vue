<template>
  <div class="container section-welcome__container">
    <h1 class="section-welcome__title">Hello there!</h1>
    <h2 class="section-welcome__second-title">Stack:</h2>

    <ul class="section-welcome__list">
      <li class="section-welcome__item">
        <IconVue />
        <a
          class="section-welcome__item-link"
          href="https://vuejs.org/guide/quick-start"
          target="_blank"
        >
          Vue.js
        </a>
      </li>
      <li class="section-welcome__item">
        <IconPinia />
        <a class="section-welcome__item-link" href="https://pinia.vuejs.org/" target="_blank">
          Pinia
        </a>
      </li>
      <li class="section-welcome__item">
        <IconTs />
        <a
          class="section-welcome__item-link"
          href="https://www.typescriptlang.org/"
          target="_blank"
        >
          TypeScript
        </a>
      </li>
      <li class="section-welcome__item">
        <IconScss />
        <a class="section-welcome__item-link section-welcome__item-link" href="https://sass-lang.com/guide/" target="_blank">
          SCSS
        </a>
        &&
        <a
          class="section-welcome__item-link"
          href="https://cli.vuejs.org/guide/css.html"
          target="_blank"
        >
          SCSS in Vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import IconPinia from './icons/IconPinia.vue'
import IconVue from './icons/IconVue.vue'
import IconTs from './icons/IconTs.vue'
import IconScss from './icons/IconScss.vue'
</script>

<style lang="scss">
.section-welcome {
  padding-top: 80px;
  padding-bottom: 80px;
  &__title {
    margin-bottom: 8px;
    font-size: 48px;
  }

  &__second-title {
    margin-bottom: 8px;
    font-size: 32px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 20px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-gap: 8px;
    & > svg {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
