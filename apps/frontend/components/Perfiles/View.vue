<script setup lang="ts">

const { params } = useRoute()
const activePerfilID = useActivePerfilID()
const perfiles = useInjectPerfiles()
const perfil = computed(() => perfiles?.value?.find(perfil => perfil.id === params.id))
provide(perfilKey, perfil)
onMounted(() => activePerfilID.value = params.id as string)
</script>

<template>
    <section class="shadow-xl border border-gray-100 h-full rounded-lg flex flex-col">
        <PerfilesHeader />
        <PerfilesBody class="flex-1" />
    </section>
</template>