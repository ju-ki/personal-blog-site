<?php

namespace App\Services;

use App\Models\Post;

class PostService
{
    /**
     * 記事の一覧を返却
     */
    public function get_posts()
    {
        //TODO: 一旦leftJoinで対応(登録時の処理ができていないため)
        $posts = Post::all();

        return $posts;
    }

    /**
     * 記事一覧を取得する
     */
    public function getAllPosts()
    {
        $allPosts = Post::all();
        return $allPosts;
    }

    /**
     * 記事詳細を取得する
     *
     * @param integer $post_id
     * @return Post
     */
    public function getPostDetail(int $post_id)
    {
        $postDetail = Post::where('id', $post_id)->first();
        return $postDetail;
    }

    /**
     * 記事作成
     *
     * @param Post $post
     * @return Post
     */
    public function create(Post $post)
    {
        // 記事の作成処理
        $newPosts = Post::create([
            'title' => $post->title,
            'content' => $post->content,
            'user_id' => $post->user_id,
            'status' => $post->status
        ]);

        $newPosts = Post::where('id', '=', $newPosts->id)->first();
        return $newPosts;
    }


    /**
     * 記事編集
     *
     * @param Post $post
     * @return Post
     */
    public function updatePost(Post $post)
    {
        // 記事の編集処理
        $newPosts = Post::where('id', $post->id)->update([
            'title' => $post->title,
            'content' => $post->content,
        ]);

        $newPosts = Post::where('id', '=', $post->id)->first();
        return $newPosts;
    }
}
