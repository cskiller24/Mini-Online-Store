<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'quantity',
    ];

    protected $table = 'carts';

    public function user()
    {
        $this->belongsTo(User::class, 'user_id');
    }

    public function product()
    {
        $this->belongsTo(Product::class, 'product_id');
    }
}
