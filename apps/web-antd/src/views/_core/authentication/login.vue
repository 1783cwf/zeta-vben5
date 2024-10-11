<script lang="ts" setup>
import type { BasicOption } from '@vben/types';

import { computed, onMounted, ref, useTemplateRef } from 'vue';

import { AuthenticationLogin, type VbenFormSchema, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { GrantTypeEnum, type LoginParams } from '#/api';
import { captchaImage, type CaptchaResponse } from '#/api/core/captcha';
import { useAuthStore } from '#/store';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();

const loginFormRef = useTemplateRef('loginFormRef');

const captchaInfo = ref<CaptchaResponse>({
  text: '',
  base64: '',
  key: '',
});

async function loadCaptcha() {
  captchaInfo.value = await captchaImage();

  // 只有开发环境后台才会返回验证码的值
  loginFormRef?.value?.setFieldValue('code', captchaInfo.value.text);
}

onMounted(async () => {
  await loadCaptcha();
});

const MOCK_USER_OPTIONS: BasicOption[] = [
  {
    label: 'Super',
    value: 'zetaAdmin',
  },
];

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenSelect',
      componentProps: {
        options: MOCK_USER_OPTIONS,
        placeholder: $t('authentication.selectAccount'),
      },
      fieldName: 'selectAccount',
      label: $t('authentication.selectAccount'),
      rules: z
        .string()
        .min(1, { message: $t('authentication.selectAccount') })
        .optional()
        .default('zetaAdmin'),
    },
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
      },
      dependencies: {
        trigger(values, form) {
          if (values.selectAccount) {
            const findUser = MOCK_USER_OPTIONS.find(
              (item) => item.value === values.selectAccount,
            );
            if (findUser) {
              form.setValues({
                password: 'admin',
                account: findUser.value,
              });
            }
          }
        },
        triggerFields: ['selectAccount'],
      },
      fieldName: 'account',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
    },
    {
      component: 'VbenInputCaptcha',
      componentProps: {
        captcha: captchaInfo.value.base64,
        class: 'focus:border-primary',
        onCaptchaClick: loadCaptcha,
        placeholder: $t('authentication.code'),
      },
      dependencies: {
        if: () => true,
      },
      fieldName: 'code',
      label: $t('authentication.code'),
      rules: z.string().min(1, { message: $t('authentication.codeTip') }),
    },
  ];
});

async function handleAccountLogin(values: LoginParams) {
  try {
    const requestParam: any = { ...values };

    requestParam.key = captchaInfo.value.key;
    requestParam.grantType = GrantTypeEnum.PASSWORD;

    // 登录
    await authStore.authLogin(requestParam);
  } catch (error) {
    console.error(error);
    // 处理验证码错误
    if (error instanceof Error) {
      // 刷新验证码
      loginFormRef.value?.setFieldValue('code', '');
      await loadCaptcha();
    }
  }
}
</script>

<template>
  <AuthenticationLogin
    ref="loginFormRef"
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    :show-code-login="false"
    :show-qrcode-login="false"
    :show-register="false"
    :show-third-party-login="false"
    @submit="handleAccountLogin"
  />
</template>
