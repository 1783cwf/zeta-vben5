import { requestClient } from '#/api/request';

export interface UserInfoResp {
  id: string;
  username: string;
  account: string;
  sex: number;
  avatar: string;
  state: number;
  roleIds: string[];
  permissions: string[];
}

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfoResp>('/system/user/info');
}
