<script lang="ts" setup>
import type { Perfil } from '~/utils/interface/Perfil';


const perfil = inject<Perfil>(perfilCardKey)
</script>

<template>
    <div class="space-x-2 basis-full flex justify-between">
        <span class="font-semibold">
            {{ perfil?.nombre }}
        </span>
        <ActiveBudget :active="perfil?.activo"/>
    </div>
</template>