import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const schema = z.object({
    email: z.string().min(1, 'メールアドレスを入力してください'),
    password: z.string().min(1, 'パスワードを入力してください'),
  });

  async function getCsrfToken() {
    try {
      const response = await axios.get('http://localhost/sanctum/csrf-cookie ', {
        withCredentials: true,
        withXSRFToken: true,
      });
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getCsrfToken();
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
    try {
      const response = await axios.post('http://localhost/api/login', data, {
        withCredentials: true,
        withXSRFToken: true,
      });
      console.log(response);
      router.push('/admin');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>ログイン</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>管理者ログイン</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-4 py-4'>
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
            </div>
            <DialogFooter>
              <Button type='submit'>ログイン</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
