<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartResource;
use App\Http\Resources\UserForCartResource;
use App\Models\Cart;
use App\Models\User;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        $cart = CartResource::collection(
            Cart::with('product')
            ->where('user_id', 3)->get());
        $user = UserForCartResource::collection(
            User::where('id', 3)
            ->get()
        );

        return response()->json([
            'user' => $user,
            'cart' => $cart,
        ]);
    }

    public function addCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required',
            'quantity' => 'required|numeric|gt:0'
        ]);

        try {
            $cart = Cart::updateOrCreate([
                'user_id' => auth()->user()->id,
                'product_id' => $request->product_id],
                ['quantity' => $request->quantity]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong in adding cart',
                'ERROR' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'message' => 'Successfully Added Cart',
            'cart' => $cart
        ]);
    }

    public function decreaseCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required',
            'quantity' => 'required|numeric|gt:0'
        ]);

        $cart = Cart::where([
                'user_id' => auth()->user()->id,
                'product_id' => $request->product_id,
            ])->first();

        if (!$cart) {
            return response()->json([
                'message' => 'Something went wrong in adding cart',
            ], 500);
        }

        if($cart->quantity === 1) {
            $cart->delete();
        }

        if($cart->quantity > 1) {
            $cart->quantity -= 1;
            $cart->save();
        }

        return response()->json([
            'message' => 'Successfully removed cart'
        ]);
    }

    public function destroy(Request $request)
    {

    }
}
