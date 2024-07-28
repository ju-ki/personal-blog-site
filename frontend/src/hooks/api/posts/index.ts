import axios from 'axios';

type PostType = {
  id: number;
  title: string;
  tag: string[];
  content: string;
};

export async function fetchAllPosts(): Promise<PostType[]> {
  try {
    const response = await axios.get('http://localhost/api/posts');
    return response.data as PostType[];
  } catch (error) {
    throw new Error('記事情報の取得に失敗しました');
  }
}
