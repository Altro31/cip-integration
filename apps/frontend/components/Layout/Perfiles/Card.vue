<script lang="ts" setup>
import type { Perfil } from '~/utils/interface/Perfil';

const props = defineProps<{
    perfil: Perfil
}>()

const activePerfilID = useActivePerfilID()

provide(perfilCardKey, props.perfil)

function handleClick() {
    const router = useRouter()
    if (activePerfilID.value === props.perfil.id) {
        router.push(`/perfiles`)
        activePerfilID.value = undefined
    } else {
        router.push(`/perfiles/${props.perfil.id}`)
        activePerfilID.value = props.perfil.id
    }
}

</script>

<template>
    <div class="border border-gray-300 p-2 rounded-md flex gap-3 cursor-pointer outline-card select-none"
        :class="{ 'active-card': activePerfilID === perfil.id }" @click="handleClick">
        <LayoutPerfilesCardNameInitials />
        <LayoutPerfilesCardBody />
    </div>
</template>

<style scoped>
.outline-card {
    @apply outline outline-0 hover:outline-1 hover:outline-violet-600
}

.active-card {
    @apply outline outline-1 outline-violet-600 bg-violet-100/30
}
</style>