<template>
    <h1
        class="p-4 mx-auto w-4/5 text-6xl text-center font-sans font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 from-10% via-sky-400 to-90% to-slate-900 bg-title animate-welcome-title">
        {{ $t('home_title') }}
    </h1>
</template>

<style scoped>
.bg-title {
    background-size: 200% 100%;
}

.animate-welcome-title {
    animation: welcome-title 10s linear infinite;
}

@keyframes welcome-title {
    from {
        background-position: 200% 50%;
    }
}
</style>