<script setup lang="ts">

</script>

<template>
    <div class="text-center mt-8 space-y-4">
        <h1 class="text-5xl font-semibold text-gray-700">
            {{ $t('medios_prensa') }}
        </h1>
        <h2 class="text-xl font-semibold text-gray-500">
            {{ $t('home_medios_title') }}
        </h2>
        <LayoutMediosSearcher class="max-w-96"/>
    </div>
</template>