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
            'id' => $this->id,
            'name' => $this->name,
            'image' => $request->getSchemeAndHttpHost().'/public/images/'.$this->image,
            'slug' => $this->slug,
            'quantity' => $this->pivot->quantity
        ];
    }
}
