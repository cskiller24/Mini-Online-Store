<?php

namespace App\Http\Resources\temp;

use Illuminate\Http\Resources\Json\JsonResource;

class TransactionsResource extends JsonResource
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
            'user' => new UserForTransactionResource($this->user),
            'transactions' => [
                'id' => $this->id,
                'address' => $this->address,
                'contact_number' => $this->contact_number,
                'products' => $this->transaction,
            ]
        ];
    }
}
