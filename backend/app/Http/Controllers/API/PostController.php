<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Services\PostService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    protected PostService $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;;
    }
    //
    public function index()
    {
        $posts = $this->postService->getAllPosts();
        return response()->json($posts, 200);
    }

    public function create(Request $request)
    {
        $post = new Post();
        $post->title = $request->title;
        $post->content = $request->content;
        $post->user_id = Auth::id();
        $posts = $this->postService->create($post);

        return response()->json($posts, 201);
    }

    public function show(Request $request)
    {
        $post_id = $request->id;
        $detailPost = $this->postService->getPostDetail($post_id);
        return response()->json($detailPost, 200);
    }
    public function updatePost(Request $request)
    {
        $post = new Post();
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

    public function delete(Request $request)
    {
        $post_id = $request->id;
        $this->postService->delete($post_id);
        return response()->json('success', 200);
    }
}
