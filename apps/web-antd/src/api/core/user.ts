import { requestClient } from '#/api/request';

export interface UserInfoResp {
  id: number;
  username: string;
  account: string;
  sex: number;
  avatar: string;
  state: number;
  roleIds: number[];
  permissions: number[];
}

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfoResp>('/system/user/info');
}
