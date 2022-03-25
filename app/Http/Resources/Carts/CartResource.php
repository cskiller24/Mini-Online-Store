<?php

namespace App\Http\Resources\Carts;

use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->product_id,
            'name' => $this->product->name,
            'image' => $request->getSchemeAndHttpHost().'/public/images/'.$this->product->image,
            'price' => $this->product->price,
            'slug' => $this->product->slug,
            'quantity' => $this->quantity
        ];
    }
}
