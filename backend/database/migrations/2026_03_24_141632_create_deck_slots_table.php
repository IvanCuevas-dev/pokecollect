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
        Schema::create('deck_slots', function (Blueprint $table) {
            $table->id();

            $table->foreignId('deck_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->integer('slot_number');

            $table->unsignedInteger('pokemon_id')->nullable();

            $table->foreign('pokemon_id')
                ->references('id')
                ->on('pokemon')
                ->nullOnDelete();

            $table->unique(['deck_id', 'slot_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deck_slots');
    }
};
