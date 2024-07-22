<script lang="ts" setup>
const perfil = useInjectPerfil()
</script>

<template>
    <ADropdown class="justify-self-end" placement="bottomRight">
        <IconTripleHDots class="size-5 text-gray-700 outline-none cursor-pointer" />
        <template #overlay>
            <AMenu>
                <AMenuItem>
                    <template #icon>
                        <IconEditUser class="size-4 text-gray-700" />
                    </template>
                    <span>{{ $t('edit') }}</span>
                </AMenuItem>
                <AMenuItem>
                    <template #icon>
                        <IconDeleteUser class="size-4 text-red-700" />
                    </template>
                    <span class="text-red-700">{{ $t('delete') }}</span>
                </AMenuItem>
            </AMenu>
        </template>
    </ADropdown>
</template>