<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";

const counter = useCounterStore();
</script>

<template>
  <main class="example">
    <p>Текущее значение {{ counter.count }} </p>
    <p>Удвоенное значение {{ counter.doubleCount }} </p>

    <button @click="counter.increment">Increment</button>
  </main>
</template>

<style>
.example {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
}
</style>
