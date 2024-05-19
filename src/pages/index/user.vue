<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useObjectUrl } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { user, isSubmitted } = storeToRefs(useUserStore())

const avatarUrl = useObjectUrl(computed(() => user.value.avatar))
</script>

<template>
  <div class="max-w-lg w-full mx-auto">
    <h1 class="text-2xl pb-10">User</h1>
    <div class="flex flex-col gap-6" v-if="isSubmitted">
      <div class="avatar">
        <div class="w-32 rounded-full">
          <img :src="avatarUrl" />
        </div>
      </div>
      <section>
        <h2 class="text-xl">First Name</h2>
        <p>{{ user.firstName }}</p>
      </section>
      <section>
        <h2 class="text-xl">Last Name</h2>
        <p>{{ user.lastName }}</p>
      </section>
      <section>
        <h2 class="text-xl">Email</h2>
        <p>{{ user.email }}</p>
      </section>
      <section>
        <h2 class="text-xl">Phone</h2>
        <p>{{ user.phone }}</p>
      </section>
      <section>
        <h2 class="text-xl">Birthday</h2>
        <p>{{ user.birthday }}</p>
      </section>
      <section>
        <h2 class="text-xl">About</h2>
        <p class="text-wrap break-words">{{ user.about }}</p>
      </section>
    </div>
    <h2 v-else>Submit the form to see data</h2>
  </div>
</template>
