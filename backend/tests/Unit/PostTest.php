<?php

namespace Tests\Unit;

use App\Models\Post;
use App\Models\User;
use App\Services\PostService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Tests\TestCase;

class PostTest extends TestCase
{
    use RefreshDatabase;

    protected Post $post;
    protected PostService $service;
    /**
     * A basic unit test example.
     */
    public function test_post_get_service(): void
    {
        $this->service = app()->make(PostService::class);
        $posts = $this->service->get_posts();

        $this->assertIsArray($posts);

        $this->assertNotEmpty($posts);
        foreach ($posts as $post) {
            $this->assertArrayHasKey('id', $post);
            $this->assertArrayHasKey('title', $post);
            $this->assertArrayHasKey('tags', $post);
            $this->assertArrayHasKey('content', $post);

            $this->assertIsInt($post['id']);
            $this->assertIsString($post['title']);
            $this->assertIsArray($post['tags']);
            $this->assertIsString($post['content']);
        }
    }

    /**
     * 手動でブログを作成するテスト
     *
     * @return void
     */
    public function test_create_new_post_manually(): void
    {
        Post::factory()->create([
            'title' => 'Test Post',
            'content' => 'Test Content'
        ]);

        $this->assertDatabaseHas('posts', [
            'title' => 'Test Post',
            'content' => 'Test Content'
        ]);

        $this->assertDatabaseCount('posts', 1);
    }

    /**
     * サービスを介してブログを作成するテスト
     *
     * @return void
     */
    public function test_create_new_post(): void
    {
        $this->service = app()->make(PostService::class);

        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);
        $this->post = new Post;
        $this->post->title = 'Test Post';
        $this->post->content = 'Test Content';
        $this->post->user_id = $user->id;


        $this->service->create($this->post);

        $this->assertDatabaseHas('posts', [
            'title' => 'Test Post',
            'content' => 'Test Content',
            'user_id' => $user->id,
        ]);

        $this->assertDatabaseCount('posts', 1);
    }
}
