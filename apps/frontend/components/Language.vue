<script lang="ts" setup>

const { locale, setLocale } = useI18n()

const selectedKeys = ref(['es'])

const items = ref([
    { key: 'es', label: 'Español' },
    { key: 'en', label: 'English' }
])


</script>
<template>
    <ADropdown class="w-fit h-fit" :trigger="['click']" placement="bottomRight">
        <IconLanguage
            class="px-2 py-2 border border-gray-200 rounded-md text-black hover:bg-black/5 outline-none select-none" />
        <template #overlay>
            <AMenu>
                <AMenuItem v-for="item in items" :key="item.key" :disabled="locale === item.key"
                    @click="() => setLocale(item.key)">
                    {{ item.label }}
                </AMenuItem>
            </AMenu>
        </template>
    </ADropdown>
</template>