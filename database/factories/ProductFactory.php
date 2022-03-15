<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = Str::title($this->faker->firstName() . ' ' . $this->faker->lastName());
        $slug = str_replace(' ', '-', $name);
        return [
            'name' => $name,
            'quantity' => $this->faker->numberBetween(0, 500),
            'price' => $this->faker->randomFloat(2, 100, 5000),
            'slug' => $slug,
            'image' => $this->faker->imageUrl(500, 500)
        ];
    }
}
