import type {
  ChangePasswordParam,
  ResetPasswordParam,
  SysUser,
  SysUserDTO,
  SysUserQueryParam,
  SysUserSaveDTO,
  SysUserUpdateDTO,
  UpdateStateParam,
  UserInfoDTO,
} from './user-model';

import type { ID, IDS, PageQuery, PageResult } from '#/api/common';

import { requestClient } from '#/api/request';

enum Api {
  /** 批量删除 */
  batch = '/system/user/batch',
  /** 单体查询/删除 */
  byId = '/system/user',
  /** 修改自己的密码 */
  changePwd = '/system/user/changePwd',
  /** 验证字段是否存在 */
  existence = '/system/user/existence',
  /** 获取当前用户基本信息 */
  info = '/system/user/info',
  /** 获取当前用户菜单 */
  menu = '/system/user/menu',
  /** 分页查询 */
  page = '/system/user/page',
  /** 获取当前用户权限 */
  permissions = '/system/user/permissions',
  /** 批量查询 */
  query = '/system/user/query',
  /** 重置密码 */
  restPwd = '/system/user/restPwd',
  /** 修改状态 */
  state = '/system/user/state',
}

/**
 * 分页查询用户
 * @param params 分页查询参数
 * @returns 分页结果
 */
export function userPage(params: PageQuery<SysUserQueryParam>) {
  return requestClient.post<PageResult<SysUserDTO>>(Api.page, params);
}

/**
 * 批量查询用户
 * @param params 查询参数
 * @returns 用户列表
 */
export function userQuery(params?: SysUserQueryParam) {
  return requestClient.post<SysUser[]>(Api.query, params);
}

/**
 * 单体查询用户
 * @param id 主键ID
 * @returns 用户信息
 */
export function userInfo(id: ID) {
  return requestClient.get<SysUser>(`${Api.byId}/${id}`);
}

/**
 * 新增用户
 * @param data 保存对象
 * @returns 是否成功
 */
export function userAdd(data: SysUserSaveDTO) {
  return requestClient.post<boolean>(Api.byId, data);
}

/**
 * 修改用户
 * @param data 修改对象
 * @returns 是否成功
 */
export function userUpdate(data: SysUserUpdateDTO) {
  return requestClient.put<boolean>(Api.byId, data);
}

/**
 * 单体删除用户
 * @param id 主键ID
 * @returns 是否成功
 */
export function userRemove(id: ID) {
  return requestClient.delete<boolean>(`${Api.byId}/${id}`);
}

/**
 * 批量删除用户
 * @param ids 主键ID数组
 * @returns 是否成功
 */
export function userRemoveBatch(ids: IDS) {
  return requestClient.delete<boolean>(Api.batch, { data: ids });
}

/**
 * 修改用户状态
 * @param data 修改状态参数
 * @returns 是否成功
 */
export function userUpdateState(data: UpdateStateParam<number>) {
  return requestClient.put<boolean>(Api.state, data);
}

/**
 * 验证字段是否存在
 * @param field 字段名
 * @param value 字段值
 * @param excludeId 排除的ID
 * @returns 是否存在
 */
export function userExistence(field: string, value: string, excludeId?: ID) {
  return requestClient.get<boolean>(Api.existence, {
    params: { field, value, excludeId },
  });
}

/**
 * 修改自己的密码
 * @param data 修改密码参数
 * @returns 是否成功
 */
export function userChangePassword(data: ChangePasswordParam) {
  return requestClient.put<boolean>(Api.changePwd, data);
}

/**
 * 重置密码
 * @param data 重置密码参数
 * @returns 是否成功
 */
export function userResetPassword(data: ResetPasswordParam) {
  return requestClient.put<boolean>(Api.restPwd, data);
}

/**
 * 获取当前用户基本信息
 * @returns 用户信息
 */
export function userGetCurrentInfo() {
  return requestClient.get<UserInfoDTO>(Api.info);
}

/**
 * 获取当前用户菜单
 * @returns 菜单列表
 */
export function userGetCurrentMenu() {
  return requestClient.get<string[]>(Api.menu);
}

/**
 * 获取当前用户权限
 * @returns 权限列表
 */
export function userGetCurrentPermissions() {
  return requestClient.get<string[]>(Api.permissions);
}
