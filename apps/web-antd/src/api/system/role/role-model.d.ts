import type { BaseEntity } from '#/api/common';

/**
 * 角色实体
 */
export interface SysRole extends BaseEntity {
  /** 角色名 */
  name: string;
  /** 角色编码 */
  code: string;
  /** 描述 */
  describe?: string;
  /** 是否内置 */
  readonly?: boolean;
}

/**
 * 角色DTO（关联用户）
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
 * 角色查询参数
 */
export interface SysRoleQueryParam {
  /** 角色名 */
  name?: string;
  /** 角色编码 */
  code?: string;
  /** 描述 */
  describe?: string;
}

/**
 * 角色保存DTO
 */
export interface SysRoleSaveDTO {
  /** 角色名 */
  name: string;
  /** 角色编码 */
  code: string;
  /** 描述 */
  describe?: string;
}

/**
 * 角色更新DTO
 */
export interface SysRoleUpdateDTO {
  /** 主键ID */
  id: number;
  /** 角色名 */
  name?: string;
  /** 角色编码 */
  code?: string;
  /** 描述 */
  describe?: string;
}

/**
 * 角色菜单处理DTO
 */
export interface SysRoleMenuHandleDTO {
  /** 角色ID */
  roleId: number;
  /** 菜单ID列表 */
  menuIds: number[];
}
