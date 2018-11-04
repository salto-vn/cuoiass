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
            $table->integer('pro_prd_id');
            $table->integer('pro_id');
            $table->integer('prd_id');
            $table->integer('vendor_sv_id');
            $table->string('created_user');
            $table->string('updated_user')->nullable();
            $table->timestamps();

            $table->primary(['pro_prd_id', 'pro_id', 'prd_id', 'vendor_sv_id']);
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
