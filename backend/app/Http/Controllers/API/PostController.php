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
        $posts = $this->postService->get_posts();
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
}
