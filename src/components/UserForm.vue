<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import Input from '@/components/Input.vue'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user, userValidation } = storeToRefs(userStore)
</script>

<template>
  <form class="flex flex-col">
    <Input
      type="text"
      label="First Name"
      v-model="user.firstName"
      :error="userValidation.firstName"
      @validate="userStore.validateField('firstName')"
    />
    <Input
      type="text"
      label="Last Name"
      v-model="user.lastName"
      :error="userValidation.lastName"
      @validate="userStore.validateField('lastName')"
    />
    <Input
      type="email"
      label="Email"
      v-model="user.email"
      :error="userValidation.email"
      @validate="userStore.validateField('email')"
    />
    <Input
      type="tel"
      label="Phone"
      v-model="user.phone"
      :error="userValidation.phone"
      @validate="userStore.validateField('phone')"
    />
    <Input
      type="date"
      label="Birthday"
      v-model="user.birthday"
      :error="userValidation.birthday"
      @validate="userStore.validateField('birthday')"
    />
  </form>
</template>
