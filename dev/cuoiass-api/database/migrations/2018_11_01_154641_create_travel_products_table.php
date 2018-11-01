<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTravelProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('travel_products', function (Blueprint $table) {
            $table->increments('honey_id');
            $table->string('honey_tile');
            $table->char('honey_api_provider');
            $table->char('honey_api_client')->nullable();
            $table->char('honey_api_key')->nullable();
            $table->string('honey_api_acc');
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
        Schema::dropIfExists('travel_products');
    }
}
