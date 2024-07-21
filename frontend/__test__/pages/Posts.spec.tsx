import Posts from "@/pages/posts";
import { render, screen, waitFor } from '@testing-library/react';
import { expect, test } from "bun:test";


const posts = [
    { id: 1, title: '記事1', content: '記事1の内容' },
    { id: 2, title: '記事2', content: '記事2の内容' },
];

test('render post comp', async () => {
    render(<Posts />);
    // await waitFor(() => expect(screen.getByText('Posts')).toBeInTheDocument());
    // posts.forEach(post => {
    //     expect(screen.getByText(post.title)).toBeInTheDocument();
    //     expect(screen.getByText(post.content)).toBeInTheDocument();
    // });
})