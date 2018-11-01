<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookedFoodTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('booked_food', function (Blueprint $table) {
            $table->increments('booked_food_id');
            $table->string('booked_menu');
            $table->char('service_code');
            $table->integer('booked_total');
            $table->float('unit_price');
            $table->string('booked_drink')->nullable();
            $table->float('drink_unit_price')->nullable();
            $table->integer('booked_id');
            $table->integer('menu_id');
            $table->string('create_user');
            $table->string('update_user')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('booked_menu_foods');
    }
}
