<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomizeFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customize_fields', function (Blueprint $table) {
            $table->increments('customize_id');
            $table->integer('prd_id');
            $table->integer('vendor_sv_id');
            $table->char('customize_field_name');
            $table->enum('customize_field_type', ['TEXTBOX', 'COMBOBOX', 'TEXTAREA', 'FILE', 'RADIO', 'CHECKBOX']);
            $table->string('customize_field_value');
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
        Schema::dropIfExists('customize_fields');
    }
}
