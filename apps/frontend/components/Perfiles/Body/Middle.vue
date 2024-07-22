<script lang="ts" setup>
import type { Perfil } from '~/utils/interface/Perfil';


const perfil = useInjectPerfil()
</script>

<template>
    <div class="py-3">
        <Copyable :label="$t('phone')" :value="perfil?.telefono ?? ''">
            <IconPhone />
        </Copyable>
        <Copyable :label="$t('email')" value="Correo de Prueba">
            <IconEmail />
        </Copyable>
        <Copyable :label="$t('alias')" :value="perfil?.sudonimo ?? ''">
            <IconUser />
        </Copyable>
        <Copyable :label="$t('nationality')" :value="perfil?.nacionalidad ?? ''">
            <IconWorld />
        </Copyable>
        <Copyable :label="$t('scientist-category')" :value="perfil?.categoria_cientifica ?? ''">
            <IconMicroscope />
        </Copyable>
        <Copyable :label="$t('academic-level')" :value="perfil?.nivel_academico ?? ''">
            <IconGraduationCap />
        </Copyable>
        <Copyable :label="$t('categoria-docente')" :value="perfil?.categoria_docente ?? ''">
            <IconBook />
        </Copyable>
        <Copyable :label="$t('civil-state')" :value="perfil?.estado_civil ?? ''">
            <IconLinkedRings />
        </Copyable>
    </div>
</template>