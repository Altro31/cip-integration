import type { Schema } from '~/utils/interface/Schema'
import { FormState } from '~/utils/enums/form-state'

export function useLoginConfig () {
  const { t, locale } = useI18n()
  const { signIn } = useAuth()

  const state = ref(FormState.INITIAL)

  const rules = computed(() => {
    locale
    return {
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
    password: '',
    remember: true
  })

  async function onFinish (values: any) {
    try {
      state.value = FormState.LOADING
      await signIn(values, { redirect: true, callbackUrl: '/' })
      state.value = FormState.INITIAL
    } catch (e) {
      state.value = FormState.ERROR
    }
  }

  function onSubmit () {

  }

  return { state, rules, formState, onFinish, onSubmit }
}
