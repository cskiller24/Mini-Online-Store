<?php

namespace App\Http\Resources;

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
            'quantity' => $this->quantity,
            'product' => [
                'id' => $this->product->id,
                'name' => $this->product->name,
                'image' => $this->product->image
            ]
        ];
    }
}
