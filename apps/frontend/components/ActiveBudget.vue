<script lang="ts" setup>
defineProps({
    active: { type: Boolean, default: true }
})
</script>

<template>
    <span class="text-sm font-semibold rounded-md py-0.5 px-1 size-fit"
        :class="{ 'text-green-800 bg-green-100': active, 'text-red-800 bg-red-100': !active }">
        {{ active ? $t('active') : $t('inactive') }}
    </span>
</template>