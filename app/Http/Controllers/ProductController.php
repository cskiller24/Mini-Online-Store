<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function test()
    {
        return response('Access Granted');
    }
}
