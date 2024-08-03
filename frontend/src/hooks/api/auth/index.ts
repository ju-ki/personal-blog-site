import { AxiosResponseType } from '@/types/common';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { z } from 'zod';

const schema = z.object({
  email: z.string().min(1, 'メールアドレスを入力してください'),
  password: z.string().min(1, 'パスワードを入力してください'),
});

type FormData = z.infer<typeof schema>;

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
