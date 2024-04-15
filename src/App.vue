<template>
  <section class="section-login" v-if="!login.login">
    <LogIn/>
  </section>
  <div v-if="login.login">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
  
      <div class="wrapper">
        <HelloWorld msg="You did it!" />
  
        <nav>
          <RouterLink to="/">Reading List</RouterLink>
          <RouterLink to="/finished">Finished Books</RouterLink>
          <RouterLink to="/about">Finished Books</RouterLink>
        </nav>
      </div>
    </header>
  
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import HelloWorld from './components/HelloWorld.vue'
  import LogIn from './components/LogIn.vue'

  import { userAuthorization } from '@/stores/login'

  const login = userAuthorization()
</script>

<style scoped>
</style>
