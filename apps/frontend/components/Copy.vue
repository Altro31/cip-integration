<script lang="ts" setup>
const props = defineProps<{
    textToCopy: string
}>()

const {copy, copied} = useClipboard({source: props.textToCopy})
</script>

<template>
    <div class="bg-white py-0.5 px-1.5 rounded-md border cursor-pointer" @click="copy()">
        <IconOk v-if="copied" class="inline text-green-600 font-semibold" />
        <IconCopy v-else class="inline" />
    </div>
</template>