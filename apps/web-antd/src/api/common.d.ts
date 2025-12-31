export type ID = number | string;
export type IDS = (number | string)[];

/**
 * 基础实体接口
 */
export interface BaseEntity {
  /** 主键ID */
  id?: number;
  /** 创建时间 */
  createTime?: string;
  /** 创建人ID */
  createdBy?: number;
  /** 更新时间 */
  updateTime?: string;
  /** 更新人ID */
  updatedBy?: number;
  /** 版本号（乐观锁） */
  version?: number;
  /** 删除标记 false 未删除 true已删除 */
  deleted?: boolean;
}

/**
 * 分页信息
 * @param rows 结果集
 * @param total 总数
 */
export interface PageResult<T = any> {
  /** 结果集 */
  records: T[];
  /** 总记录数 */
  totalRow: number;
  /** 当前页码 */
  pageNumber: number;
  /** 每页大小 */
  pageSize: number;
  /** 最大每页大小 */
  maxPageSize: number;
  /** 总页数 */
  totalPage: number;
}

/**
 * 分页查询参数
 *
 * 排序支持的用法如下:
 * {isAsc:"asc",orderByColumn:"id"} order by id asc
 * {isAsc:"asc",orderByColumn:"id,createTime"} order by id asc,create_time asc
 * {isAsc:"desc",orderByColumn:"id,createTime"} order by id desc,create_time desc
 * {isAsc:"asc,desc",orderByColumn:"id,createTime"} order by id asc,create_time desc
 *
 * @param pageNumber 当前页
 * @param pageSize 每页大小
 * @param orderByColumn 排序字段
 * @param isAsc 是否升序
 */
export interface PageQuery<T = any> {
  /** 是否升序 */
  isAsc?: string;
  /** 排序字段 */
  orderByColumn?: string;
  /** 当前页码 */
  pageNumber?: number;
  /** 每页大小 */
  pageSize?: number;
  [key: string]: any;
  /** 查询实体 */
  model?: T;
}
