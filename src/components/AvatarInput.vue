<script setup lang="ts">
import { ref } from 'vue'
import InputLabel from '@/components/InputLabel.vue'
import { useDropZone, useObjectUrl } from '@vueuse/core'

defineProps<{ label: string; error?: string; accept?: string }>()

const emit = defineEmits<{ validate: [] }>()

const model = defineModel<File>()

const input = ref<HTMLInputElement>()
const dropzone = ref<HTMLElement>()

const { isOverDropZone } = useDropZone(dropzone, { onDrop })

const fileUrl = useObjectUrl(model)

async function onChange() {
  const file = input.value?.files?.[0]
  model.value = file
  emit('validate')
}

function onDrop(files: File[] | null) {
  if (files?.length) {
    model.value = files[0]
    emit('validate')
  }
}
</script>

<template>
  <InputLabel :label :error>
    <div ref="dropzone" class="dropzone" :class="{ dragging: isOverDropZone }">
      <div class="avatar">
        <img v-if="fileUrl && !error" :src="fileUrl" />
      </div>
      <span>Click or drag file here</span>
      <input ref="input" type="file" class="hidden" @input="onChange" :accept />
    </div>
  </InputLabel>
</template>

<style scoped>
.dropzone {
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: 12rem;
  border-radius: var(--rounded-btn);
  border: 1px solid var(--fallback-bc, oklch(var(--bc) / 0.2));
  transition: background-color 0.2s ease-in-out;
  padding: 1rem;
}

.dropzone.dragging {
  background-color: #becad5bb;
  color: black;
}

.avatar {
  --avatar-size: 10rem;
  width: var(--avatar-size);
  height: var(--avatar-size);
  min-width: var(--avatar-size);
  border-radius: 100%;
  background-color: #becad5;
}

@media screen and (max-width: 300px) {
    .avatar {
        --avatar-size: 7rem;
    }
}

img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  padding: 0.5rem;
  object-fit: cover;
}
</style>
