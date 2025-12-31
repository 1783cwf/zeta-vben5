import type {
  SysDictItem,
  SysDictItemDTO,
  SysDictItemQueryParam,
  SysDictItemSaveDTO,
  SysDictItemUpdateDTO,
} from './dict-data-model';

import type { ID, IDS, PageQuery, PageResult } from '#/api/common';

import { requestClient } from '#/api/request';

enum Api {
  /** 批量删除 */
  batch = '/system/dictItem/batch',
  /** 单体查询/删除 */
  byId = '/system/dictItem',
  /** 根据字典编码查询字典项 */
  codeList = '/system/dictItem/codeList',
  /** 分页查询 */
  page = '/system/dictItem/page',
  /** 批量查询 */
  query = '/system/dictItem/query',
}

/**
 * 分页查询字典项
 * @param params 分页查询参数
 * @returns 分页结果
 */
export function dictItemPage(params: PageQuery<SysDictItemQueryParam>) {
  return requestClient.post<PageResult<SysDictItem>>(Api.page, params);
}

/**
 * 批量查询字典项
 * @param params 查询参数
 * @returns 字典项列表
 */
export function dictItemQuery(params?: SysDictItemQueryParam) {
  return requestClient.post<SysDictItem[]>(Api.query, params);
}

/**
 * 单体查询字典项
 * @param id 主键ID
 * @returns 字典项信息
 */
export function dictItemInfo(id: ID) {
  return requestClient.get<SysDictItem>(`${Api.byId}/${id}`);
}

/**
 * 新增字典项
 * @param data 保存对象
 * @returns 是否成功
 */
export function dictItemAdd(data: SysDictItemSaveDTO) {
  return requestClient.post<boolean>(Api.byId, data);
}

/**
 * 修改字典项
 * @param data 修改对象
 * @returns 是否成功
 */
export function dictItemUpdate(data: SysDictItemUpdateDTO) {
  return requestClient.put<boolean>(Api.byId, data);
}

/**
 * 单体删除字典项
 * @param id 主键ID
 * @returns 是否成功
 */
export function dictItemRemove(id: ID) {
  return requestClient.delete<boolean>(`${Api.byId}/${id}`);
}

/**
 * 批量删除字典项
 * @param ids 主键ID数组
 * @returns 是否成功
 */
export function dictItemRemoveBatch(ids: IDS) {
  return requestClient.delete<boolean>(Api.batch, { data: ids });
}

/**
 * 根据字典编码查询字典项
 * @param codes 字典编码数组
 * @returns 字典编码 -> 字典项列表 的映射
 */
export function dictItemCodeList(
  codes: string[],
): Promise<Record<string, SysDictItemDTO[]>> {
  return requestClient.post<Record<string, SysDictItemDTO[]>>(
    Api.codeList,
    codes,
  );
}
