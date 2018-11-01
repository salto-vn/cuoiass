<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookedCutomizeFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('booked_customize_fields', function (Blueprint $table) {
            $table->increments('booked_customize_field_id');
            $table->integer('booked_id');
            $table->string('customize_field_answer')->nullable();
            $table->integer('customize_field_id');
            $table->integer('prd_id');
            $table->string('create_user');
            $table->string('update_user')->nullable();
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
        Schema::dropIfExists('booked_customize_fields');
    }
}
