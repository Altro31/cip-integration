<script lang="ts" setup>
import type { Perfil } from '~/utils/interface/Perfil';


const perfil = inject<Perfil>(perfilCardKey)
</script>

<template>
    <div class="space-x-2">
        <AAvatar :alt="perfil?.nombre" :src="perfil?.img" size="small" />
        <span class="text-sm text-gray-500">
            {{ perfil?.nivel_academico }}
        </span>
    </div>
</template>