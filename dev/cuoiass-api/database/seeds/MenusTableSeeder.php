<?php

use Illuminate\Database\Seeder;

class DrinksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $menus = \App\Models\Menu::query()->get();
        foreach ($menus as $menu) {
            factory(\App\Models\Drink::class, 10)->create(
                [
                    'menu_id' => $menu['menu_id'],
                ]
            );
        }
    }
}
