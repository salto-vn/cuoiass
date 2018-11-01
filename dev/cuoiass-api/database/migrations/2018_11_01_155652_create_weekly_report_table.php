<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWeeklyReportTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('weekly_report', function (Blueprint $table) {
            $table->integer('report_year');
            $table->integer('report_week');
            $table->char('report_type')->nullable();
            $table->integer('report_id')->nullable();
            $table->integer('total_view')->default(0);
            $table->integer('total_booking')->default(0);
            $table->integer('total_booking_finished')->default(0);
            $table->integer('total_booking_cancelled')->default(0);
            $table->float('total_price');
            $table->float('total_price_canceled');
            $table->string('create_user');
            $table->string('update_user')->nullable();
            $table->timestamps();

            $table->primary(['report_year', 'report_week']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('weekly_report');
    }
}
