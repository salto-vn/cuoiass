<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHoneyMoonInfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('honey_moon_info', function (Blueprint $table) {
            $table->increments('honey_id');
            $table->string('honey_title')->nullable();
            $table->string('hotel_name')->nullable();
            $table->string('hotel_address')->nullable();
            $table->char('flight_no')->nullable();
            $table->char('airline_brand')->nullable();
            $table->dateTime('departure_date')->nullable();
            $table->dateTime('arrival_date')->nullable();
            $table->dateTime('booked_date')->nullable();
            $table->char('status')->nullable();
            $table->string('memo')->nullable();
            $table->integer('booked_id');
            $table->string('created_user');
            $table->string('updated_user')->nullable();
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
        Schema::dropIfExists('honey_moon');
    }
}
