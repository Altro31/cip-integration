<script lang="ts" setup>
const { to } = defineProps<{
    to: string
}>()
</script>

<template>
    <NuxtLink :to="to" :class="{ 'text-blue-400': $route.path === to }"
        class="py-2 px-3 hover:bg-black/5 rounded-md transition-colors font-[500] text-black">
        <slot />
    </NuxtLink>
</template>