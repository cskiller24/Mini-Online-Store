<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'quantity',
    ];

    protected $table = 'transaction';

    public function product()
    {
        $this->belongsTo(Product::class, 'product_id');
    }

    public function transactions()
    {
        $this->belongsTo(Transactions::class, 'transaction_id');
    }
}
