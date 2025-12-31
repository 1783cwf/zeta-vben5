import type { BaseEntity } from '#/api/common';

/**
 * 用户实体
 */
export interface SysUser extends BaseEntity {
  /** 状态 */
  state: number;
  /** 用户名 */
  username: string;
  /** 账号 */
  account: string;
  /** 密码 */
  password: string;
  /** 邮箱 */
  email?: string;
  /** 手机号 */
  mobile?: string;
  /** 性别 0未知 1男 2女 */
  sex: number;
  /** 头像 */
  avatar?: string;
  /** 生日 */
  birthday?: string;
  /** 是否内置 */
  readonly?: boolean;
  /** 用户角色 */
  roles?: SysRoleDTO[];
}

/**
 * 用户DTO
 */
export interface SysUserDTO {
  /** 主键ID */
  id: number;
  /** 创建时间 */
  createTime: string;
  /** 创建人 */
  createdBy: number;
  /** 更新时间 */
  updateTime: string;
  /** 更新人 */
  updatedBy: number;
  /** 状态 */
  state: number;
  /** 用户名 */
  username: string;
  /** 账号 */
  account: string;
  /** 密码 */
  password?: string;
  /** 邮箱 */
  email?: string;
  /** 手机号 */
  mobile?: string;
  /** 性别 */
  sex: number;
  /** 头像 */
  avatar?: string;
  /** 生日 */
  birthday?: string;
  /** 用户角色 */
  roles?: SysRoleDTO[];
}

/**
 * 角色DTO
 */
export interface SysRoleDTO {
  /** 角色id */
  id: number;
  /** 角色名 */
  name: string;
  /** 角色编码 */
  code: string;
  /** 描述 */
  describe?: string;
  /** 创建时间 */
  createTime: string;
  /** 创建人ID */
  createdBy: number;
  /** 更新时间 */
  updateTime: string;
  /** 更新人ID */
  updatedBy: number;
  /** 用户id */
  userId?: number;
}

/**
 * 用户查询参数
 */
export interface SysUserQueryParam {
  /** 用户id */
  id?: number;
  /** 用户名 */
  username?: string;
  /** 账号 */
  account?: string;
  /** 邮箱 */
  email?: string;
  /** 手机号 */
  mobile?: string;
  /** 性别 */
  sex?: number;
  /** 状态 */
  state?: number;
}

/**
 * 用户保存DTO
 */
export interface SysUserSaveDTO {
  /** 用户名 */
  username: string;
  /** 账号 */
  account: string;
  /** 密码 */
  password: string;
  /** 邮箱 */
  email?: string;
  /** 手机号 */
  mobile?: string;
  /** 性别 */
  sex: number;
  /** 生日 */
  birthday?: string;
  /** 角色id列表 为空代表不关联用户角色 */
  roleIds?: number[];
}

/**
 * 用户更新DTO
 */
export interface SysUserUpdateDTO {
  /** 用户id */
  id: number;
  /** 用户名 */
  username?: string;
  /** 邮箱 */
  email?: string;
  /** 手机号 */
  mobile?: string;
  /** 性别 */
  sex?: number;
  /** 生日 */
  birthday?: string;
  /** 角色id列表 为空代表不关联用户角色 */
  roleIds?: number[];
}

/**
 * 修改密码参数
 */
export interface ChangePasswordParam {
  /** 旧密码 */
  oldPwd: string;
  /** 新密码 */
  newPwd: string;
}

/**
 * 重置密码参数
 */
export interface ResetPasswordParam {
  /** 用户id */
  id: number;
  /** 密码 */
  password: string;
}

/**
 * 当前用户信息DTO
 */
export interface UserInfoDTO {
  /** 用户id */
  id: number;
  /** 用户名 */
  username: string;
  /** 账号 */
  account: string;
  /** 性别 */
  sex: number;
  /** 头像 */
  avatar: string;
  /** 状态 */
  state: number;
  /** 角色列表 */
  roles: string[];
  /** 权限列表 */
  permissions: string[];
}

/**
 * 修改状态参数
 */
export interface UpdateStateParam<T> {
  /** id */
  id: T;
  /** 状态 */
  state: number;
}
