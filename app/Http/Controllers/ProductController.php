<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\Products\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    const NOT_AVAILABLE_IMAGE = 'NotAvailable.png';
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $products = ProductResource::collection(Product::paginate(25));
        return response()->json([
            'message' => 'Successfully retrieve data',
            'data' => [
                'products' => $products
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ProductRequest $request)
    {
        $credentials = $request->validated();

        // Setting Image Name
        $file = $request->file('image');
        $imageName =  uniqid() . '-' .$file->getClientOriginalName();
        $file->storeAs('public/image', $imageName);

        $product = Product::create([
            'name' => $credentials['name'],
            'quantity' => $credentials['quantity'],
            'price' => $credentials['price'],
            'slug' => str_replace(' ', '-', $credentials['name']),
            'image' => $imageName
        ]);

        return response()->json([
            'message' => 'Successfully added product to database',
            'data' => [
                'product' => ProductResource::make($product)
            ]
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $product = Product::where('id', $id)->first();

        if(! $product || $product->count() <= 0) {
            return response()->json([
                'message' => 'Product does not exists',
                'errors' => [
                    'product' => 'Product does not exists'
                ]
            ], 404);
        }

        $product = ProductResource::make($product);

        return response()->json([
            'message' => 'Successfully retrieve data',
            'data' => [
                'product' => $product
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes',
            'price' => 'numeric|gt:0',
            'image' => 'image|mimes:jpg,png,jpeg,svg',
        ]);

        $file = $request->file('image');
        $product = Product::where(['id' => $id])->first();

        if(! $product) {
            return response()->json([
                'message' => 'Product does not exists',
                'errors' => [
                    'product' => 'Product does not exists'
                ]
            ], 404);
        }

        if($request->has('name') && $request->name !== null) {
            $product->name = $request->name;
        }
        if($request->has('price') && $request->price !== null) {
            $product->price = $request->price;
        }
        if($request->has('image') && $request->file('image') !== null) {
            Storage::disk('public')->delete('image/'. $product->image);
            $product->image = uniqid().'-'.$file->getClientOriginalName();
            $file->storeAs('public/image', $product->image);
        }
        $product->save();

        return response()->json([
            'message' => 'Successfully update product',
            'data' => [
                'product' => ProductResource::make($product)
            ],
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $product = Product::where(['id' => $id])->first();

        if(! $product && $product->count() <= 0) {
            return response()->json([
                'message' => 'Product does not exist',
                'error' => [
                    'product' => 'Product does not exist'
                ]
            ], 404);
        }

        if($product->image !== self::NOT_AVAILABLE_IMAGE) {
            Storage::disk('public')->delete('image/'. $product->image);
        }

        $product->image = self::NOT_AVAILABLE_IMAGE;
        $product->save();
        $product->delete();

        return response()->json([
            'message' => 'Successfully deleted product',
            'data' => null,
        ], 204);
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
            'message' => 'Successfully restocked product',
            'data' => [
                'product' => ProductResource::make($product->refresh())
            ]
        ], 200);
    }
}
