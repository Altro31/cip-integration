<script lang="ts" setup>


const { data } = await useFetchPerfiles()
provide(perfilesKey, data)
</script>

<template>
    <main class="pt-20 min-h-screen flex gap-8 container px-16 mx-auto">
        <section class="basis-80">
            <LayoutPerfilesList :perfiles="data!" />
        </section>
        <section class="flex-1">
            <slot />
        </section>
    </main>
</template>