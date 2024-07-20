<?php

namespace Tests\Unit;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;
    /**
     * 初回テスト
     */
    public function test_init_data_count(): void
    {
        $this->assertDatabaseCount('users', 0);
    }

    /**
     * ユーザーの作成ができるかのテスト
     *
     * @return void
     */
    public function test_create_dummy_user(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->assertDatabaseHas('users', [
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->assertDatabaseCount('users', 1);
    }
}
