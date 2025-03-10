import type { BasicUserInfo } from '@vben-core/typings';

/** 用户信息 */
interface UserInfo extends BasicUserInfo {
  /**
   * 首页地址
   */
  homePath?: string;

  /**
   * 权限
   */
  permissions: string[];
}

export type { UserInfo };
