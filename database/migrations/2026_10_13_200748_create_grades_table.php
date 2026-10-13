
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('grades', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('subject_code', 50);
            $table->string('subject_name');
            $table->unsignedTinyInteger('units')->default(3);
            $table->decimal('grade', 5, 2);
            $table->string('semester', 30);
            $table->string('school_year', 20);
            $table->string('remarks', 100)->nullable();

            $table->timestamps();

            $table->index([
                'user_id',
                'school_year',
                'semester',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('grades');
    }
};
