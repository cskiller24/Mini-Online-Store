<?php

namespace App\Http\Resources\Carts;

use Illuminate\Http\Resources\Json\JsonResource;

class CartUserResource extends JsonResource
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
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'address' => $this->address,
            'contact_number' => $this->contact_number,
            'cart' => CartResource::collection($this->cart)
        ];
    }
}
