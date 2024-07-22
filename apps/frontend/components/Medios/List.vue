<script setup lang="ts">
import {mockMedios} from "~/utils/mocks/medios";

const route = useRoute()
const medios = computed(() => mockMedios.filter(medio => medio.nombre.toLowerCase().includes(route.query.filter?.toString().toLowerCase() || '')))

</script>

<template>
    <div class="flex px-10 gap-y-10 flex-wrap justify-around lg:justify-between">
        <MediosCard v-for="medio in medios" :key="medio.id" :medio="medio"/>
    </div>
</template>