<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVendorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendors', function (Blueprint $table) {
            $table->increments('vendor_id');
            $table->string('vendor_name');
            $table->string('company');
            $table->string('address');
            $table->string('city');
            $table->string('web_url')->nullable();
            $table->string('president_name');
            $table->char('phone');
            $table->integer('credit_balance');
            $table->char('fax')->nullable();
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
        Schema::dropIfExists('vendors');
    }
}
