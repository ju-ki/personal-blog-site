<?php

namespace App\Http\Controllers\Api;

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
}
