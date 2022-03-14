<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transactions extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'user_id',
        'status',
        'address',
        'contact_number',
    ];

    protected $table = 'transactions';

    public function user()
    {
        $this->belongsTo(User::class);
    }

    public function transaction()
    {
        $this->hasMany(Transaction::class, 'transaction_id');
    }

}
