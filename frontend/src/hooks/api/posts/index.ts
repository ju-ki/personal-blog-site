import { AxiosResponseType } from '@/types/common';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { getInitCSRFSetting } from '../auth';
import { PaginatePostType, PostType, StatusType } from '@/types/article';
export async function fetchAllPosts(page: number = 1): Promise<PaginatePostType> {
  try {
    const response = await axios.get(`http://localhost/api/posts?page=${page}`);
    return response.data as PaginatePostType;
  } catch (error) {
    console.error(error);
    throw new Error('記事情報の取得に失敗しました');
  }
}

export async function fetchDetailPost(postId: number): Promise<AxiosResponseType> {
  try {
    await getInitCSRFSetting();
    const response = await axios.get('http://localhost/api/posts/detail', {
      params: {
        id: postId,
      },
      withCredentials: true,
      withXSRFToken: true,
    });

    return response.data;
  } catch (err) {
    const axiosError = err as AxiosError;
    if (axiosError.response && axiosError.response.status === 422) {
      const axiosResponse = axiosError.response as AxiosResponse;
      return { status: 422, message: axiosResponse.data.message };
    }
    return { status: 500, message: axiosError.message ? axiosError.message : 'サーバーでエラーが発生しました' };
  }
}

export async function createNewPost(postType: PostType): Promise<AxiosResponseType> {
  try {
    await getInitCSRFSetting();
    const response = await axios.post('http://localhost/api/posts/create', postType, {
      withCredentials: true,
      withXSRFToken: true,
    });
    return { status: response.status, data: response.data };
  } catch (err) {
    const axiosError = err as AxiosError;
    if (axiosError.response && axiosError.response.status === 422) {
      const axiosResponse = axiosError.response as AxiosResponse;
      return { status: 422, message: axiosResponse.data.message };
    }
    return { status: 500, message: axiosError.message ? axiosError.message : 'サーバーでエラーが発生しました' };
  }
}

export async function updatePost(postType: PostType): Promise<AxiosResponseType> {
  try {
    await getInitCSRFSetting();
    const response = await axios.post('http://localhost/api/posts/update', postType, {
      withCredentials: true,
      withXSRFToken: true,
    });
    return { status: response.status, data: response.data };
  } catch (err) {
    const axiosError = err as AxiosError;
    if (axiosError.response && axiosError.response.status === 422) {
      const axiosResponse = axiosError.response as AxiosResponse;
      return { status: 422, message: axiosResponse.data.message };
    }
    return { status: 500, message: axiosError.message ? axiosError.message : 'サーバーでエラーが発生しました' };
  }
}

export async function updateStatus(id: number, status: StatusType) {
  try {
    await getInitCSRFSetting();
    const response = await axios.patch(
      'http://localhost/api/posts/update/status',
      { id: id, status: status },
      {
        withCredentials: true,
        withXSRFToken: true,
      }
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    const axiosError = err as AxiosError;
    if (axiosError.response && axiosError.response.status === 422) {
      const axiosResponse = axiosError.response as AxiosResponse;
      return { status: 422, message: axiosResponse.data.message };
    }
    return { status: 500, message: axiosError.message ? axiosError.message : 'サーバーでエラーが発生しました' };
  }
}

export async function deletePost(id: number): Promise<AxiosResponseType> {
  try {
    await getInitCSRFSetting();
    const response = await axios.delete('http://localhost/api/posts/delete', {
      params: { id: id },
      withCredentials: true,
      withXSRFToken: true,
    });
    return { status: response.status, data: response.data };
  } catch (err) {
    const axiosError = err as AxiosError;
    if (axiosError.response && axiosError.response.status === 422) {
      const axiosResponse = axiosError.response as AxiosResponse;
      return { status: 422, message: axiosResponse.data.message };
    }
    return { status: 500, message: axiosError.message ? axiosError.message : 'サーバーでエラーが発生しました' };
  }
}
