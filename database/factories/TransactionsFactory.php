<?php

namespace Database\Factories;

use App\Models\Transactions;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transactions>
 */
class TransactionsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Transactions::class;


    public function definition()
    {
        $user = User::inRandomOrder()->first();
        return [
            'reference_id' => Str::uuid(),
            'user_id' => $user->id,
            'status' => $this->faker->numberBetween(0, 2),
            'address' => $user->address,
            'contact_number' => $user->contact_number,
        ];
    }
}
