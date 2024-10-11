import { requestClient } from '#/api/request';

/**
 * @param base64 图片验证码 需要和base64拼接
 * @param key 验证码ID
 * @param text 生产环境不会返回
 */
export interface CaptchaResponse {
  text: boolean;
  base64: string;
  key: string;
}

/**
 * 图片验证码
 * @returns resp
 */
export function captchaImage() {
  return requestClient.get<CaptchaResponse>('/system/captcha');
}
