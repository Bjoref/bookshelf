<template>
  <header class="header">
    <div class="container header__container mx-auto">
      <a href="#" class="header__logo-link">
        <img class="header__logo-img" src="@/assets/logo.svg" alt="Logo" />
      </a>
      <div class="header__content-right">
        <AuthorizationButton :button-text="authorization ? 'Logout' : 'Login'" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import AuthorizationButton from './TheHeaderAuthorizationButton.vue'

defineProps<{
  authorization: boolean
}>()
</script>

<style lang="scss">
.header {
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: var(--white-color);
  box-shadow: 5px 5px 15px 0px rgba(0, 0, 0, 0.3);

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo-img {
    width: 150px;
    height: 42px;
  }

  &__content {
    &-right {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__authorization-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
    font-weight: 700;
    font-size: 16px;

    &:hover {
      background-color: var(--primary-color);
      color: var(--white-color);
    }
  }
}
</style>
