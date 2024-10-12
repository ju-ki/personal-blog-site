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


    /**
     * カテゴリを編集する
     *
     * @param Category $category
     * @return \Illuminate\Database\Eloquent\Collection<int, \App\Models\Category>
     */
    public function update(Category $category): Collection
    {
        Category::where('id', $category->id)->update([
            'name' => $category->name
        ]);

        $categories = $this->get_all_categories();

        return $categories;
    }

    /**
     * カテゴリを削除する
     *
     * @param integer $id
     * @return Collection
     */
    public function delete(int $id): Collection
    {
        Category::destroy($id);

        $categories = $this->get_all_categories();
        return $categories;
    }
}
