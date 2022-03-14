<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password',
        'address',
        'contact_number'
    ];

    protected $table = 'users';

    public function cart()
    {
        $this->hasMany(Cart::class, 'user_id');
    }

    public function transactions()
    {
        $this->hasMany(Transactions::class);
    }
}
