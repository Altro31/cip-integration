<template>
    <HomeSectionFactory :name="$t('medios')" direction="->" :linkTo="$path('/medios')"
                 class="bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
    >
        <template #budget>{{ $t('home_medios_budget') }}</template>
        <template #title>{{ $t('home_medios_title') }}</template>
        <template #subtitle>{{ $t('home_medios_subtitle') }}</template>
    </HomeSectionFactory>
</template>