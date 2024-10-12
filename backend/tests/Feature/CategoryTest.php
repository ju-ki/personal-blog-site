<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    use RefreshDatabase;
    /**
     * カテゴリ一覧のHTTPレスポンステスト
     */
    public function test_api_category_test(): void
    {
        Category::factory()->create([
            'name' => 'カテゴリ1'
        ]);
        $response = $this->get('/api/categories');

        $response->assertStatus(200);

        $response->assertJsonStructure([
            '*' => [
                'id',
                'name'
            ]
        ]);
    }

    /**
     * カテゴリを新規作成するAPIテスト
     *
     * @return void
     */
    public function test_api_create_category(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);

        $response = $this->postJson('/api/categories/create', [
            'name' => 'カテゴリ2'
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure([
            '*' => [
                'id',
                'name'
            ]
        ]);
    }

    public function test_api_update_category(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);

        $category = Category::factory()->create([
            'name' => 'new category'
        ]);

        $response = $this->patchJson('/api/categories/update', [
            'id' => $category->id,
            'name' => 'updated category'
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
                'id',
                'name'
            ]
        ]);

        // 更新されたカテゴリが返却されていることを確認
        $response->assertJson(
            fn(AssertableJson $json) =>
            $json->where('0.id', $category->id)
                ->where('0.name', 'updated category')
                ->etc()
        );

        // データベースのカテゴリが更新されたことを確認
        $this->assertDatabaseHas('categories', [
            'id' => $category->id,
            'name' => 'updated category',
        ]);
    }

    public function test_api_delete_category(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);

        $category = Category::factory()->create([
            'name' => 'delete category'
        ]);

        $response = $this->deleteJson('/api/categories/delete?id=' . $category->id);

        $response->assertStatus(200);

        // データベースのカテゴリが削除されたことを確認
        $this->assertDatabaseMissing('categories', [
            'id' => $category->id,
        ]);
    }
}
