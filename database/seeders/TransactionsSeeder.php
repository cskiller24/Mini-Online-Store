<?php

namespace Database\Seeders;

use App\Models\Transaction;
use App\Models\Transactions;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        Transactions::factory(100)->create();
        Transaction::factory(1000)->create();
    }
}
