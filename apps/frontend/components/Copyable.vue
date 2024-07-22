<script lang="ts" setup>
defineProps<{
    label?: string
    value: string
}>()



</script>

<template>
    <div class="flex">
        <div class="basis-1/3 flex items-center gap-1 text-gray-500">
            <slot /> {{ label }}
        </div>
        <span
            class="py-1 basis-2/3 flex items-center justify-between font-semibold text-gray-700 rounded-md hover:bg-gray-200/50 px-1 group select-none">
            <span class="py-1 px-1">{{ value }}</span>
            <Copy class="hidden group-hover:block" :text-to-copy="value"/>
        </span>
    </div>
</template>