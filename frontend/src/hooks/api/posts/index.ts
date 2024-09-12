import { AxiosResponseType } from '@/types/common';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { getInitCSRFSetting } from '../auth';
import { StatusType } from '@/components/Posts/Admin/PostList';

export type PostType = {
  id: number;
  title: string;
  tag?: string[];
  content: string;
  status: StatusType;
  user_id?: number;
  created_at: Date;
};

export async function fetchAllPosts(): Promise<PostType[]> {
  try {
    const response = await axios.get('http://localhost/api/posts');
    return response.data as PostType[];
  } catch (error) {
    console.error(error);
    throw new Error('記事情報の取得に失敗しました');
  }
}

export async function fetchDetailPost(postId: number): Promise<PostType> {
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
  } catch (error) {
    throw new Error('記事の詳細情報の取得に失敗しました');
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
