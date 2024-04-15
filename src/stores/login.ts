import { ref } from 'vue'
import { defineStore } from 'pinia'

export const userAuthorization = defineStore('authorization', () => {
  const login = ref(false)
  function logToggle() {
    if (login.value === true) {
      login.value = false
    } else {
      login.value = true
    }
  }

  return { login, logToggle }
})
