<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMonthlyReportTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('monthly_report', function (Blueprint $table) {
            $table->integer('report_year');
            $table->integer('report_month');
            $table->char('report_type')->nullable();
            $table->integer('report_id');
            $table->integer('total_view')->default(0);
            $table->integer('total_booking')->default(0);
            $table->integer('total_booking_finished')->default(0);
            $table->integer('total_booking_cancelled')->default(0);
            $table->float('total_price');
            $table->float('total_price_canceled');
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
        Schema::dropIfExists('monthly_report');
    }
}
