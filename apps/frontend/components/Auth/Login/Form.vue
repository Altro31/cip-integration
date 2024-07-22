<script lang="ts" setup>

import { FormState } from "~/utils/enums/form-state";

const { state, formState, onFinish, onSubmit, rules } = useLoginConfig()

</script>

<template>
    <div class="flex flex-col gap-5">
        <AuthErrorMessage v-if="state == FormState.ERROR">{{ $t('login-error') }}</AuthErrorMessage>
        <AForm :model="formState" name="login" autocomplete="off" @finish="onFinish" @submit="onSubmit" class="w-80"
            layout="vertical" hideRequiredMark>
            <AFormItem name="email" :label="$t('email')" :rules="rules.email">
                <AInput v-model:value="formState.email" :placeholder="$t('email-placeholder')" />
            </AFormItem>

            <AFormItem name="password" :label="$t('password')" :rules="rules.password">
                <AInputPassword v-model:value="formState.password" :placeholder="$t('password-placeholder')" />
            </AFormItem>

            <AFormItem name="remember" class="select-none">
                <ACheckbox v-model="formState.remember">{{ $t('remember-me') }}</ACheckbox>
            </AFormItem>

            <AFormItem>
                <AButton type="primary" html-type="submit" class="w-full" :disabled="state == FormState.LOADING">
                    {{ $t('login') }}
                </AButton>
            </AFormItem>
        </AForm>
    </div>
</template>

  
  