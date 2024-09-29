<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
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
}
