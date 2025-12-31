import type {
  SysOptLog,
  SysOptLogQueryParam,
  SysOptLogTableDTO,
} from './opt-log-model';

import type { ID, PageQuery, PageResult } from '#/api/common';

import { requestClient } from '#/api/request';

enum Api {
  /** 单体查询 */
  byId = '/system/optLog',
  /** 分页查询 */
  page = '/system/optLog/page',
}

/**
 * 分页查询操作日志
 * @param params 分页查询参数
 * @returns 分页结果
 */
export function optLogPage(params: PageQuery<SysOptLogQueryParam>) {
  return requestClient.post<PageResult<SysOptLogTableDTO>>(Api.page, params);
}

/**
 * 单体查询操作日志
 * @param id 主键ID
 * @returns 操作日志信息
 */
export function optLogInfo(id: ID) {
  return requestClient.get<SysOptLog>(`${Api.byId}/${id}`);
}
