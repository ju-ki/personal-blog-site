import { AxiosResponseType } from '@/types/common';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { z } from 'zod';

const schema = z.object({
  email: z.string().min(1, 'メールアドレスを入力してください'),
  password: z.string().min(1, 'パスワードを入力してください'),
});

type FormData = z.infer<typeof schema>;

const schema2 = z
  .object({
    email: z.string().min(1, 'メールアドレスを入力してください'),
    password: z.string().min(1, 'パスワードを入力してください'),
    password_confirmation: z.string().min(1, 'パスワード確認を入力してください'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ['password_confirmation'],
    message: 'パスワードが一致しません',
  });
type FormData2 = z.infer<typeof schema2>;

export async function getInitCSRFSetting() {
  try {
    await axios.get('http://localhost/sanctum/csrf-cookie ', {
      withCredentials: true,
      withXSRFToken: true,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function register(data: FormData2): Promise<AxiosResponseType> {
  try {
    const response = await axios.post('http://localhost/api/register', data, {
      withCredentials: true,
      withXSRFToken: true,
    });
    return { status: 200, data: response };
  } catch (err) {
    console.log(err);
    const axiosError = err as AxiosError;
    if (axiosError.response && axiosError.response.status === 422) {
      const axiosResponse = axiosError.response as AxiosResponse;
      return { status: 422, message: axiosResponse.data.message };
    }

    return { status: 500, message: axiosError.message ? axiosError.message : 'サーバーでエラーが発生しました' };
  }
}

export async function login(data: FormData): Promise<AxiosResponseType> {
  try {
    const response = await axios.post('http://localhost/api/login', data, {
      withCredentials: true,
      withXSRFToken: true,
    });
    return { status: 200, data: response };
  } catch (err) {
    console.log(err);
    const axiosError = err as AxiosError;
    if (axiosError.response && axiosError.response.status === 422) {
      const axiosResponse = axiosError.response as AxiosResponse;
      return { status: 422, message: axiosResponse.data.message };
    }

    return { status: 500, message: axiosError.message ? axiosError.message : 'サーバーでエラーが発生しました' };
  }
}

export async function getUser(): Promise<AxiosResponseType> {
  try {
    const response = await axios('http://localhost/api/user', {
      withCredentials: true,
      withXSRFToken: true,
    });
    return { status: 200, data: response };
  } catch (error) {
    console.log(error);
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status === 422) {
      const axiosResponse = axiosError.response as AxiosResponse;
      return { status: 422, message: axiosResponse.data.message };
    }
    return { status: 500, message: axiosError.message ? axiosError.message : 'サーバーでエラーが発生しました' };
  }
}
