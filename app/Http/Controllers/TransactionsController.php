<?php

namespace App\Http\Controllers;

use App\Http\Resources\temp\TransactionsResource;
use App\Models\Transactions;

class TransactionsController extends Controller
{
    const PENDING_STATUS = 0;
    const SHIPPED_STATUS = 1;
    const DELIVERED_STATUS = 2;
    const CANCELLED_STATUS = 3;

    public function index()
    {
        $transactions = Transactions::with('product')->paginate(2);
        return response()->json([
            'transactions' => TransactionsResource::collection($transactions)
        ]);
    }

//    public function show()
//    {
//        $transaction = Transactions::where('user_id', auth()->user()->id)->with([
//            'transaction' => fn($q) => $q->with('product')])->get();
//        return response()->json([
//            'user' => $transaction
//        ]);
//    }
}
