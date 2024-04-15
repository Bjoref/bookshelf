<template>
  <div class="container">
    <header class="header">
      <router-link to="/catalog">Catalog Page</router-link >
      <!-- <router-link @click="routeToSettings">Settings Page</router-link > -->
    </header>
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter, RouterLink, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
</script>

<style scoped>
body {
  background-color: #e1e1e1;
}

.container {
  width: 80%;
  margin: 0 auto;
}

.header {
  display: flex;
  gap: 12px;
}
</style>
