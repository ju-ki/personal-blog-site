<?php

namespace Tests\Feature\API;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PostTest extends TestCase
{
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
}
