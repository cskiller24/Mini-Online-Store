<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::inRandomOrder()->take->(rand(10,20))->get();

        foreach ($users as $user) {
            $product = Product::inRandomOrder()->take(rand(1,5))->pluck('id');
            $user->cart()->attach($product, ['quantity' => rand(1,5)]);
        }
    }
}
