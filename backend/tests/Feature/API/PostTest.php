<?php

namespace Tests\Feature\API;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use function PHPUnit\Framework\assertEquals;

class PostTest extends TestCase
{
    use RefreshDatabase;
    /**
     * 記事一覧のHTTPレスポンステスト
     */
    public function test_api_access_test(): void
    {
        $response = $this->get('/api/posts');

        $response->assertStatus(200);

        $response->assertJsonStructure([
            '*' => [
                'id',
                'title',
                'tags',
                'content'
            ],
        ]);
    }

    /**
     * 記事作成のHTTPレスポンステスト
     */
    public function test_api_create_post(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);

        $response = $this->post('/api/posts/create', [
            'title' => 'Test Post',
            'content' => 'Test Content',
            'user_id' => $user->id,

        ]);

        $response->assertStatus(201);
    }

    /**
     * 記事作成に認証情報がない場合のHTTPレスポンステスト
     */
    public function test_api_create_post_without_authentication(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $response = $this->post('/api/posts/create', [
            'title' => 'Test Post',
            'content' => 'Test Content',
            'user_id' => $user->id,

        ]);

        $response->assertStatus(500);
    }

    /**
     * 記事作成のHTTPレスポンステスト
     */
    public function test_api_get_post_detail(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);

        $response = $this->post('/api/posts/create', [
            'title' => 'Test Post',
            'content' => 'Test Content',
            'user_id' => $user->id,

        ]);
        $response->assertStatus(201);

        $detailResponse = $this->get('/api/posts/detail?id=' . $response->json('id'));

        assertEquals($response->json('id'), $detailResponse->json('id'));
    }
}
