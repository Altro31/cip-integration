<script setup lang="ts">

import {sectionLink, sectionName} from "~/utils/keys";

const name = inject<string>(sectionName)
const linkTo = inject(sectionLink, '#')

</script>

<template>
    <NuxtLink
        class="group inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 "
        :to="linkTo"
    >
        {{ $t('view') }} {{ name }}
        <ArrowUpRight/>
    </NuxtLink>
</template>