<script setup lang="ts">
const props = defineProps<{
    direction: '->' | '<-'
    name: string
    linkTo?: string
}>()
const isToRight = props.direction === '->'
const itemsEnd = isToRight ? 'items-end' : 'items-start'
const textEnd = isToRight ? 'text-end' : ''
const justifyEnd = isToRight ? 'justify-end' : ''
</script>

<template>
    <div :class="`flex flex-col justify-center space-y-4 ${itemsEnd}`">
        <div :class="`space-y-2 ${textEnd}`">
            <div class="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-600">
                <slot name="budget"/>
            </div>
            <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl text-black">
                <slot name="title"/>
            </h2>
            <p class="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                <slot name="subtitle"/>
            </p>
        </div>
        <div :class="`flex flex-col gap-2 min-[400px]:flex-row ${justifyEnd}`">
            <HomeSectionViewButton />
        </div>
    </div>
</template>