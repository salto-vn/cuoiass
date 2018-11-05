<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookedOptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('booked_options', function (Blueprint $table) {
            $table->increments('booked_opt_id');
            $table->integer('booked_id');
            $table->string('option_name');
            $table->integer('option_quality');
            $table->float('option_price');
            $table->integer('option_id');
            $table->integer('prd_id');
            $table->integer('vendor_sv_id');
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
        Schema::dropIfExists('booked_options');
    }
}
