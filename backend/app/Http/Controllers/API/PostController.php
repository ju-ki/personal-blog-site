<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\PostService;

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
}
