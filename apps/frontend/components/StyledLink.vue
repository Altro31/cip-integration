<script lang="ts" setup>
defineProps<{
    to: string
}>()

</script>

<template>
    <NuxtLink :to="to" class="py-2 px-4 w-fit rounded-md transition-colors select-none" :prefetch="true">
        <slot />
    </NuxtLink>
</template>