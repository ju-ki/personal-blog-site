import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getInitCSRFSetting, login } from '@/hooks/api/auth';

const Login = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const schema = z.object({
    email: z.string().min(1, 'メールアドレスを入力してください'),
    password: z.string().min(1, 'パスワードを入力してください'),
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
    const response = await login(data);
    if (response.status === 200) {
      router.push('/admin');
    } else if (response.status === 422 && response.message) {
      setErrorMessage(response.message);
    }
  };

  return (
    <div>
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>管理者ログイン</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            {
              <div className='text-red-500 mb-2 block' role='alert'>
                {errorMessage}
              </div>
            }
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
