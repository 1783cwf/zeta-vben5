import type { BaseEntity } from '#/api/common';

/**
 * 菜单类型
 */
export type MenuType = 'MENU' | 'RESOURCE';

/**
 * 菜单实体
 */
export interface SysMenu extends BaseEntity {
  /** 名称 */
  label: string;
  /** 父级Id */
  parentId: number;
  /** 排序 */
  sortValue: number;
  /** 子节点 */
  children?: SysMenu[];
  /** 路由名称 */
  name?: string;
  /** 路由地址 */
  path?: string;
  /** 组件地址 */
  component?: string;
  /** 重定向地址 */
  redirect?: string;
  /** 图标 */
  icon?: string;
  /** 权限标识 */
  authority?: string;
  /** 菜单类型 MENU-菜单 RESOURCE-资源 */
  type: MenuType;
  /** 是否隐藏 */
  hide?: boolean;
  /** 是否缓存 */
  keepAlive?: boolean;
  /** 外链地址 */
  href?: string;
  /** 内链地址 */
  frameSrc?: string;
  /** 角色权限树选中状态 */
  checked?: boolean;
}

/**
 * 菜单查询参数
 */
export interface SysMenuQueryParam {
  /** 名称 */
  label?: string;
  /** 父级id */
  parentId?: number;
  /** 排序 */
  sortValue?: number;
  /** 路由名称 */
  name?: string;
  /** 路由地址 */
  path?: string;
  /** 组件地址 */
  component?: string;
  /** 重定向地址 */
  redirect?: string;
  /** 图标 */
  icon?: string;
  /** 权限标识 */
  authority?: string;
  /** 菜单类型 */
  type?: MenuType;
  /** 是否隐藏 */
  hide?: boolean;
  /** 是否缓存 */
  keepAlive?: boolean;
  /** 外链地址 */
  href?: string;
  /** 内链地址 */
  frameSrc?: string;
}

/**
 * 菜单保存DTO
 */
export interface SysMenuSaveDTO {
  /** 父级id */
  parentId: number;
  /** 菜单名称 */
  label: string;
  /** 排序 */
  sortValue?: number;
  /** 路由名称 */
  name?: string;
  /** 路由地址 */
  path?: string;
  /** 组件地址 */
  component?: string;
  /** 重定向地址 */
  redirect?: string;
  /** 图标 */
  icon?: string;
  /** 权限标识 */
  authority?: string;
  /** 菜单类型 */
  type: MenuType;
  /** 是否隐藏 */
  hide?: boolean;
  /** 是否缓存 */
  keepAlive?: boolean;
  /** 外链地址 */
  href?: string;
  /** 内链地址 */
  frameSrc?: string;
}

/**
 * 菜单更新DTO
 */
export interface SysMenuUpdateDTO {
  /** 主键ID */
  id: number;
  /** 父级id */
  parentId?: number;
  /** 菜单名称 */
  label?: string;
  /** 排序 */
  sortValue?: number;
  /** 路由名称 */
  name?: string;
  /** 路由地址 */
  path?: string;
  /** 组件地址 */
  component?: string;
  /** 重定向地址 */
  redirect?: string;
  /** 图标 */
  icon?: string;
  /** 权限标识 */
  authority?: string;
  /** 菜单类型 */
  type?: MenuType;
  /** 是否隐藏 */
  hide?: boolean;
  /** 是否缓存 */
  keepAlive?: boolean;
  /** 外链地址 */
  href?: string;
  /** 内链地址 */
  frameSrc?: string;
  /** 版本号 */
  version?: number;
}
/**
 * 菜单类型选项
 */
export const MENU_TYPE_OPTIONS = [
  { label: '菜单', value: 'MENU' as MenuType },
  { label: '资源', value: 'RESOURCE' as MenuType },
];

/**
 * 默认分页配置
 */
export const DEFAULT_PAGE_CONFIG = {
  pageSize: 10,
  pageNumber: 1,
};

/**
 * 菜单表单默认值
 */
export const DEFAULT_MENU_FORM: Partial<SysMenuSaveDTO> = {
  parentId: null,
  label: '',
  type: 'MENU',
  sortValue: 0,
  hide: false,
  keepAlive: false,
};
