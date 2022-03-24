<?php

namespace App\Http\Resources\Transactions;

use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
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
            'reference_id' => $this->reference_id,
            'status' => $this->status,
            'name' => $this->whenLoaded('user', $this->user->name),
            'email' => $this->whenLoaded('user', $this->user->email),
            'address' => $this->address,
            'contact_number' => $this->contact_number,
            'products' => $this->whenLoaded('product', ProductTransactionResource::collection($this->product))
        ];
    }
}
