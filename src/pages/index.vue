<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main class="min-h-screen mt-10 px-4">
    <div
      class="h-full min-h-screen grid grid-cols-2 gap-4 place-content-center mx-auto max-w-xl -mt-20"
      v-if="$route.path === '/'"
    >
      <RouterLink to="/user" class="btn btn-primary w-full aspect-square h-full text-2xl"
        >User</RouterLink
      >
      <RouterLink to="/user-form" class="btn btn-secondary w-full aspect-square h-full text-2xl"
        >User Form</RouterLink
      >
    </div>
    <RouterView v-else />
  </main>
  <Footer />
</template>
