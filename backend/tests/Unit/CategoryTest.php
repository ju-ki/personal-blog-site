<?php

namespace Tests\Unit;

use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase;

class CategoryTest extends TestCase
{
    use RefreshDatabase;

    protected Category $category;
    protected CategoryService $categoryService;
    /**
     * A basic unit test example.
     */
    public function test_category(): void
    {
        Category::factory()->create([
            'name' => 'カテゴリ1'
        ]);

        $this->assertDatabaseCount('categories', 1);

        $this->assertDatabaseHas('categories', [
            'name' => 'カテゴリ1'
        ]);
    }

    /**
     * 全てのカテゴリを取得する
     *
     * @return void
     */
    public function test_all_categories(): void
    {
        $this->categoryService = app()->make(CategoryService::class);
        Category::factory()->create([
            'name' => 'カテゴリ1'
        ]);

        $categories = $this->categoryService->get_all_categories();
        $this->assertEquals(1, $categories->count());
        $this->assertEquals('カテゴリ1', $categories[0]->name);
    }

    /**
     * カテゴリ新規作成のテスト
     *
     * @return void
     */
    public function test_create_new_category(): void
    {
        $this->categoryService = app()->make(CategoryService::class);
        $this->category = new Category();
        $this->category->name = 'カテゴリ2';

        $response = $this->categoryService->create($this->category);
        $this->assertEquals('カテゴリ2', $response[0]->name);
        $this->assertDatabaseCount('categories', 1);
        $this->assertDatabaseHas('categories', [
            'name' => 'カテゴリ2'
        ]);
    }


    /**
     * カテゴリを更新するテスト
     *
     * @return void
     */
    public function test_update_category(): void
    {
        $this->categoryService = app()->make(CategoryService::class);
        $this->category = new Category();
        $this->category->name = 'new category';

        $response = $this->categoryService->create($this->category);

        $this->assertEquals('new category', $response[0]->name);
        $this->assertEquals(4, $response[0]->id);

        $this->category->name = 'updated category';
        $this->category->id = $response[0]->id;

        $response = $this->categoryService->update($this->category);

        $this->assertEquals('updated category', $response[0]->name);
        $this->assertEquals(4, $response[0]->id);
    }


    /**
     * カテゴリを削除するテスト
     *
     * @return void
     */
    public function test_delete_category(): void
    {
        $this->categoryService = app()->make(CategoryService::class);
        $this->category = new Category();
        $this->category->name = 'delete category';

        $response = $this->categoryService->create($this->category);

        $this->assertEquals('delete category', $response[0]->name);
        $this->assertEquals(5, $response[0]->id);

        $this->categoryService->delete($response[0]->id);

        $this->assertDatabaseMissing('categories', [
            'id' => 5
        ]);
    }
}
