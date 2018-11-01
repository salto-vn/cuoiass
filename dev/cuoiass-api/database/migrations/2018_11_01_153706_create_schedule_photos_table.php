<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSchedulePhotosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedule_photos', function (Blueprint $table) {
            $table->increments('sche_id');
            $table->dateTime('sche_start_time');
            $table->dateTime('sche_end_time');
            $table->string('sche_title');
            $table->string('sche_desc')->nullable();
            $table->string('image_ids');
            $table->integer('prd_id');
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
        Schema::dropIfExists('schedule_photos');
    }
}
