<script setup lang="ts">
import { type InputHTMLAttributes, ref, watch } from 'vue'

defineProps<{
  type: Extract<InputHTMLAttributes['type'], 'text' | 'email' | 'date' | 'tel'>
  label: string
  error?: string
}>()

const emit = defineEmits<{ validate: [] }>()

const model = defineModel<string>()

const dirty = ref(false)

watch(model, () => dirty.value && emit('validate'))

function onBlur() {
  dirty.value = true
  emit('validate')
}
</script>

<template>
  <label class="form-control w-full max-w-md">
    <div class="label">
      <span class="label-text">{{ label }}</span>
    </div>
    <input
      :type="type"
      placeholder="Name"
      class="input input-bordered w-full max-w-md"
      :class="{ 'input-error': error }"
      v-model="model"
      @blur="onBlur"
    />
    <div class="label">
      <span class="label-text-alt h-[1em] text-error">{{ error }}</span>
    </div>
  </label>
</template>
