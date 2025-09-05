<?php

namespace Database\Seeders;

use App\Models\Musica;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (User::count() == 0) {
            $this->call([UserSeeder::class]);
        }

        if (Musica::count() == 0) {
            $this->call([MusicaSeeder::class]);
        }
    }
}
