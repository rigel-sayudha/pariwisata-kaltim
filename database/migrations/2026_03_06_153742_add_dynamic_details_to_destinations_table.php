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
        Schema::table('destinations', function (Blueprint $table) {
            $table->string('price')->nullable();
            $table->string('duration')->nullable();
            $table->string('group_size')->nullable();
            $table->string('languages')->nullable();
            $table->longText('description')->nullable();
            $table->json('includes')->nullable();
            $table->json('excludes')->nullable();
            $table->json('what_to_expect')->nullable();
            $table->json('itinerary')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('destinations', function (Blueprint $table) {
            $table->dropColumn([
                'price',
                'duration',
                'group_size',
                'languages',
                'description',
                'includes',
                'excludes',
                'what_to_expect',
                'itinerary',
            ]);
        });
    }
};
