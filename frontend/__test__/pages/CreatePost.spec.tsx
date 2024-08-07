import { login } from '@/hooks/api/auth';
import { createNewPost } from '@/hooks/api/posts';
import CreatePost from '@/pages/create_post';
import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import { act } from 'react';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Create Post Component', () => {
  it('should render the create post component', () => {
    render(<CreatePost />);
    expect(screen.getByText('タイトル')).toBeInTheDocument();
    expect(screen.getByText('コンテント')).toBeInTheDocument();
  });
});

describe('バリデーションチェック', () => {
  it('タイトルが空のテスト', async () => {
    render(<CreatePost />);
    fireEvent.change(screen.getByLabelText('コンテント'), { target: { value: 'Test Content' } });
    fireEvent.click(screen.getByText('投稿'));
    expect(await screen.findByText('タイトルを入力して下さい'));
  });
  it('コンテントが空のテスト', async () => {
    render(<CreatePost />);
    fireEvent.change(screen.getByLabelText('タイトル'), { target: { value: 'Test Title' } });
    fireEvent.click(screen.getByText('投稿'));
    expect(await screen.findByText('コンテントを入力して下さい'));
  });
  it('タイトル+コンテントの両方が空のテスト', async () => {
    render(<CreatePost />);
    fireEvent.click(screen.getByText('投稿'));
    expect(await screen.findByText('タイトルを入力して下さい'));
    expect(await screen.findByText('コンテントを入力して下さい'));
  });

  it('送信テスト(成功)', async () => {
    const mockLoginResponse = { status: 200, data: 'success' };
    mockedAxios.post.mockResolvedValueOnce(mockLoginResponse);

    await act(async () => {
      const loginResult = await login({ email: 'test@example.com', password: 'password' });
      expect(loginResult.status).toBe(200);
    });

    render(<CreatePost />);
    const mockPostResponse = {
      status: 201,
      data: {
        title: 'Test Title',
        content: 'Test Content',
      },
    };
    mockedAxios.post.mockResolvedValueOnce(mockPostResponse);
    await act(async () => {
      fireEvent.change(screen.getByLabelText('タイトル'), { target: { value: 'Test Title' } });
      fireEvent.change(screen.getByLabelText('コンテント'), { target: { value: 'Test Content' } });
      fireEvent.click(screen.getByText('投稿'));

      const result = await createNewPost({ title: 'Test Title', content: 'Test Content', user_id: 3 });
      expect(result.status).toBe(201);
      expect(result.data).toEqual(mockPostResponse.data);
    });
  });
});
