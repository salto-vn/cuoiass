<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->increments('plan_id');
            $table->dateTime('plan_date');
            $table->dateTime('org_date');
            $table->string('gr_name')->nullable();
            $table->string('br_name')->nullable();
            $table->char('org_address')->nullable();
            $table->char('phone');
            $table->float('total_price');
            $table->integer('customer_id');
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
        Schema::dropIfExists('wedding_plans');
    }
}
