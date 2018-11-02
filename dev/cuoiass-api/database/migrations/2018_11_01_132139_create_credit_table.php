<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCreditTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('credit', function (Blueprint $table) {
            $table->increments('credit_id');
            $table->dateTime('action_date')->nullable();
            $table->char('action_type');
            $table->char('method')->nullable();
            $table->integer('credit')->default(0);
            $table->float('money');
            $table->char('invoice_url')->nullable();
            $table->integer('vendor_id');
            $table->integer('prd_id');
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
        Schema::dropIfExists('credit_history');
    }
}
