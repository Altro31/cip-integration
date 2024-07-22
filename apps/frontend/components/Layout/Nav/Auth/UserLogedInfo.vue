<script setup lang="ts">
const {signOut, data} = useAuth()
</script>

<template>
    <div class="flex flex-col border border-gray-200 rounded-md p-2 text-black bg-gray-100/50">
        <h2>{{ data?.user.name }}</h2>
        <h2 class="text-sm text-gray-500">
            {{ data?.user.email }}
        </h2>
        <HLine />
        <AButton @click="signOut()">{{ $t('logout') }}</AButton>
    </div>
</template>