<template>
  <the-header 
    :authorization="authorization.login"
  />
  <section class="section-welcome" v-if="!authorization.login">
    <SectionWelcome/>
  </section>
  <div v-if="authorization.login">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    </header>

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'

import { RouterView } from 'vue-router'
import SectionWelcome from './components/SectionWelcome.vue'

import { userAuthorization } from '@/stores/login'

const authorization = userAuthorization()
</script>

<style scoped></style>
