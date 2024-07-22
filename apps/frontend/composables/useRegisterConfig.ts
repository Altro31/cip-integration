import type { Schema } from '~/utils/interface/Schema'
import { FormState } from '~/utils/enums/form-state'

export function useRegisterConfig() {
  const { t, locale } = useI18n()
  const { $path } = useNuxtApp()
  const { signUp } = useAuth()

  const state = ref(FormState.INITIAL)

  const rules = computed(() => {
    locale
    return {
      name: [
        { required: true, message: t('username-required') },
      ],
      email: [
        { required: true, message: t('email-required') },
        { type: 'email', message: t('invalid-email') }
      ],
      password: [
        { required: true, message: t('password-required') },
        { type: 'string' }
      ]
    } satisfies Schema
  })

  const formState = reactive({
    email: '',
    name: '',
    password: '',
    confirm: '',
  })

  async function onFinish(values: any) {
    try {
      const { confirm, ...rest } = values
      state.value = FormState.LOADING
      await signUp(rest, { redirect: true, callbackUrl: $path('/') })
      state.value = FormState.INITIAL
    } catch (e) {
      state.value = FormState.ERROR
    }
  }

  function onSubmit() {

  }

  return { state, rules, formState, onFinish, onSubmit }
}
