import type {
  SysFile,
  SysFileQueryParam,
  SysFileUploadDTO,
} from './file-model';

import type { ID, IDS, PageQuery, PageResult } from '#/api/common';

import { requestClient } from '#/api/request';

enum Api {
  /** 批量删除 */
  batch = '/system/file/batch',
  /** 单体查询/删除 */
  byId = '/system/file',
  /** 下载文件 */
  download = '/system/file/download',
  /** 分页查询 */
  page = '/system/file/page',
  /** 批量查询 */
  query = '/system/file/query',
  /** 上传文件 */
  upload = '/system/file/upload',
}

/**
 * 分页查询文件
 * @param params 分页查询参数
 * @returns 分页结果
 */
export function filePage(params: PageQuery<SysFileQueryParam>) {
  return requestClient.post<PageResult<SysFile>>(Api.page, params);
}

/**
 * 批量查询文件
 * @param params 查询参数
 * @returns 文件列表
 */
export function fileQuery(params?: SysFileQueryParam) {
  return requestClient.post<SysFile[]>(Api.query, params);
}

/**
 * 单体查询文件
 * @param id 主键ID
 * @returns 文件信息
 */
export function fileInfo(id: ID) {
  return requestClient.get<SysFile>(`${Api.byId}/${id}`);
}

/**
 * 单体删除文件
 * @param id 主键ID
 * @returns 是否成功
 */
export function fileRemove(id: ID) {
  return requestClient.delete<boolean>(`${Api.byId}/${id}`);
}

/**
 * 批量删除文件
 * @param ids 主键ID数组
 * @returns 是否成功
 */
export function fileRemoveBatch(ids: IDS) {
  return requestClient.delete<boolean>(Api.batch, { data: ids });
}

/**
 * 上传文件
 * @param data 上传参数
 * @returns 文件信息
 */
export function fileUpload(data: SysFileUploadDTO) {
  const formData = new FormData();
  formData.append('file', data.file);
  if (data.bizType) formData.append('bizType', data.bizType);
  if (data.bucket) formData.append('bucket', data.bucket);
  if (data.storageType) formData.append('storageType', data.storageType);

  return requestClient.post<SysFile>(Api.upload, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

/**
 * 下载文件
 * @param id 文件ID
 * @returns 文件流
 */
export function fileDownload(id: ID) {
  return requestClient.get<Blob>(`${Api.download}/${id}`, {
    responseType: 'blob',
  });
}
