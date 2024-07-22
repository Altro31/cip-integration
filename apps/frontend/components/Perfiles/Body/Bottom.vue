<script lang="ts" setup>
const perfil = useInjectPerfil()

</script>

<template>
    <section>
        <h2 class="text-xl">
            Curriculum
        </h2>
        <p class="text-gray-800">
            {{ perfil?.curriculum }}
        </p>
    </section>
</template>