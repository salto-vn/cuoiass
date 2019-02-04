<?php

use Illuminate\Database\Seeder;

class FoodsTableSeeder extends Seeder
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
        $i = 0;
        while ($i < 10) {
            $menu = $menus[$i];
            $i++;
            factory(\App\Models\Food::class, 2)->create(
                [
                    'menu_id' => $menu['menu_id'],
                ]
            );
        }

    }
}
