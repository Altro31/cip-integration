
export function usePageTitle (translatedKey: string) {
  const { t } = useI18n()

  useHead({
    title () {
      return `CIP | ${t(translatedKey)}`
    }
  })
}
