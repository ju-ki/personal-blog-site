<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class  TagTest extends TestCase
{
    use RefreshDatabase;
    /**
     * タグ一覧のHTTPレスポンステスト
     */
    public function test_api_tag_test(): void
    {
        Tag::factory()->create([
            'name' => 'タグ1'
        ]);
        $response = $this->get('/api/tags');

        $response->assertStatus(200);

        $response->assertJsonStructure([
            '*' => [
                'id',
                'name'
            ]
        ]);
    }

    public function test_api_create_tag(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);

        $response = $this->postJson('/api/tags/create', [
            'name' => 'タグ2'
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
