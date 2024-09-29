import { CategoryType } from '@/types/category';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { getInitCSRFSetting } from '../auth';
import { AxiosResponseType } from '@/types/common';

export async function fetchAllCategories(): Promise<CategoryType[]> {
  try {
    const response = await axios.get('http://localhost/api/categories');
    return response.data as CategoryType[];
  } catch (err) {
    console.error(err);
    throw new Error('カテゴリの取得に失敗しました');
  }
}

export async function createCategory(name: string): Promise<AxiosResponseType> {
  try {
    await getInitCSRFSetting();
    const response = await axios.post(
      'http://localhost/api/categories/create',
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
