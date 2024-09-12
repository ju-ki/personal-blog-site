import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getInitCSRFSetting, register } from '@/hooks/api/auth';
import axios, { AxiosError, AxiosResponse } from 'axios';

const Login = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const schema = z
    .object({
      name: z.string().min(1, '名前を入力してください'),
      email: z.string().min(1, 'メールアドレスを入力してください'),
      password: z.string().min(1, 'パスワードを入力してください'),
      password_confirmation: z.string().min(1, 'パスワード確認を入力してください'),
    })
    .refine((data) => data.password === data.password_confirmation, {
      path: ['password_confirmation'],
      message: 'パスワードが一致しません',
    });

  useEffect(() => {
    getInitCSRFSetting();
  }, []);

  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setErrorMessage('');
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
  };

  return (
    <div>
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>管理者作成</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            {
              <div className='text-red-500 mb-2 block' role='alert'>
                {errorMessage}
              </div>
            }
            <div className='grid gap-4 py-4'>
              {errors.name && <span className='text-red-500 mb-2 block'>{errors.name.message}</span>}
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Name
                </Label>
                <Input {...register('name')} id='name' className='col-span-3' type='text' />
              </div>
              {errors.email && <span className='text-red-500 mb-2 block'>{errors.email.message}</span>}
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='email' className='text-right'>
                  E-mail
                </Label>
                <Input {...register('email')} id='email' className='col-span-3' type='email' />
              </div>
              {errors.password && <span className='text-red-500 mb-2 block'>{errors.password.message}</span>}
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='password' className='text-right'>
                  パスワード
                </Label>
                <Input {...register('password')} id='password' className='col-span-3' type='password' />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='password-confirmation' className='text-right'>
                  パスワード確認
                </Label>
                <Input
                  {...register('password_confirmation')}
                  id='password-confirmation'
                  className='col-span-3'
                  type='password'
                />
              </div>
            </div>
            <DialogFooter>
              <Button type='submit'>登録</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
