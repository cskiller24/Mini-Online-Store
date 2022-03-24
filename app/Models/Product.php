<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

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
        return $this->hasMany(Cart::class, 'product_id');
    }

//    public function transaction()
//    {
//        return $this->hasMany(Transaction::class, 'product_id');
//    }

    public function user()
    {
        return $this->belongsToMany(User::class, 'carts', 'product_id', 'user_id')
            ->withPivot('quantity');
    }
}
