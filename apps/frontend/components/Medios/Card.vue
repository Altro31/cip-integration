<script setup lang="ts">
import type {Medio} from "~/utils/interface/Medio";

defineProps<{
    medio: Medio
}>()

</script>

<template>
    <article class="relative basis-full max-w-[23rem] min-h-56 grow rounded-lg group cursor-pointer grid place-content-center"
             @click="$router.push($path( {params: {id: medio.id} }))"
    >
        <img :src="medio.img" :alt="medio.nombre"
                 class="size-fit rounded-lg object-scale-down"
        />
        <div class="flex absolute -bottom-5 w-full justify-between text-sm text-gray-500">
            <span>{{ medio.frecuencia }}</span>
            <span>$ {{ medio.precio }}</span>
        </div>
        <div
            class="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/30 from-30% transition-opacity duration-300 rounded-b-lg">
            <div class="flex p-6 text-white text-lg font-semibold items-end h-full">
                <h2>{{ medio.nombre }}</h2>
            </div>
        </div>
    </article>
</template>