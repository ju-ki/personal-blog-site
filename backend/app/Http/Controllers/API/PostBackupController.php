<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\PostBackups;
use App\Services\PostBackupService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostBackupController extends Controller
{
    protected PostBackupService $postService;

    public function __construct(PostBackupService $postService)
    {
        $this->postService = $postService;;
    }
    //
    public function index()
    {
        $posts = $this->postService->getAllPosts();
        return response()->json($posts, 200);
    }

    /**
     * 記事作成をするAPI
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        try {
            $post = new PostBackups();
            $post->title = $request->title;
            $post->content = $request->content;
            $post->category_id = $request->category_id;
            $post->user_id = Auth::id();
            $tagsId = is_null($request->tags) ? array() : $request->tags;
            $posts = $this->postService->create($post, $tagsId);

            return response()->json($posts, 201);
        } catch (Exception $error) {
            return response()->json(['error' => $error->getMessage()], 500);
        }
    }

    public function show(Request $request)
    {
        $post_id = $request->id;
        $detailPost = $this->postService->getPostDetail($post_id);
        return response()->json($detailPost, 200);
    }

    /**
     * 記事を更新するAPI
     *
     * @param Request $request
     */
    public function updatePost(Request $request)
    {
        $post = new PostBackups();
        $post->id = $request->id;
        $post->title = $request->title;
        $post->content = $request->content;
        $post->user_id = Auth::id();
        $posts = $this->postService->updatePost($post);

        return response()->json($posts, 200);
    }

    /**
     * ステータスを変える処理
     *
     * @param Request $request
     */
    public function updateStatus(Request $request)
    {
        $posts = $this->postService->updateStatus($request->id, $request->status);

        return response()->json($posts, 200);
    }

    /**
     * 記事を削除するAPI
     *
     * @param Request $request
     */
    public function delete(Request $request)
    {
        $post_id = $request->id;
        $this->postService->delete($post_id);
        return response()->json('success', 200);
    }
}
