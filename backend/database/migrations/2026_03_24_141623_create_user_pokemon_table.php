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
        Schema::create('user_pokemon', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('pokemon_id');

            $table->foreign('pokemon_id')
                ->references('id')
                ->on('pokemon')
                ->cascadeOnDelete();

            $table->integer('quantity')->default(1);
            $table->timestamps();
            $table->unique(['user_id', 'pokemon_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_pokemon');
    }
};
