<template>
    <ADropdown :trigger="['click']">
        <AAvatar :size="36" class="cursor-pointer">A</AAvatar>
        <template #overlay>
            <LayoutNavAuthUserLogedInfo/>
        </template>
    </ADropdown>
</template>