<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import Input from '@/components/Input.vue'
import { storeToRefs } from 'pinia'
import Textarea from '@/components/Textarea.vue'
import AvatarInput from '@/components/AvatarInput.vue'
import { useRouter } from 'vue-router/auto'

const userStore = useUserStore()
const { user, userValidation, isFinished, isSubmitted } = storeToRefs(userStore)

const router = useRouter()

async function onSubmit() {
  const submitted = await userStore.submit()
  if (submitted) {
    router.replace('/user')
  }
}
</script>

<template>
  <form v-if="isFinished && !isSubmitted" class="flex flex-col my-4">
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
    <Textarea
      label="About"
      v-model="user.about"
      :error="userValidation.about"
      @validate="userStore.validateField('about')"
    />
    <AvatarInput
      label="Avatar"
      v-model="user.avatar"
      :error="userValidation.avatar"
      @validate="userStore.validateField('avatar')"
    />
    <button type="submit" @click.prevent="onSubmit" class="btn btn-primary w-full my-4">
      Submit
    </button>
  </form>
  <div v-else-if="isSubmitted">Form submitted</div>
</template>
