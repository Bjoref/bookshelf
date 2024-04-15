<template>
    <button class="header__authorization-button" @click="authorization.logToggle">{{ buttonText }}</button>
</template>

<script setup lang="ts">
    defineProps<{
        buttonText: string
    }>()
    import { userAuthorization } from '@/stores/login'

    const authorization = userAuthorization()
</script>
