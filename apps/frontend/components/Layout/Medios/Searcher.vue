<script setup lang="ts">

const router = useRouter()
const { query } = useRoute()

const debounce = useDebounceFn((event) => {
    router.push({ query: { filter: event.target.value || undefined } })
}, 800)

</script>

<template>
    <AInput class="m-6 drop-shadow-lg" size="large" @input.passive="debounce" :default-value="(query.filter as string)"
        placeholder="Ejemplo: Granma">
        <template #prefix>
            {{ $t('search') }}:
        </template>
    </AInput>
</template>