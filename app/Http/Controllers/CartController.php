<?php

namespace App\Http\Controllers;

use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    //Show all carts
    public function index()
    {
        $user = User::with('cart')->paginate(20);

        return response()->json([
            'user' => $user,
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
