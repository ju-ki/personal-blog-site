<?php

namespace Tests\Feature;

use Tests\TestCase;

class DatabaseConnectionTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_database_connection_test(): void
    {
        $connectionName = \DB::connection()->getName();
        $this->assertEquals('mysql_testing', $connectionName);
    }
}
