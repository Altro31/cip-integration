declare module '#app' {
  interface NuxtApp {
    $path: ReturnType<typeof useLocalePath>
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $path: ReturnType<typeof useLocalePath>
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $path: ReturnType<typeof useLocalePath>
  }
}

export {}
