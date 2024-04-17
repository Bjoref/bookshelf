<template>
    <ul class="section-main__pagination">
        <li class="section-main__pagination-item" v-for="index in pagesNumber" :key="index">
            <button @click="getPage" class="section-main__pagination-button" :class="{ 'section-main__pagination-button_active': index === currentPage }">
                {{ index }}
            </button>
        </li>
    </ul>
</template>

<script setup lang="ts">
const props = defineProps<{ pagesNumber: number, currentPage: number }>()
const emits = defineEmits(['getPage'])

const getPage = (event: Event) => {
    const target = event.target as HTMLButtonElement
    document.querySelectorAll('.section-main__pagination-button').forEach((el) => {
        el.classList.remove('section-main__pagination-button_active')
    })

    target.classList.add('section-main__pagination-button_active');

    emits('getPage', Number(target.textContent));
}
</script>
