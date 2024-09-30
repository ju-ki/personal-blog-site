<?php

use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ImageController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\TagController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'register']);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware(['auth:sanctum', 'web']);


Route::get('/posts', [PostController::class, 'index']);
//auth:sanctumだけで行けるらしいが、401が出てしまうので一時的に両方出すようにする
Route::middleware(['auth:sanctum', 'web'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin');
    Route::post('/posts/create', [PostController::class, 'create']);
    Route::post('/posts/update', [PostController::class, 'updatePost']);
    Route::get('/posts/detail', [PostController::class, 'show']);
    Route::delete('/posts/delete', [PostController::class, 'delete']);
    Route::post('/image/upload', [ImageController::class, 'upload']);
    Route::post('/categories/create', [CategoryController::class, 'create']);
    Route::post('/tags/create', [TagController::class, 'create']);
});

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/tags', [TagController::class, 'index']);
