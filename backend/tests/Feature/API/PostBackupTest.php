<?php

namespace Tests\Feature\API;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use function PHPUnit\Framework\assertEquals;

class PostBackupTest extends TestCase
{
    use RefreshDatabase;

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

        $response = $this->post('/api/backup/posts/create', [
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

        $response = $this->post('/api/backup/posts/create', [
            'title' => 'Test Post',
            'content' => 'Test Content',
            'user_id' => $user->id,

        ]);

        $response->assertStatus(500);
    }

    /**
     * 記事更新のHTTPレスポンステスト
     */
    public function test_api_update_post(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);

        $response = $this->post('/api/backup/posts/create', [
            'title' => 'Test Post',
            'content' => 'Test Content',
            'user_id' => $user->id,

        ]);
        $response->assertStatus(201);

        $updatePost = $this->post('/api/backup/posts/update', [
            'id' => $response->json('id'),
            'title' => 'Test Post Updated',
            'content' => 'Test Content',
            'user_id' => $user->id,

        ]);
        $updatePost->assertStatus(200);

        assertEquals($updatePost->json('id'), $response->json('id'));
        assertEquals($updatePost->json('title'), 'Test Post Updated');
    }

    /**
     * 記事詳細取得のHTTPレスポンステスト
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

        $response = $this->post('/api/backup/posts/create', [
            'title' => 'Test Post',
            'content' => 'Test Content',
            'user_id' => $user->id,

        ]);
        $response->assertStatus(201);

        $detailResponse = $this->get('/api/backup/posts/detail?id=' . $response->json('id'));

        assertEquals($response->json('id'), $detailResponse->json('id'));
    }

    /**
     * 記事削除のHTTPレスポンステスト
     */
    public function test_api_delete_post(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);

        $response = $this->post('/api/backup/posts/create', [
            'title' => 'Test Post',
            'content' => 'Test Content',
            'user_id' => $user->id,

        ]);
        $response->assertStatus(201);

        $deletedResult = $this->delete('/api/backup/posts/delete?id=' . $response->json('id'));

        $deletedResult->assertStatus(200);

        $this->assertDatabaseMissing('post_backups', [
            'id' => $response->json('id'),
        ]);
    }
}
