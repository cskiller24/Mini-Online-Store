<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transactions;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function index()
    {
        $mostBroughtProduct = DB::table('transaction_details')
            ->select('product_id')
            ->selectRaw('COUNT(*) as count')
            ->groupBy('product_id')
            ->orderByDesc('count')
            ->first();

        return response()->json([
                'message' => 'Succesfully Retrieved Data',
                'data' => [
                    'userCount' => User::count(),
                    'productCount' => Product::count(),
                    'transactionCount' => Transactions::count(),
                    'topProduct' => [
                        'product' => Product::where('id', $mostBroughtProduct->product_id)->withTrashed()->first() ,
                        'count' => $mostBroughtProduct->count
                    ],
                ]
            ]);
    }
}
