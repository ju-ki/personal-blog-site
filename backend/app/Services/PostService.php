<?php

namespace App\Services;

use App\Enum\PostStatus;
use App\Models\Post;
use App\Models\PostBackups;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

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
        $query = Post::select('id', 'title', 'content', 'status', 'user_id', 'created_at')
            ->whereIn('status', [PostStatus::Public, PostStatus::Private])
            ->unionAll(
                PostBackups::select('id', 'title', 'content', 'status', 'user_id', 'created_at')->toBase()
            );

        $perPage = 10;
        $currentPage = request()->input('page', 1);

        $result = DB::table(DB::raw("({$query->toSql()}) as sub"))
            ->mergeBindings($query->getQuery())  // バインディングのマージ
            ->orderByDesc('created_at')
            ->paginate($perPage, ['*'], 'page', $currentPage);

        $posts = Post::hydrate($result->items());

        $allPostsPaginated = new LengthAwarePaginator(
            $posts,
            $result->total(),
            $result->perPage(),
            $result->currentPage(),
            ['path' => request()->url(), 'query' => request()->query()]
        );

        return $allPostsPaginated;
    }

    /**
     * 記事詳細を取得する
     *
     * @param integer $post_id
     * @return Post
     */
    public function getPostDetail(int $post_id)
    {
        $postDetail = Post::with(['postTag.tag', 'category'])->where('id',  $post_id)->first();
        return $postDetail;
    }

    /**
     * 記事作成
     *
     * @param Post $post
     * @param array $tagIds
     * @return Post
     * @throws Exception
     */
    public function create(Post $post, array $tagIds)
    {
        try {
            DB::beginTransaction();
            // 記事の作成処理
            $newPosts = Post::create([
                'title' => $post->title,
                'content' => $post->content,
                'user_id' => $post->user_id,
                'status' => isset($post->status) ?  $post->status : PostStatus::Private,
                'category_id' => isset($post->category_id) ? $post->category_id : 1,
            ]);

            $newPosts = Post::where('id', '=', $newPosts->id)->first();

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

    /**
     * 記事ステータスの変更
     *
     * @param int $post_id
     * @param string $status
     * @return Post
     */
    public function updateStatus(int $post_id, string $status)
    {
        $statusNum = PostStatus::convertStatusToNum($status);
        // 該当記事取得
        Post::where('id', '=', $post_id)->update([
            'status' => $statusNum
        ]);

        $newPosts = Post::where('id', '=', $post_id)->first();
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
        Post::find($id)->delete();
    }
}
