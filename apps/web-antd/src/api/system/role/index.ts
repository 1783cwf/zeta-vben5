import type { SysMenu } from '../menu/menu-model';
import type {
  SysRole,
  SysRoleMenuHandleDTO,
  SysRoleQueryParam,
  SysRoleSaveDTO,
  SysRoleUpdateDTO,
} from './role-model';

import type { ID, IDS, PageQuery, PageResult } from '#/api/common';

import { requestClient } from '#/api/request';

enum Api {
  /** 批量删除 */
  batch = '/system/role/batch',
  /** 单体查询/删除 */
  byId = '/system/role',
  /** 分页查询 */
  page = '/system/role/page',
  /** 批量查询 */
  query = '/system/role/query',
  /** 角色菜单 */
  roleMenu = '/system/roleMenu',
}

/**
 * 分页查询角色
 * @param params 分页查询参数
 * @returns 分页结果
 */
export function rolePage(params: PageQuery<SysRoleQueryParam>) {
  return requestClient.post<PageResult<SysRole>>(Api.page, params);
}

/**
 * 批量查询角色
 * @param params 查询参数
 * @returns 角色列表
 */
export function roleQuery(params?: SysRoleQueryParam) {
  return requestClient.post<SysRole[]>(Api.query, params);
}

/**
 * 单体查询角色
 * @param id 主键ID
 * @returns 角色信息
 */
export function roleInfo(id: ID) {
  return requestClient.get<SysRole>(`${Api.byId}/${id}`);
}

/**
 * 新增角色
 * @param data 保存对象
 * @returns 是否成功
 */
export function roleAdd(data: SysRoleSaveDTO) {
  return requestClient.post<boolean>(Api.byId, data);
}

/**
 * 修改角色
 * @param data 修改对象
 * @returns 是否成功
 */
export function roleUpdate(data: SysRoleUpdateDTO) {
  return requestClient.put<boolean>(Api.byId, data);
}

/**
 * 单体删除角色
 * @param id 主键ID
 * @returns 是否成功
 */
export function roleRemove(id: ID) {
  return requestClient.delete<boolean>(`${Api.byId}/${id}`);
}

/**
 * 批量删除角色
 * @param ids 主键ID数组
 * @returns 是否成功
 */
export function roleRemoveBatch(ids: IDS) {
  return requestClient.delete<boolean>(Api.batch, { data: ids });
}

/**
 * 查询角色菜单树
 * @param roleId 角色ID
 * @returns 菜单树
 */
export function roleMenuTree(roleId: ID) {
  return requestClient.get<SysMenu[]>(`${Api.roleMenu}/${roleId}`);
}

/**
 * 新增或修改角色菜单
 * @param data 角色菜单处理对象
 * @returns 是否成功
 */
export function roleMenuSave(data: SysRoleMenuHandleDTO) {
  return requestClient.put<boolean>(Api.roleMenu, data);
}
