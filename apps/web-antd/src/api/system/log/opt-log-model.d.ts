/**
 * 操作日志实体
 */
export interface SysOptLog {
  /** 主键ID */
  id: number;
  /** 创建时间 */
  createTime: string;
  /** 创建人ID */
  createdBy: number;
  /** 操作类型 */
  type?: string;
  /** 操作描述 */
  description?: string;
  /** 请求地址 */
  url: string;
  /** 请求方式 */
  httpMethod: string;
  /** 类路径 */
  classPath: string;
  /** 请求参数 */
  params?: string;
  /** 返回值 */
  result?: string;
  /** 异常描述 */
  exception?: string;
  /** 消耗时间（毫秒） */
  spendTime: number;
  /** 操作系统 */
  os?: string;
  /** 设备名称 */
  device?: string;
  /** 浏览器类型 */
  browser?: string;
  /** ip地址 */
  ip?: string;
  /** ip所在地区 */
  ipRegion?: string;
  /** 操作人 */
  userName?: string;
}

/**
 * 操作日志表格DTO
 */
export interface SysOptLogTableDTO {
  /** 主键ID */
  id: number;
  /** 创建时间 */
  createTime: string;
  /** 创建人 */
  createdBy: number;
  /** 操作类型 */
  type?: string;
  /** 操作人 */
  userName?: string;
  /** 操作描述 */
  description?: string;
  /** 请求地址 */
  url?: string;
  /** 请求方式 */
  httpMethod?: string;
  /** 类路径 */
  classPath?: string;
  /** 消耗时间（毫秒） */
  spendTime?: number;
  /** 操作系统 */
  os?: string;
  /** 设备名称 */
  device?: string;
  /** 浏览器类型 */
  browser?: string;
  /** ip地址 */
  ip?: string;
  /** ip所在地区 */
  ipRegion?: string;
}

/**
 * 操作日志查询参数
 */
export interface SysOptLogQueryParam {
  /** 操作类型 */
  type?: string;
  /** 操作人 */
  userName?: string;
  /** 操作描述 */
  description?: string;
  /** 请求地址 */
  url?: string;
  /** 请求方式 */
  httpMethod?: string;
  /** 类路径 */
  classPath?: string;
  /** 操作系统 */
  os?: string;
  /** 设备名称 */
  device?: string;
  /** 浏览器类型 */
  browser?: string;
  /** ip地址 */
  ip?: string;
  /** ip所在地区 */
  ipRegion?: string;
}
