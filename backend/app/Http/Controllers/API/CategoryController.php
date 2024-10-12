<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    protected CategoryService $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    /**
     * カテゴリ一覧を取得する
     *
     */
    public function index()
    {
        $categories = $this->categoryService->get_all_categories();
        return response()->json($categories, 200);
    }

    /**
     * カテゴリを新規作成する
     *
     * @param Request $request
     */
    public function create(Request $request)
    {
        $category = new Category;
        $category->name = $request->name;
        $categories = $this->categoryService->create($category);
        return response()->json($categories, 201);
    }


    /**
     * カテゴリを更新するAPI
     *
     * @param Request $request
     */
    public function update(Request $request)
    {
        $category = new Category;
        $category->id = $request->id;
        $category->name = $request->name;
        $categories = $this->categoryService->update($category);
        return response()->json($categories, 200);
    }


    /**
     * カテゴリを削除するAPI
     *
     * @param Request $request
     */
    public function delete(Request $request)
    {
        $category_id = $request->id;
        $categories = $this->categoryService->delete($category_id);
        return response()->json($categories, 200);
    }
}
