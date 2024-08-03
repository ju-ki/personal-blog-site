import { login } from '@/hooks/api/auth';
import Login from '@/pages/login';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ログイン処理のロジックテスト', () => {
  it('returns 200 and response data on successful login', async () => {
    const mockResponse = { data: 'success' };
    mockedAxios.post.mockResolvedValue(mockResponse);

    const result = await login({ email: 'test@example.com', password: 'password' });

    expect(result.status).toBe(200);
    expect(result.data).toBe(mockResponse);
  });

  it('returns 422 and error message when credentials do not match', async () => {
    const mockError = {
      response: {
        status: 422,
        data: { message: 'These credentials do not match our records.' },
      },
    } as AxiosError;

    mockedAxios.post.mockRejectedValue(mockError);

    const result = await login({ email: 'test@example.com', password: 'wrongpassword' });

    expect(result.status).toBe(422);
    expect(result.message).toBe('These credentials do not match our records.');
  });

  it('returns 500 and error message on server error', async () => {
    const mockError = {
      response: {
        status: 500,
        data: { message: 'Internal Server Error' },
      },
    } as AxiosError;

    mockedAxios.post.mockRejectedValue(mockError);

    const result = await login({ email: 'test@example.com', password: 'password' });

    expect(result.status).toBe(500);
    expect(result.message).toBe('サーバーでエラーが発生しました');
  });
});

describe('ログイン処理のUIテスト', () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
  });

  it('shows error when email and password is empty', async () => {
    render(<Login />);

    fireEvent.click(screen.getByText('ログイン'));
    expect(await screen.findByText('メールアドレスを入力してください')).toBeInTheDocument();
    expect(await screen.findByText('パスワードを入力してください')).toBeInTheDocument();
  });

  it('shows error when email is empty', async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'test@test.com' } });
    fireEvent.click(screen.getByText('ログイン'));
    expect(await screen.findByText('パスワードを入力してください')).toBeInTheDocument();
  });

  it('shows error when password is empty', async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText('パスワード'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('ログイン'));
    expect(await screen.findByText('メールアドレスを入力してください')).toBeInTheDocument();
  });

  it('shows error when credential does not match', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 422,
        data: { message: 'These credentials do not match our records.' },
      },
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText('パスワード'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('ログイン'));

    const alertElement = await waitFor(() => screen.findByRole('alert'));
    expect(alertElement).toHaveTextContent('These credentials do not match our records.');
  });

  it('success login', async () => {
    render(<Login />);
    mockedAxios.post.mockReturnValue(Promise.resolve());

    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText('パスワード'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('ログイン'));

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/admin');
    });
  });
});
