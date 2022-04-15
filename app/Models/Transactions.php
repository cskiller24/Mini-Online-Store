<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transactions extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference_id',
        'user_id',
        'status',
        'address',
        'contact_number',
    ];

    protected $primaryKey = 'id';

    protected $table = 'transactions';

    protected $keyType = 'string';

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

//    public function transaction()
//    {
//        return $this->hasMany(Transaction::class, 'transaction_id');
//    }

    public function product()
    {
        return $this->belongsToMany(Product::class, 'transaction_details', 'transaction_id', 'product_id')
            ->withPivot('quantity')->withTimestamps()->withTrashed();
    }
}
