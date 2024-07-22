<script setup lang="ts">
const { status } = useAuth()
</script>

<template>
    <section class="py-20 h-screen grid place-content-center">
        <HomeWelcomeTitle />
        <h2 class="text-xl text-gray-500 w-2/3 text-center mx-auto">
            {{ $t('home_subtitle') }}
        </h2>
        <div class="flex gap-2 text-center my-5 justify-center">
            <StyledLink :to="$path('/medios')" class="text-white bg-slate-950 hover:bg-slate-800">
                {{ $t('getting_starter') }}
            </StyledLink>
            <StyledLink v-if="status === 'unauthenticated'" :to="$path('/auth/login')" 
                class="font-semibold border border-gray-300 hover:bg-gray-100 bg-red text-black bg-transparent">
                {{ $t('login') }}
            </StyledLink>
        </div>
    </section>
</template>