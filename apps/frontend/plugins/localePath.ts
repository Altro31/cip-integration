export default defineNuxtPlugin(() => {
  const localePath = useLocalePath()
  return {
    provide: {
      path: localePath
    }
  }
})
