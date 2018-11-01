<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePromotionProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('promotion_products', function (Blueprint $table) {
            $table->integer('promotion_product_id');
            $table->integer('promotion_id');
            $table->integer('prd_id');
            $table->integer('vendor_service_id');
            $table->string('create_user');
            $table->string('update_user')->nullable();
            $table->timestamps();

            $table->primary(['promotion_product_id', 'promotion_id', 'prd_id', 'vendor_service_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('promotion_products');
    }
}
