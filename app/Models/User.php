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
        return $this->belongsToMany(Product::class, 'carts', 'user_id', 'product_id')->withPivot('quantity');
    }

    public function transaction()
    {
        return $this->hasMany(Transactions::class);
    }
}
