<script lang="ts" setup>

const perfil = inject(perfilCardKey)
</script>

<template>
    <div class="flex flex-col gap-1 flex-1">
        <LayoutPerfilesCardBodyTopSecion />
        <LayoutPerfilesCardBodyBottomSection />
    </div>
</template>