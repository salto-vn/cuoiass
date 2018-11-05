<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('prd_id');
            $table->char('prd_code')->unique();
            $table->string('prd_name');
            $table->string('prd_desc');
            $table->float('price');
            $table->tinyInteger('publish_flag')->unsigned()->default(0);
            $table->dateTime('publish_date');
            $table->string('prd_colors');
            $table->string('prd_sizes');
            $table->string('prd_materials');
            $table->string('prd_style');
            $table->integer('rd_page')->unsigned()->default(0);
            $table->string('prd_party_photo_size')->nullable();
            $table->string('prd_times')->nullable();
            $table->string('prd_images');
            $table->integer('vendor_sv_id');
            $table->char('service_code');
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
        Schema::dropIfExists('products');
    }
}
