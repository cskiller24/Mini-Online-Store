<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function test()
    {
        return response()->json(['message' => 'Authorized']);
    }
}
