<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookedCustomizeFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('booked_customize_fields', function (Blueprint $table) {
            $table->increments('booked_ct_field_id');
            $table->integer('booked_id');
            $table->string('customize_field_answer')->nullable();
            $table->integer('customize_id');
            $table->integer('prd_id');
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
        Schema::dropIfExists('booked_customize_fields');
    }
}
