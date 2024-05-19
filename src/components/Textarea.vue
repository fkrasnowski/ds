<script setup lang="ts">
import { ref, watch } from 'vue'
import InputLabel from '@/components/InputLabel.vue'

defineProps<{
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
    <textarea
      placeholder=""
      class="input input-bordered w-full min-h-32 max-w-md"
      :class="{ 'input-error': error }"
      v-model="model"
      @blur="onBlur"
    />
  </InputLabel>
</template>
