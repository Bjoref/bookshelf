<template>
  <ul class="section-main__pagination">
    <li class="section-main__pagination-item">
      <button
        class="section-main__pagination-button"
        :disabled="!canPaginateLeft"
        :class="{ 'section-main__pagination-button_disabled': !canPaginateLeft }"
      >
        <svg
          width="16px"
          height="16px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12H18M6 12L11 7M6 12L11 17"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </li>
    <li class="section-main__pagination-item" v-for="number in pagesNumber" :key="number">
      <button
        @click="getPage"
        class="section-main__pagination-button"
        :class="{ 'section-main__pagination-button_active': number === currentPage }"
        :data-test="number"
      >
        {{ number }}
      </button>
    </li>
    <li class="section-main__pagination-item">
      <button
        class="section-main__pagination-button"
        :disabled="!canPaginateRight"
        :class="{ 'section-main__pagination-button_disabled': !canPaginateRight }"
      >
        <svg
          width="16px"
          height="16px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12H18M18 12L13 7M18 12L13 17"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ pagesNumber: number[]; currentPage: number; maxPages: number }>()
const emits = defineEmits(['getPage'])

const canPaginateLeft = computed(() => false)
const canPaginateRight = computed(() => true)

const getPage = (event: Event) => {
  const target = event.target as HTMLButtonElement
  document.querySelectorAll('.section-main__pagination-button').forEach((el) => {
    el.classList.remove('section-main__pagination-button_active')
  })

  target.classList.add('section-main__pagination-button_active')

  emits('getPage', Number(target.textContent))
}
</script>
