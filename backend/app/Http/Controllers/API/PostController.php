<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;


class PostController extends Controller
{
    //
    public function index()
    {
        return response()->json([
            [
                'id' => 1,
                'title' => '記事1',
                'content' => '記事1の内容',
            ],
            [
                'id' => 2,
                'title' => '記事2',
                'content' => '記事2の内容',
            ],

        ], 200);
    }
}
