<script lang="ts" setup>
import type { Perfil } from '~/utils/interface/Perfil';
defineProps<{
    perfiles: Perfil[]
}>()



</script>

<template>
    <div class="flex flex-col justify-center gap-1">
        <LayoutPerfilesCard v-for="perfil in perfiles" :key="perfil.id" :perfil="perfil" />
    </div>
</template>