/**
 * 登录日志实体
 */
export interface SysLoginLog {
  /** 主键ID */
  id: number;
  /** 创建时间 */
  createTime: string;
  /** 创建人ID */
  createdBy: number;
  /** 状态 */
  state: string;
  /** 账号 */
  account: string;
  /** 备注 */
  comments?: string;
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
 * 登录日志查询参数
 */
export interface SysLoginLogQueryParam {
  /** 状态 */
  state?: string;
  /** 账号 */
  account?: string;
  /** 备注 */
  comments?: string;
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
