<script lang="ts" setup>

const {status} = useAuth()

const isLogged = computed(() => status.value === 'authenticated')

</script>

<template>
    <div class="flex items-center justify-end">
        <StyledLink v-if="!isLogged" :to="$path('/auth/login')" class="text-white bg-slate-950 hover:bg-slate-800">
            {{ $t('login') }}
        </StyledLink>
        <LayoutNavAuthUserLoged v-else/>
    </div>
</template>