<template>
    <div class="container section-login__container">
        <button class="section-login__button" @click="authorization.logToggle">Login</button>
    </div>
</template>

<script setup lang="ts">
    import { userAuthorization } from '@/stores/login'

    const authorization = userAuthorization()
</script>

<style lang="scss">
.section-login {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &__button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        border: 1px solid var(--black-color);
        font-size: 16px;
    }
}
</style>
