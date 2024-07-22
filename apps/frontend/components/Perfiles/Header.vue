<script lang="ts" setup>


const perfiles = useInjectPerfiles()
const { hasNext, hasPrevious, next, previous } = usePerfilDirection(perfiles!.value)

function handleClick() {
    const router = useRouter()
    const path = useLocalePath()
    const activePerfil = useActivePerfilID()
    router.push(path('perfiles'))
    activePerfil.value = undefined
}

</script>

<template>
    <div class="flex rounded-t-lg border p-2 px-3 gap-3 items-center">
        <div class="text-gray-700 font-semibold cursor-pointer" @click="handleClick">
            ✕
        </div>
        <div class="arrow-container cursor-pointer select-none" :aria-disabled="!hasNext" @click="next">
            <IconArrowDownRounded class="arrow" />
        </div>
        <div class="arrow-container cursor-pointer select-none" :aria-disabled="!hasPrevious" @click="previous">
            <IconArrowUpRounded class="arrow" />
        </div>
        <PerfilesHeaderMenu class="ml-auto" />
    </div>
</template>

<style scoped>
.arrow-container {
    @apply border rounded-md p-1 hover:bg-gray-200;
}

.arrow {
    @apply size-4;
}
</style>