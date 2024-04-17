<template>
  <the-header
    :authorization="authorization.login"
  />
  <section class="section-welcome" v-if="!authorization.login">
    <section-welcome/>
  </section>
  <section class="section-main" v-if="authorization.login">
    <section-main/>
  </section>
</template>

<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'

import SectionWelcome from './components/SectionWelcome.vue'
import SectionMain from './components/SectionMain.vue'

import { userAuthorization } from '@/stores/login'

const authorization = userAuthorization()

import { newBookList } from '@/stores/currentBookList'

const bookList = newBookList();
</script>

<style scoped></style>
