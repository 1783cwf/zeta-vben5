import type {
  SysDict,
  SysDictQueryParam,
  SysDictSaveDTO,
  SysDictUpdateDTO,
} from './dict-type-model';

import type { ID, IDS, PageQuery, PageResult } from '#/api/common';

import { requestClient } from '#/api/request';

enum Api {
  /** 批量删除 */
  batch = '/system/dict/batch',
  /** 单体查询/删除 */
  byId = '/system/dict',
  /** 分页查询 */
  page = '/system/dict/page',
  /** 批量查询 */
  query = '/system/dict/query',
}

/**
 * 分页查询字典类型
 * @param params 分页查询参数
 * @returns 分页结果
 */
export function dictTypePage(params: PageQuery<SysDictQueryParam>) {
  return requestClient.post<PageResult<SysDict>>(Api.page, params);
}

/**
 * 批量查询字典类型
 * @param params 查询参数
 * @returns 字典类型列表
 */
export function dictTypeQuery(params?: SysDictQueryParam) {
  return requestClient.post<SysDict[]>(Api.query, params);
}

/**
 * 单体查询字典类型
 * @param id 主键ID
 * @returns 字典类型信息
 */
export function dictTypeInfo(id: ID) {
  return requestClient.get<SysDict>(`${Api.byId}/${id}`);
}

/**
 * 新增字典类型
 * @param data 保存对象
 * @returns 是否成功
 */
export function dictTypeAdd(data: SysDictSaveDTO) {
  return requestClient.post<boolean>(Api.byId, data);
}

/**
 * 修改字典类型
 * @param data 修改对象
 * @returns 是否成功
 */
export function dictTypeUpdate(data: SysDictUpdateDTO) {
  return requestClient.put<boolean>(Api.byId, data);
}

/**
 * 单体删除字典类型
 * @param id 主键ID
 * @returns 是否成功
 */
export function dictTypeRemove(id: ID) {
  return requestClient.delete<boolean>(`${Api.byId}/${id}`);
}

/**
 * 批量删除字典类型
 * @param ids 主键ID数组
 * @returns 是否成功
 */
export function dictTypeRemoveBatch(ids: IDS) {
  return requestClient.delete<boolean>(Api.batch, { data: ids });
}
