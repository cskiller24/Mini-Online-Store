<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Transactions;
use Illuminate\Database\Seeder;

class TransactionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Transactions::factory(10)->create();

        foreach (Transactions::all() as $transaction) {
            $product = Product::inRandomOrder()->take(rand(1,10))->pluck('id');
            $transaction->product()->attach($product, ['quantity' => rand(1,5)]);
        }
    }
}

