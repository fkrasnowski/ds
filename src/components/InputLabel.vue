<script setup lang="ts">
defineProps<{ label: string; error?: string }>()
</script>

<template>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text">{{ label }}</span>
    </div>
    <slot />
    <div class="label">
      <span class="label-text-alt h-[1em] text-error">{{ error }}</span>
    </div>
  </label>
</template>
