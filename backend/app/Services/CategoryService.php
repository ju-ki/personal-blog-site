<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;

class CategoryService
{
    /**
     * カテゴリ一覧を取得する
     * @return \Illuminate\Database\Eloquent\Collection<int, \App\Models\Category>
     */
    public function get_all_categories(): Collection
    {
        $categories = Category::all();
        return $categories;
    }

    /**
     * カテゴリの新規作成
     *
     * @param Category $category
     * @return \Illuminate\Database\Eloquent\Collection<int, \App\Models\Category>
     */
    public function create(Category $category): Collection
    {
        Category::create([
            'name' => $category->name
        ]);

        $categories = $this->get_all_categories();
        return $categories;
    }
}
