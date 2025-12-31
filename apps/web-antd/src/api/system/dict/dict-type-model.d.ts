import type { BaseEntity } from '#/api/common';

/**
 * 字典类型实体
 */
export interface SysDict extends BaseEntity {
  /** 字典名称 */
  name: string;
  /** 字典编码 */
  code: string;
  /** 描述 */
  describe: string;
  /** 排序值 */
  sortValue: number;
}

/**
 * 字典类型查询参数
 */
export interface SysDictQueryParam {
  /** 字典名称 */
  name?: string;
  /** 字典编码 */
  code?: string;
  /** 描述 */
  describe?: string;
}

/**
 * 字典类型保存DTO
 */
export interface SysDictSaveDTO {
  /** 字典名称 */
  name: string;
  /** 字典编码 */
  code: string;
  /** 描述 */
  describe?: string;
  /** 排序值 */
  sortValue?: number;
}

/**
 * 字典类型更新DTO
 */
export interface SysDictUpdateDTO {
  /** 主键ID */
  id: number;
  /** 字典名称 */
  name?: string;
  /** 字典编码 */
  code?: string;
  /** 描述 */
  describe?: string;
  /** 排序值 */
  sortValue?: number;
  /** 版本号 */
  version?: number;
}
