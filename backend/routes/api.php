<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;

Route::get('/test-db', function () {
    return User::all();
});
