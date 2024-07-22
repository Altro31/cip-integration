<script lang="ts" setup>

const perfil = useInjectPerfil()
</script>

<template>
    <div class="py-4 space-y-2">
        <ActiveBudget :active="perfil?.activo" />
        <h1 class="text-4xl/tight font-semibold">
            {{ perfil?.nombre }}
        </h1>
    </div>
</template>