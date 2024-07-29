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

    public function test_user_is_not_authenticated_without_login()
    {
        $this->assertGuest();
    }
}
