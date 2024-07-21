import axios from 'axios';
import React, { useEffect, useState } from 'react'

type PostType = {
    id: number;
    title: string;
    content: string;
}

const Posts = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost/api/posts');
            console.log(response);
            setPosts(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);
    return (
        <>
            <div>記事一覧</div>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </>

    )
}

export default Posts