<script setup lang="ts">
defineProps<{
    src: string,
    alt: string,
}>()
</script>

<template>
    <NuxtImg :src="src" :alt="alt"
             class="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
    />
</template>