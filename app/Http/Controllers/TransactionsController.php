<?php

namespace App\Http\Controllers;

use App\Http\Resources\Transactions\TransactionResource;
use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Models\Transactions;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TransactionsController extends Controller
{
    const PENDING_STATUS = 0;
    const SHIPPED_STATUS = 1;
    const DELIVERED_STATUS = 2;
    const CANCELLED_STATUS = 3;

    public function index()
    {
        $transactions = Transactions::with(['product', 'user'])->paginate(25);
        if($transactions->count() <= 0) {
            return response()->json([
                'message' => 'No transactions retrieved',
                'data' => [
                    'transactions' => [],
                ],
            ], 204);
        }
        return response()->json([
            'message' => 'Successfully retrieve data',
            'data' => [
                'transactions' => TransactionResource::collection($transactions)
            ]
        ]);
    }

    public function show()
    {
        $transactions = Transactions::where('user_id', auth()->user()->id)
            ->with('product')->get();
        return response()->json([
            'message' => 'Successfully retrieve data',
            'data' => [
                'transactions' => TransactionResource::collection($transactions)
            ]
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'reference_id' => 'required|exists:transactions,reference_id',
            'status' => 'required|numeric'
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
            ], 401);
        }

        if(!$this->authorizeStatus($request->status)) {
            return response()->json([
                'message' => 'You are trying to access unauthorized action'
            ], 401);
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
            'data' => [
                'transaction' => [
                    'reference_id' => $request->reference_id,
                    'status' => $request->status,
                ]
            ]
        ]);
    }

    public function store(Request $request)
    {
        if(auth()->user()->is_admin === 1) {
            return response()->json([
                'message' => 'Unauthorized Access (You are an Admin)',
            ], 401);
        }

        try {
            DB::beginTransaction();
            // Get all the carts of user
            $carts = Cart::where('user_id', auth()->user()->id)->with('product')->get() ?? null;

            if($carts === [] || $carts === null || $carts->count() <= 0) {
                throw new \Exception('Cart does not exists');
            }

            $products = [];
            $transaction_chunk = [];
            foreach ($carts as $cart) {
                // Check if all products has enough quantity for the transaction
                if(($total =$cart['product']['quantity'] - $cart['quantity']) < 0) {
                    throw new \Exception('Quantity of a cart is greater than the stock');
                }
                $products[$cart['product']['id']] = $total; // Product for mass update
                $transaction_chunk[$cart['product']['id']] = $cart['quantity'];
            }
            // Product mass update
            foreach ($products as $key => $value) {
                Product::where('id', $key)->update(['quantity' => $value]);
            }
            $transaction = Transactions::create([
                'reference_id' => Str::uuid(),
                'user_id' => auth()->user()->id,
                'status' => self::PENDING_STATUS,
                'address' => $request->address,
                'contact_number' => $request->contact_number
            ]);
            // Mass insertion to transactions
            foreach ($transaction_chunk as $key => $value) {
                $transaction->product()->attach($key, ['quantity' => $value]);
            }
            Cart::where('user_id', auth()->user()->id)->delete();
            // Mass Deletion to carts
            DB::commit();
            return response()->json([
                'message' => 'Successfully added Transaction',
                'data' => [
                    'transaction' => $transaction
                ]
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Something went wrong please try again',
                'error' => [
                    'transaction' => $e->getMessage()
                ]
            ], 422);
        }
    }

    public function authorizeStatus(int $status): bool
    {
        if ($status !== self::CANCELLED_STATUS && auth()->user()->is_admin === 0) {
            return false;
        }
        return true;
    }
}
