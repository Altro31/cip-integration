<script setup lang="ts">

</script>

<template>
    <main class="h-full grid place-content-center">
        <div class="mb-5">
            <h1 class="text-4xl font-semibold">{{ $t('login') }}</h1>
            <h2 class="text-sm font-semibold text-gray-600">{{ $t('welcome-back') }}</h2>
        </div>
        <AuthLoginForm/>
        <p class="text-black/80 text-center text-sm font-semibold">
            {{ $t('not-register-yet') }}
            <AuthLoginRegisterLink/>
        </p>
    </main>
</template>