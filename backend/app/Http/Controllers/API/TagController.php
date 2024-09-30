<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use App\Services\TagService;
use Illuminate\Http\Request;

class TagController extends Controller
{
    protected TagService $tagService;

    public function __construct(TagService $tagService)
    {
        $this->tagService = $tagService;
    }

    /**
     * タグ一覧を取得する
     *
     */
    public function index()
    {
        $tags = $this->tagService->get_all_tags();
        return response()->json($tags, 200);
    }

    /**
     * タグを新規作成する
     *
     * @param Request $request
     */
    public function create(Request $request)
    {
        $tag = new Tag;
        $tag->name = $request->name;
        $tags = $this->tagService->create($tag);
        return response()->json($tags, 201);
    }
}
