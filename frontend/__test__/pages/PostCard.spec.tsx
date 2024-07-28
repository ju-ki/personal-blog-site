import PostCard from '@/components/Posts/Card';
import { render, screen } from '@testing-library/react';

const mockArticle = {
  id: 1,
  title: '記事1',
  tags: ['Tag1', 'Tag2'],
  content: '記事1の内容',
};

describe('PostCard Component', () => {
  it('should render post title, tags, and content', () => {
    render(<PostCard article={mockArticle} />);

    expect(screen.getByText('記事1')).toBeInTheDocument();
    expect(screen.getByText('Tag1')).toBeInTheDocument();
    expect(screen.getByText('Tag2')).toBeInTheDocument();
    expect(screen.getByText('記事1の内容')).toBeInTheDocument();
  });
});
