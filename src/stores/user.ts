import { useSessionIDBKeyval } from '@/utils/session-kv'
import { useSessionStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { z } from 'zod'

const userSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string(),
  birthday: z.string().date(),
  about: z.string().optional(),
  avatar: z.instanceof(File)
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

  return { user, userValidation, isFinished, validate, validateField }
})
