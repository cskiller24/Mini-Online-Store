<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = \App\Models\User::factory(1000)
            ->make()
            ->makeVisible(['password','remember_token']);
        $chunks = $users->chunk(500);
        $chunks->each(function ($chunk) {
            User::insert($chunk->toArray());
        });
    }
}
