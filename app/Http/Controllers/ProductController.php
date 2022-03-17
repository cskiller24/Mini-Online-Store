<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    const NOT_AVAILABLE_IMAGE = 'NotAvailable.png';
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = ProductResource::collection(Product::paginate(10));
        return response()->json(['products' => $products]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
        $credentials = $request->validated();

        // Setting Image Name
        $file = $request->file('image');
        $imageName =  uniqid() . '-' .$file->getClientOriginalName();
        $file->storeAs('public/image', $imageName);

        Product::create([
            'name' => $credentials['name'],
            'quantity' => $credentials['quantity'],
            'price' => $credentials['price'],
            'slug' => str_replace(' ', '-', $credentials['name']),
            'image' => $imageName
        ]);

        return response()->json(1, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::where(['id' => $id])->first()->get();

        if(! $product) {
            return response()->json([
                'errors' => ['message' => 'Product does not Exist']
            ], 400);
        }

        $product = ProductResource::collection($product);

        return response()->json(['product' => $product]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric|gt:0',
            'image' => 'required|image|mimes:jpg,png,jpeg,svg',
        ]);

        $file = $request->file('image');

        $product = Product::where(['id' => $id])->first();

        if(! $product) {
            return response()->json([
                'errors' => ['message' => 'Product does not Exist']
            ], 400);
        }

        if($product->image !== self::NOT_AVAILABLE_IMAGE) {
            Storage::disk('public')->delete('image/'. $product->image);
        }

        $product->name = $request->name;
        $product->price = $request->price;
        $product->image = uniqid().'-'.$file->getClientOriginalName();
        $product->save();

        $file->storeAs('public/image', $product->image);

        return response()->json([
            'product' => ProductResource::collection($product->get())
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::where(['id' => $id])->first();

        if(! $product) {
            return response()->json([
                'error' => ['message' => 'Product does not exist']
            ], 400);
        }

        if($product->image !== self::NOT_AVAILABLE_IMAGE) {
            Storage::disk('public')->delete('image/'. $product->image);
        }

        $product->image = self::NOT_AVAILABLE_IMAGE;
        $product->save();
        $product->delete();

        return response(1);
    }

    public function restock(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|numeric|gt:0'
        ]);

        $product = Product::where(['id' => $id])->first();
        $product->quantity += $request->quantity;
        $product->save();

        return response()->json([
            'product' => ProductResource::collection($product->refresh())
        ], 200);
    }
}
