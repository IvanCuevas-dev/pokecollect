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
        Schema::create('pokemon', function (Blueprint $table) {
            $table->unsignedInteger('id')->primary();

            $table->string('name');

            $table->string('type_1');
            $table->string('type_2')->nullable();

            $table->integer('hp');
            $table->integer('attack');
            $table->integer('defense');
            $table->integer('speed');

            $table->integer('height');
            $table->integer('weight');

            $table->integer('base_experience');

            $table->string('sprite_url');

            $table->text('description');

            $table->string('move_1');
            $table->string('move_2')->nullable();

            $table->enum('rarity', [
                'common',
                'uncommon',
                'rare',
                'epic',
                'legendary'
            ]);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pokemon');
    }
};
