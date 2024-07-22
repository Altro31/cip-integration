<script setup lang="ts">

import {sectionLink, sectionName} from "~/utils/keys";

const props = defineProps<{
    name: string
    linkTo?: string,
    direction?: '->' | '<-',
    imgSrc?: string
}>()

const imgSrc = props.imgSrc ?? '#'
const direction = props.direction ?? '<-'
const style_direction = direction === "->" ? "flex-row-reverse" : ""

provide(sectionName, props.name)
provide(sectionLink, props.linkTo)

</script>

<template>
    <section class="flex items-center justify-center h-screen py-12">
        <div :class="`flex ${style_direction} justify-around gap-6 basis-10/12`">
            <HomeSectionInfo :direction="direction" :linkTo="linkTo" class="basis-2/3" :name="name">
                <template #budget>
                    <slot name="budget"/>
                </template>
                <template #title>
                    <slot name="title"/>
                </template>
                <template #subtitle>
                    <slot name="subtitle"/>
                </template>
            </HomeSectionInfo>
            <HomeSectionImage :src="imgSrc" :alt="name" class="basis-1/3"/>
        </div>
    </section>
</template>