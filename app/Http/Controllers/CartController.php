<?php

namespace App\Http\Controllers;

use App\Http\Resources\Carts\CartResource;
use App\Models\Cart;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    //Show all carts (Specific)
    public function index()
    {
        $carts = Cart::where('user_id', auth()->user()->id)->with('product')->get();

        return response()->json([
            'message' => 'Successfully retrieve data',
            'data' => [
                'carts' => CartResource::collection($carts),
            ]
        ]);
    }

    public function addCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $user = User::where('id', auth()->user()->id)->first();

        $quantity = DB::table('carts')
            ->where('user_id', auth()->user()->id)
            ->where('product_id', $request->product_id)->value('quantity');

        $user->cart()->sync([$request->product_id => ['quantity' => $quantity + 1]], false);

        return response()->json([
            'message' => 'Successfully Added Cart',
        ]);
    }

    public function decreaseCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id|exists:carts,product_id',
        ]);

        $user = User::where('id', auth()->user()->id)->first();

        $quantity = DB::table('carts')
            ->where('user_id', auth()->user()->id)
            ->where('product_id', $request->product_id)
            ->value('quantity');
        if($quantity == 1) {
            $user->cart()->detach($request->product_id);

            return \response()->json([
                'message' => 'Successfully removed cart'
            ]);
        }

        $user->cart()->sync([$request->product_id => ['quantity' => $quantity - 1]], false);

        return \response()->json([
            'message' => 'Successfully decreased cart'
        ]);
    }

}
