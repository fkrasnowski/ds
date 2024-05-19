<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main class="h-screen">
    <div class="h-full grid place-content-center" v-if="$route.path === '/'">
      <RouterLink to="/user">User</RouterLink>
      <RouterLink to="/user-form">User Form</RouterLink>
    </div>
    <RouterView v-else />
  </main>
  <Footer />
</template>
