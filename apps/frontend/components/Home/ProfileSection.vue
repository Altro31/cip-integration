<template>
    <HomeSectionFactory :name="$t('profiles')" direction="<-" :link-to="$path('/perfiles')"
        class="bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]">
        <template #budget>{{ $t('home_profile_budget') }}</template>
        <template #title>{{ $t('home_profile_title') }}</template>
        <template #subtitle>{{ $t('home_profile_subtitle') }}</template>
    </HomeSectionFactory>
</template>