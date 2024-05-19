import { useSessionIDBKeyval } from '@/utils/session-kv'
import { zFile, zPhoneNumber } from '@/utils/zod'
import { useSessionStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { readonly } from 'vue'
import { z } from 'zod'

const userSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: zPhoneNumber,
  birthday: z.string().date(),
  about: z.string().optional(),
  avatar: zFile({ allowedFileTypes: ['image/png', 'image/jpeg', 'image/gif'], maxSizeMB: 5 })
})

type User = z.infer<typeof userSchema>

export const useUserStore = defineStore('user', () => {
  const { data: user, isFinished } = useSessionIDBKeyval<Partial<User>>(
    'user:user',
    {},
    { deep: true }
  )
  const userValidation = useSessionStorage<Partial<Record<keyof User, string>>>(
    'user:user-validation',
    {}
  )
  const isSubmitted = useSessionStorage('user:is-submitted', false)

  async function validate() {
    const validation = await userSchema.safeParseAsync(user.value)

    userValidation.value = {}
    if (validation.error) {
      for (const issue of validation.error.issues) {
        userValidation.value[issue.path[0] as keyof User] = issue.message
      }
    }
    return validation.success
  }

  async function validateField(field: keyof User) {
    const fieldValue = user.value[field]
    const validation = await userSchema.shape[field].safeParseAsync(fieldValue)

    delete userValidation.value[field]
    if (validation.error) {
      userValidation.value[field] = validation.error.issues[0].message
    }
  }

  async function submit() {
    const isValid = await validate()
    if (isValid) isSubmitted.value = true
    return isValid
  }

  return {
    user,
    userValidation,
    isFinished,
    isSubmitted: readonly(isSubmitted),
    validate,
    validateField,
    submit
  }
})
