<?php

namespace App\Http\Resources\temp;

use Illuminate\Http\Resources\Json\JsonResource;

class UserForTransactionResource extends JsonResource
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
            'address' => $this->address,
            'contact_number' => $this->contact_number
        ];
    }
}
