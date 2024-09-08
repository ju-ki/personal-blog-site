<?php

namespace App\Services;

use App\Models\Post;

class PostService
{
    /**
     * 記事の一覧を返却
     *
     * @return \Illuminate\Database\Eloquent\Collection<int, App\Models\Post>
     */
    public function get_posts()
    {
        //TODO: 一旦leftJoinで対応(登録時の処理ができていないため)
        $posts = Post::all();

        return $posts;
    }

    /**
     * 記事一覧を取得する
     *
     * @return \Illuminate\Database\Eloquent\Collection<int, App\Models\Post>
     */
    public function getAllPosts()
    {
        $allPosts = Post::all();
        return $allPosts;
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
}
