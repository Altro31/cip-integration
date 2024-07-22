<script setup lang="ts">
const locale = useLocalePath()
</script>

<template>
    <div class="flex gap-3 justify-center">
        <LayoutNavLink :to="locale({name: 'medios'})">{{ $t('medios') }}</LayoutNavLink>
        <LayoutNavLink :to="$path('/perfiles')">{{ $t('profiles') }}</LayoutNavLink>
        <LayoutNavLink :to="$path('/chat')">{{ $t('chat') }}</LayoutNavLink>
    </div>
</template>