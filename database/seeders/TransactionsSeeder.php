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
        $transactions = Transactions::factory(400)->make();
        Transactions::insert($transactions->toArray());
        foreach (Transactions::all() as $transaction) {
            $product = Product::inRandomOrder()->take(rand(1, 15))->pluck('id');
            $transaction->product()->attach($product, ['quantity' => rand(1,5)]);
        }
    }
}

