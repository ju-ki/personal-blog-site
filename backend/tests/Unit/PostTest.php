<?php

namespace Tests\Unit;

use App\Services\PostService;
use Tests\TestCase;

class PostTest extends TestCase
{
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
}
