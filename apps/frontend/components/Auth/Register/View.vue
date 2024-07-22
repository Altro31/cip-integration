<script setup lang="ts">

</script>

<template>
    <main class="h-full grid place-content-center">
        <div class="mb-5">
            <h1 class="text-4xl font-semibold">{{ $t('register') }}</h1>
        </div>
        <AuthRegisterForm/>
        <p class="text-black/80 text-center text-sm font-semibold">
            {{ $t('have-an-account') }}
            <AuthRegisterLoginLink/>
        </p>
    </main>
</template>