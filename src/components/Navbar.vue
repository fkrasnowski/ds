<template>
  <nav class="navbar bg-base-100">
    <div class="navbar-start">
      <RouterLink to="/">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="32" height="32" />
      </RouterLink>
    </div>
    <div class="navbar-center">
      <ul class="menu menu-horizontal px-1">
        <div role="tablist" class="tabs tabs-bordered">
          <RouterLink to="/user" class="tab" :class="{ 'tab-active': $route.path === '/user' }">
            User
          </RouterLink>
          <RouterLink
            to="/user-form"
            class="tab"
            :class="{ 'tab-active': $route.path === '/user-form' }"
          >
            User Form
          </RouterLink>
        </div>
      </ul>
    </div>
    <div class="navbar-end"></div>
  </nav>
</template>
