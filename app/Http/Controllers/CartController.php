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
            'product_id' => 'required|exists:products,id',
        ]);

        $cart = Cart::where([
                'user_id' => auth()->user()->id,
                'product_id' => $request->product_id
            ])->first();

        if (!$cart) {
            $newCart = Cart::create([
                'user_id' => auth()->user()->id,
                'product_id' => $request->product_id,
                'quantity' => '1'
            ]);
            return response()->json([
                'message' => 'Successfully Added Cart',
                'data' => [
                    'cart' => $newCart
                ],
            ]);
        }

        if($cart) {
            Cart::where([
                'user_id' => auth()->user()->id,
                'product_id' => $request->product_id
            ])->update(['quantity' => $cart->quantity + 1]);
            $cart->quantity += 1;
            return response()->json([
                'message' => 'Successfully Added Cart',
                'data' => [
                    'cart' => $cart
                ],
            ]);
        }

        return response()->json([
                'message' => 'Something went wrong in adding cart',
            ], 500);
    }

    public function decreaseCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $cart = Cart::where([
                'user_id' => auth()->user()->id,
                'product_id' => $request->product_id,
            ])->first();

        if (!$cart) {
            return response()->json([
                'message' => 'Something went wrong in adding cart',
                'error' => 'Cart does not exist'
            ], 500);
        }

        if($cart->quantity === 1) {
            Cart::where([
                'user_id' => auth()->user()->id,
                'product_id' => $request->product_id
            ])->delete();

            return response()->json([
                'message' => 'Successfully removed cart',
                'cart' => 1
            ]);
        }

        if($cart->quantity > 1) {
            Cart::where([
                'user_id' => auth()->user()->id,
                'product_id' => $request->product_id
            ])->update(['quantity' => $cart->quantity - 1]);
            $cart->quantity -= 1;

            return response()->json([
                'message' => 'Successfully removed cart',
                'cart' => $cart
            ]);
        }


    }
}
