import axios, { AxiosError, AxiosResponse } from 'axios';
import { getInitCSRFSetting } from '../auth';
import { AxiosResponseType } from '@/types/common';
import { TagType } from '@/types/tag';

export async function fetchAllTags(): Promise<TagType[]> {
  try {
    const response = await axios.get('http://localhost/api/tags');
    return response.data as TagType[];
  } catch (err) {
    console.error(err);
    throw new Error('タグの取得に失敗しました');
  }
}

export async function createTag(name: string): Promise<AxiosResponseType> {
  try {
    await getInitCSRFSetting();
    const response = await axios.post(
      'http://localhost/api/tags/create',
      { name: name },
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
