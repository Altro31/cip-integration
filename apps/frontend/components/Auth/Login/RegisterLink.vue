<template>
    <NuxtLink :to="$path('/auth/register')" class="text-blue-600 hover:text-blue-800 transition-colors group">
        {{ $t('create-account') }}
        <ArrowUpRight/>
    </NuxtLink>
</template>