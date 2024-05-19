import { useIDBKeyval, type UseIDBOptions } from '@vueuse/integrations/useIDBKeyval'
import { computed } from 'vue'
import { useSessionStorage } from '@vueuse/core'

export const useSessionIDBKeyval = <T>(key: string, defaultValue: T, options: UseIDBOptions) => {
  const { data, ...idb } = useIDBKeyval(key, defaultValue, options)
  const isActiveSession = useSessionStorage('active-session', false)

  return {
    ...idb,
    data: computed<T>({
      get() {
        if (isActiveSession.value) return data.value
        else {
          data.value = defaultValue
          isActiveSession.value = true
          return defaultValue
        }
      },
      set(newValue) {
        data.value = newValue
      }
    })
  }
}
