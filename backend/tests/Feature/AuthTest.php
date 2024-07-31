<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_register(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'testuser',
            'email' => 'test@example.com',
            'password' => 'testpass',
            'password_confirmation' => 'testpass'
        ]);
        $response->assertStatus(201);

        $this->assertDatabaseCount('users', 1);
        $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
    }

    public function test_login_and_authenticated(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);
        $response = $this->get('/api/login', [
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200);

        $this->actingAs($user);

        $this->assertAuthenticated();
        $this->assertAuthenticatedAs($user);
    }

    /**
     * ゲスト認証処理
     *
     * @return void
     */
    public function test_user_is_not_authenticated_without_login()
    {
        $this->assertGuest();
    }

    /**
     * ログイン成功時のリダイレクト処理
     *
     * @return void
     */
    public function test_redirect_after_successful_login()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);
        $response = $this->post('/api/login', [
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(302);

        $response->assertRedirect('/admin');
        $this->assertAuthenticatedAs($user);
    }
}
