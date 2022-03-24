<?php

namespace App\Http\Controllers;

use App\Http\Resources\Transactions\TransactionResource;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Models\Transactions;

class TransactionsController extends Controller
{
    const PENDING_STATUS = 0;
    const SHIPPED_STATUS = 1;
    const DELIVERED_STATUS = 2;
    const CANCELLED_STATUS = 3;

    public function index()
    {
        $transactions = Transactions::with(['product', 'user'])->paginate(10);
        return response()->json([
            'transactions' => TransactionResource::collection($transactions)
        ]);
    }

    public function show()
    {
        $transactions = Transactions::where('user_id', auth()->user()->id)
            ->with('product')->get();
        return response()->json([
            'transactions' => TransactionResource::collection($transactions)
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'reference_id' => 'required|exists:transactions,reference_id',
            'status' => 'required'
        ]);

        if(
            ! in_array($request->status, [
                self::PENDING_STATUS,
                self::CANCELLED_STATUS,
                self::DELIVERED_STATUS,
                self::SHIPPED_STATUS,
            ])
        ) {
            return response()->json([
                'message' => 'Status does not exists',
                'errors' => [
                    'status' => 'Must be int (0, 1, 2, 3)'
                ]
            ]);
        }

        if(!$this->authorizeStatus($request->status)) {
            return response()->json([
                'message' => 'You are trying to access unauthorized action'
            ], 422);
        }
        try {
            $transaction = Transactions::where('reference_id', $request->reference_id)->first();
            $transaction->status = $request->status;
            $transaction->save();
        } catch (QueryException $q) {
            return response()->json([
                'message' => 'Something went wrong, please try again',
                'error' => [
                    'query' => $q->getMessage()
                ]
            ], 422);
        }

        return response()->json([
            'message' => 'Successfully Updated Transaction',
        ]);
    }

    public function authorizeStatus(int $status): bool
    {
        if ($status !== self::CANCELLED_STATUS && auth()->user()->is_admin === 0) {
            return false;
        }
        return true;
    }
}
