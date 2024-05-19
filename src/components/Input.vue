<script setup lang="ts">
import { type InputHTMLAttributes, ref, watch } from 'vue'
import InputLabel from '@/components/InputLabel.vue'

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
  <InputLabel :label :error>
    <input
      :type="type"
      placeholder=""
      class="input input-bordered w-full"
      :class="{ 'input-error': error }"
      v-model="model"
      @blur="onBlur"
    />
  </InputLabel>
</template>
