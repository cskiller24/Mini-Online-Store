<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'quantity',
        'price',
        'slug',
        'image',
    ];

    protected $table = 'products';

    public function cart()
    {
        $this->hasMany(Cart::class, 'product_id');
    }

    public function transaction()
    {
        $this->hasMany(Transaction::class, 'product_id');
    }
}
