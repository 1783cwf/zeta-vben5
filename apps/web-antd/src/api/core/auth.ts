import { requestClient } from '#/api/request';

export enum GrantTypeEnum {
  // 邮箱
  EMAIL = 'EMAIL',
  // 密码
  PASSWORD = 'PASSWORD',
  // 短信
  SMS = 'SMS',
  // 三方授权
  SOCIAL = 'SOCIAL',
}

/** 登录接口参数 */
export interface LoginParams {
  password?: string;
  account?: string;
  // 验证码key
  key?: number;
  // 验证码值
  code?: string;
  // 登录类型
  grantType: GrantTypeEnum;
}

export namespace AuthApi {
  /** 登录接口返回值 */
  export interface LoginResult {
    token: string;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }
}

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>('/system/login', data);
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return requestClient.post<AuthApi.RefreshTokenResult>('/system/refresh', {
    withCredentials: true,
  });
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return requestClient.get('/system/logout');
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return requestClient.get<string[]>('/system/user/permissions');
}
