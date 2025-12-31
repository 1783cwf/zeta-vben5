import type { BaseEntity } from '#/api/common';

/**
 * 字典项实体
 */
export interface SysDictItem extends BaseEntity {
  /** 字典ID */
  dictId: number;
  /** 字典项名称 */
  name: string;
  /** 字典项值 */
  value: string;
  /** 描述 */
  describe: string;
  /** 排序值 */
  sortValue: number;
}

/**
 * 字典项DTO（包含字典编码）
 */
export interface SysDictItemDTO {
  /** 主键ID */
  id: number;
  /** 字典ID */
  dictId: number;
  /** 字典项名称 */
  name: string;
  /** 字典项值 */
  value: string;
  /** 描述 */
  describe: string;
  /** 排序值 */
  sortValue: number;
  /** 字典编码 */
  dictCode: string;
}

/**
 * 字典项查询参数
 */
export interface SysDictItemQueryParam {
  /** 字典ID */
  dictId?: number;
  /** 字典项名称 */
  name?: string;
  /** 字典项值 */
  value?: string;
  /** 描述 */
  describe?: string;
}

/**
 * 字典项保存DTO
 */
export interface SysDictItemSaveDTO {
  /** 字典ID */
  dictId: number;
  /** 字典项名称 */
  name: string;
  /** 字典项值 */
  value: string;
  /** 描述 */
  describe?: string;
  /** 排序值 */
  sortValue?: number;
}

/**
 * 字典项更新DTO
 */
export interface SysDictItemUpdateDTO {
  /** 主键ID */
  id: number;
  /** 字典ID */
  dictId?: number;
  /** 字典项名称 */
  name?: string;
  /** 字典项值 */
  value?: string;
  /** 描述 */
  describe?: string;
  /** 排序值 */
  sortValue?: number;
  /** 版本号 */
  version?: number;
}
