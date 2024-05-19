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
    <h1 class="text-2xl">User</h1>
    <div class="flex flex-col gap-6 py-10" v-if="isSubmitted">
      <div class="avatar">
        <div class="w-32 rounded-full">
          <img :src="avatarUrl" />
        </div>
      </div>
      <section>
        <h2 class="text-xl">First Name</h2>
        {{ user.firstName }}
      </section>
      <section>
        <h2 class="text-xl">Last Name</h2>
        {{ user.lastName }}
      </section>
      <section>
        <h2 class="text-xl">Email</h2>
        {{ user.email }}
      </section>
      <section>
        <h2 class="text-xl">Phone</h2>
        {{ user.phone }}
      </section>
      <section>
        <h2 class="text-xl">Birthday</h2>
        {{ user.birthday }}
      </section>
      <section>
        <h2 class="text-xl">About</h2>
        {{ user.about }}
      </section>
    </div>
  </div>
</template>
