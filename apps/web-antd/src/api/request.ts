/**
 * 该文件可自行根据业务逻辑进行调整
 */
import type { HttpResponse } from '@vben/request';

import { useAppConfig } from '@vben/hooks';
import { $t } from '@vben/locales';
import { preferences } from '@vben/preferences';
import {
  authenticateResponseInterceptor,
  errorMessageResponseInterceptor,
  RequestClient,
} from '@vben/request';
import { useAccessStore } from '@vben/stores';

import { message, Modal } from 'ant-design-vue';
import { isEmpty, isNull } from 'lodash-es';

import { useAuthStore } from '#/store';

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);

/** 控制是否弹窗 防止登录超时请求多个api会弹窗多次 */
let showTimeoutToast = true;
function createRequestClient(baseURL: string) {
  const client = new RequestClient({
    // 后端地址
    baseURL,
    // 消息提示类型
    errorMessageMode: 'message',
    // 格式化提交参数时间
    formatDate: true,
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    isReturnNativeResponse: false,
    // 需要对返回数据进行处理
    isTransformResponse: true,
    // post请求的时候添加参数到url
    joinParamsToUrl: false,
    //  是否加入时间戳
    joinTime: false,
  });

  /**
   * 重新认证逻辑
   */
  async function doReAuthenticate() {
    console.warn('Access token or refresh token is invalid or expired. ');
    const accessStore = useAccessStore();
    const authStore = useAuthStore();
    accessStore.setAccessToken(null);
    if (
      preferences.app.loginExpiredMode === 'modal' &&
      accessStore.isAccessChecked
    ) {
      accessStore.setLoginExpired(true);
    } else {
      await authStore.logout();
    }
  }

  /**
   * 刷新token逻辑
   */
  async function doRefreshToken() {
    // 不需要前台调用刷新token方法
    return '';
  }

  // 请求头处理
  client.addRequestInterceptor({
    fulfilled: async (config) => {
      const accessStore = useAccessStore();

      config.headers.Authorization = accessStore.accessToken;
      config.headers['Accept-Language'] = preferences.app.locale;
      return config;
    },
  });

  // // response数据解构
  // client.addResponseInterceptor<HttpResponse>({
  //   fulfilled: (response) => {
  //     const { data: responseData, status } = response;
  //
  //     const { code, data, message } = responseData;
  //     if (status >= 200 && status < 400 && code === 0) {
  //       return data;
  //     }
  //     throw new Error(`Error ${status}: ${message}`);
  //   },
  // });

  // token过期的处理
  client.addResponseInterceptor(
    authenticateResponseInterceptor({
      client,
      doReAuthenticate,
      doRefreshToken,
      enableRefreshToken: preferences.app.enableRefreshToken,
    }),
  );

  // 通用的错误处理,如果没有进入上面的错误处理逻辑，就会进入这里
  client.addResponseInterceptor(
    errorMessageResponseInterceptor((msg: string, error) => {
      // 这里可以根据业务进行定制,你可以拿到 error 内的信息进行定制化处理，根据不同的 code 做不同的提示，而不是直接使用 message.error 提示 msg
      // 当前mock接口返回的错误字段是 error 或者 message
      const responseData = error?.response?.data ?? {};
      const errorMessage = responseData?.error ?? responseData?.message ?? '';
      // 如果没有错误信息，则会根据状态码进行提示
      message.error(errorMessage || msg);
    }),
  );

  client.addResponseInterceptor<HttpResponse>({
    fulfilled: (response) => {
      const { isReturnNativeResponse, isTransformResponse } = response.config;

      // 是否返回原生响应头 比如：需要获取响应头时使用该属性
      if (isReturnNativeResponse) {
        return response;
      }
      // 不进行任何处理，直接返回
      // 用于页面代码可能需要直接获取code，data，message这些信息时开启
      if (!isTransformResponse) {
        return response.data;
      }
      const { data: responseData, status } = response;
      if (!responseData) {
        throw new Error($t('fallback.http.apiRequestFailed'));
      }
      const { code, data, message: msg } = responseData;
      if (status >= 200 && status < 400 && code === 0) {
        return data;
      }
      let successMsg = msg;

      if (isNull(successMsg) || isEmpty(successMsg)) {
        successMsg = $t(`fallback.http.operationSuccess`);
      }
      if (response.config.successMessageMode === 'modal') {
        Modal.success({
          content: successMsg,
          title: $t('fallback.http.successTip'),
        });
      } else if (response.config.successMessageMode === 'message') {
        message.success(successMsg);
      }

      // 在此处根据自己项目的实际情况对不同的code执行不同的操作
      // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
      let timeoutMsg = '';
      switch (code) {
        case 401: {
          const _msg = '登录超时, 请重新登录';
          const userStore = useAuthStore();
          userStore.logout().then(() => {
            /** 只弹窗一次 */
            if (showTimeoutToast) {
              showTimeoutToast = false;
              message.error(_msg);
              /** 定时器 3s后再开启弹窗 */
              setTimeout(() => {
                showTimeoutToast = true;
              }, 3000);
            }
          });
          // 不再执行下面逻辑
          return;
        }
        default: {
          if (msg) {
            timeoutMsg = msg;
          }
        }
      }

      // errorMessageMode='modal'的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
      // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
      if (response.config.errorMessageMode === 'modal') {
        Modal.error({
          content: timeoutMsg,
          title: $t('fallback.http.errorTip'),
        });
      } else if (response.config.errorMessageMode === 'message') {
        message.error(timeoutMsg);
      }
      throw new Error(timeoutMsg || $t('fallback.http.apiRequestFailed'));
    },
  });

  return client;
}

export const requestClient = createRequestClient(apiURL);

export const baseRequestClient = new RequestClient({ baseURL: apiURL });
