<template>
  <main class="h-screen">
    <div class="h-full grid place-content-center" v-if="$route.path === '/'">
      <RouterLink to="/" />
    </div>
    <RouterView />
  </main>
</template>
