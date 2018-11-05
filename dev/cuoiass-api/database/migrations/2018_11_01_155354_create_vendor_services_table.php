<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVendorServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendor_services', function (Blueprint $table) {
            $table->increments('vendor_sv_id');
            $table->integer('vendor_id');
            $table->char('service_code');
            $table->string('ven_service_name');
            $table->string('add_service');
            $table->string('city');
            $table->char('phone_service');
            $table->char('fax_service')->nullable();
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
        Schema::dropIfExists('vendor_services');
    }
}
