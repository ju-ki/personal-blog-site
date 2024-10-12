<?php

namespace App\Http\Controllers\API;

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

    /**
     * タグを更新するAPI
     *
     * @param Request $request
     */
    public function update(Request $request)
    {
        $tag = new Tag;
        $tag->id = $request->id;
        $tag->name = $request->name;
        $tags = $this->tagService->update($tag);
        return response()->json($tags, 200);
    }


    /**
     * タグを削除するAPI
     *
     * @param Request $request
     */
    public function delete(Request $request)
    {
        $tag_id = $request->id;
        $tags = $this->tagService->delete($tag_id);
        return response()->json($tags, 200);
    }
}
