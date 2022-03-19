<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        'address',
        'contact_number'
    ];

    protected $table = 'users';

    protected $hidden = [
        'password',
        'remember_token'
    ];

    public function cart()
    {
        return $this->hasMany(Cart::class, 'user_id', 'id');
    }

    public function transactions()
    {
        return $this->hasMany(Transactions::class);
    }
}
