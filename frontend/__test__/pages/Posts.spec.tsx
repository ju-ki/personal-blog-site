import { fetchAllPosts } from '@/hooks/api/posts';
import Posts from '@/pages/posts';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Post Component', () => {
  it('should render loading state initially', () => {
    render(<Posts />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render list of posts', async () => {
    const mockPosts = [
      { id: 1, title: '記事1', content: '記事1の内容' },
      { id: 2, title: '記事2', content: '記事2の内容' },
    ];
    mockedAxios.get.mockResolvedValue({ data: mockPosts });

    render(<Posts />);

    await waitFor(() => {
      expect(screen.getByText('記事1')).toBeInTheDocument();
      expect(screen.getByText('記事2')).toBeInTheDocument();
    });
  });
});

describe('記事取得のWeb APIのテスト', () => {
  it('should fetch all posts successfully', async () => {
    const mockPosts = [
      { id: 1, title: '記事1', tags: ['Python'], content: '記事1の内容' },
      { id: 2, title: '記事2', tags: ['PHP', 'javascript', 'HTML'], content: '記事2の内容' },
    ];
    mockedAxios.get.mockResolvedValue({ data: mockPosts });
    const result = await fetchAllPosts();

    expect(result).toEqual(mockPosts);
  });

  it('should fetch all posts with error', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));
    await expect(fetchAllPosts()).rejects.toThrow('記事情報の取得に失敗しました');
  });
});
