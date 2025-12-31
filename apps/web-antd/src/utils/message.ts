import { useAppConfig } from '@vben/hooks';
import { useAccessStore } from '@vben/stores';

import { useEventSource } from '@vueuse/core';

const { apiURL, clientId, sseEnable } = useAppConfig(
  import.meta.env,
  import.meta.env.PROD,
);

export function useSseMessage() {
  /**
   * 未开启 不监听
   */
  if (!sseEnable) {
    console.warn('当前未开启sse.');
    return;
  }
  const accessStore = useAccessStore();
  const token = accessStore.accessToken;

  const sseAddr = `${apiURL}/resource/sse?clientid=${clientId}&Authorization=Bearer ${token}`;

  const sseReturnData = useEventSource(sseAddr, [], {
    autoReconnect: {
      delay: 1000,
      onFailed() {
        console.error('sse重连失败.');
      },
      retries: 3,
    },
  });

  return sseReturnData;
}
