<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('towing_requests', function (Blueprint $table) {
            $table->id();    
            $table->string('customer_name');
            $table->string('location')->nullable();
            $table->text('note')->nullable();
            $table->double('latitude');
            $table->double('longitude');
            $table->enum('status', ['pending', 'assigned', 'completed'])->default('pending');
            $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('towing_requests');
    }
};