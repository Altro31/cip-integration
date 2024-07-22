<script lang="ts" setup>
import type { Perfil } from '~/utils/interface/Perfil';


const perfil = inject<Perfil>(perfilCardKey)
</script>

<template>
    <div>
        <div class="rounded-full bg-violet-100/60 p-1 text-violet-600 font-semibold text-sm"
            :class="{ 'active-card': $route.params.id === perfil?.id }">
            GD
        </div>
    </div>
</template>

<style scoped>
    .active-card {
        @apply bg-white
    }   
</style>