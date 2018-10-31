<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->increments('booked_id');
            $table->string('booked_pro_name')->nullable();
            $table->integer('booked_size')->default(0);
            $table->char('booked_color')->nullable();
            $table->char('booked_material')->nullable();
            $table->char('booked_style')->nullable();
            $table->integer('booked_album_page')->default(0);
            $table->string('booked_photo_size')->nullable();
            $table->integer('booked_size_2')->default(0);
            $table->char('booked_color_2')->nullable();
            $table->time('booked_time');
            $table->dateTime('try_date')->nullable();
            $table->dateTime('active_date')->nullable();
            $table->char('status');
            $table->string('memo')->nullable();
            $table->dateTime('booked_date');
            $table->string('payment_name');
            $table->char('payment_phone');
            $table->char('payment_email');
            $table->float('net_price');
            $table->float('gross_price');
            $table->string('invoice_url')->nullable();
            $table->char('plan_id');
            $table->integer('pro_id');
            $table->integer('vendor_service_id');
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
        Schema::dropIfExists('bookings');
    }
}
