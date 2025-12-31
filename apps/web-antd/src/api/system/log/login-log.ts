import type { SysLoginLog, SysLoginLogQueryParam } from './login-log-model';

import type { ID, PageQuery, PageResult } from '#/api/common';

import { requestClient } from '#/api/request';

enum Api {
  /** 单体查询 */
  byId = '/system/loginLog',
  /** 分页查询 */
  page = '/system/loginLog/page',
  /** 批量查询 */
  query = '/system/loginLog/query',
}

/**
 * 分页查询登录日志
 * @param params 分页查询参数
 * @returns 分页结果
 */
export function loginLogPage(params: PageQuery<SysLoginLogQueryParam>) {
  return requestClient.post<PageResult<SysLoginLog>>(Api.page, params);
}

/**
 * 批量查询登录日志
 * @param params 查询参数
 * @returns 登录日志列表
 */
export function loginLogQuery(params?: SysLoginLogQueryParam) {
  return requestClient.post<SysLoginLog[]>(Api.query, params);
}

/**
 * 单体查询登录日志
 * @param id 主键ID
 * @returns 登录日志信息
 */
export function loginLogInfo(id: ID) {
  return requestClient.get<SysLoginLog>(`${Api.byId}/${id}`);
}
