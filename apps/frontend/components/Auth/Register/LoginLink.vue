<template>
    <NuxtLink :to="$path('/auth/login')" class="text-blue-600 hover:text-blue-800 transition-colors group">
        {{ $t('login') }}
        <ArrowUpRight/>
    </NuxtLink>
</template>