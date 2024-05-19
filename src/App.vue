<script setup lang="ts"></script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/user">User</RouterLink>
        <RouterLink to="/user-form">User Form</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
