<?php

namespace App\Services;

use App\Models\Post;
use Illuminate\Http\Request;

class PostService
{
    /**
     * 記事の一覧を返却
     *
     * @return array
     */
    public function get_posts()
    {
        $posts = array(
            [
                'id' => 1,
                'title' => '記事1',
                'tags' => ['Python'],
                'content' => '記事1の内容',
            ],
            [
                'id' => 2,
                'title' => '記事2',
                'tags' => ['PHP', 'javascript', 'HTML'],
                'content' => '記事2の内容',
            ],
        );

        return $posts;
    }

    /**
     * 記事作成
     *
     * @param Post $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Post $post)
    {
        // 記事の作成処理
        $newPosts = $post->save();

        return response()->json(['data' => $newPosts, 'message' => '記事を登録しました'], 201);
    }
}
