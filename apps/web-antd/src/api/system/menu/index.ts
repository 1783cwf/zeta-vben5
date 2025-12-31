import type {
  SysMenu,
  SysMenuQueryParam,
  SysMenuSaveDTO,
  SysMenuUpdateDTO,
} from './menu-model';

import type { ID, IDS, PageQuery, PageResult } from '#/api/common';

import { requestClient } from '#/api/request';

enum Api {
  /** 批量删除 */
  batch = '/system/menu/batch',
  /** 单体查询/删除 */
  byId = '/system/menu',
  /** 分页查询 */
  page = '/system/menu/page',
  /** 批量查询 */
  query = '/system/menu/query',
  /** 查询菜单树 */
  tree = '/system/menu/tree',
}

/**
 * 分页查询菜单
 * @param params 分页查询参数
 * @returns 分页结果
 */
export function menuPage(params: PageQuery<SysMenuQueryParam>) {
  return requestClient.post<PageResult<SysMenu>>(Api.page, params);
}

/**
 * 批量查询菜单
 * @param params 查询参数
 * @returns 菜单列表
 */
export function menuQuery(params?: SysMenuQueryParam) {
  return requestClient.post<SysMenu[]>(Api.query, params);
}

/**
 * 查询菜单树
 * @param params 查询参数
 * @returns 菜单树
 */
export function menuTree(params?: SysMenuQueryParam) {
  return requestClient.post<SysMenu[]>(Api.tree, params);
}

/**
 * 单体查询菜单
 * @param id 主键ID
 * @returns 菜单信息
 */
export function menuInfo(id: ID) {
  return requestClient.get<SysMenu>(`${Api.byId}/${id}`);
}

/**
 * 新增菜单
 * @param data 保存对象
 * @returns 是否成功
 */
export function menuAdd(data: SysMenuSaveDTO) {
  return requestClient.post<boolean>(Api.byId, data);
}

/**
 * 修改菜单
 * @param data 修改对象
 * @returns 是否成功
 */
export function menuUpdate(data: SysMenuUpdateDTO) {
  return requestClient.put<boolean>(Api.byId, data);
}

/**
 * 单体删除菜单
 * @param id 主键ID
 * @returns 是否成功
 */
export function menuRemove(id: ID) {
  return requestClient.delete<boolean>(`${Api.byId}/${id}`);
}

/**
 * 批量删除菜单
 * @param ids 主键ID数组
 * @returns 是否成功
 */
export function menuRemoveBatch(ids: IDS) {
  return requestClient.delete<boolean>(Api.batch, { data: ids });
}
