<?php

namespace App\Http\Resources\Products;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'quantity' => $this->quantity,
            'price' => $this->price,
            'slug' => $this->slug,
            'image' => $request->getSchemeAndHttpHost().'/public/images/'.$this->image,
            'created_at' => Carbon::parse($this->created_at)->format('d/m/Y_h:m:s'),
            'updated_at' => Carbon::parse($this->updated_at)->format('d/m/Y_h:m:s'),
        ];
    }
}
