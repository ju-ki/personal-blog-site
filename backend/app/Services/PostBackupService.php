<?php

namespace App\Services;

use App\Models\PostBackups;
use Exception;
use Illuminate\Support\Facades\DB;

class PostBackupService
{
    /**
     * 記事の一覧を返却
     */
    public function get_posts()
    {
        //TODO: 一旦leftJoinで対応(登録時の処理ができていないため)
        $posts = PostBackups::all();

        return $posts;
    }

    /**
     * 記事一覧を取得する
     */
    public function getAllPosts()
    {
        $allPosts = PostBackups::all();
        return $allPosts;
    }

    /**
     * 記事詳細を取得する
     *
     * @param integer $post_id
     * @return PostBackups
     */
    public function getPostDetail(int $post_id)
    {
        $postDetail = PostBackups::with(['postTag.tag', 'category'])->where('id',  $post_id)->first();
        return $postDetail;
    }

    /**
     * 記事作成
     *
     * @param PostBackups $post
     * @param array $tagIds
     * @return PostBackups
     * @throws Exception
     */
    public function create(PostBackups $post, array $tagIds)
    {
        try {
            DB::beginTransaction();
            // 記事の作成処理
            $newPosts = PostBackups::create([
                'title' => $post->title,
                'content' => $post->content,
                'user_id' => $post->user_id,
                'status' => $post->status,
                'category_id' => isset($post->category_id) ? $post->category_id : 1,
            ]);

            $newPosts = PostBackups::where('id', '=', $newPosts->id)->first();

            if (!empty($tagIds)) {
                $newPosts->tags()->attach($tagIds);
            }

            DB::commit();
            return $newPosts;
        } catch (Exception $error) {
            DB::rollBack();
            \Log::error('記事作成に失敗しました:' . $error->getMessage());
            throw new Exception('記事作成に失敗しました', 500);
        }
    }


    /**
     * 記事編集
     *
     * @param PostBackups $post

     * @return PostBackups
     */
    public function updatePost(PostBackups $post)
    {
        // 記事の編集処理
        $newPosts = PostBackups::where('id', $post->id)->update([
            'title' => $post->title,
            'content' => $post->content,
        ]);

        $newPosts = PostBackups::where('id', '=', $post->id)->first();
        return $newPosts;
    }

    /**
     * 記事削除
     *
     * @param integer $id
     * @return void
     */
    public function delete(int $id)
    {
        // 記事の削除処理
        PostBackups::find($id)->delete();
    }
}
