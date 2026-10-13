<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('assignment_submissions', 'assignment_id')) {
            Schema::table('assignment_submissions', function (Blueprint $table) {
                $table->foreignId('assignment_id')
                    ->nullable()
                    ->constrained('assignments')
                    ->cascadeOnDelete();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('assignment_submissions', 'assignment_id')) {
            Schema::table('assignment_submissions', function (Blueprint $table) {
                $table->dropConstrainedForeignId('assignment_id');
            });
        }
    }
};
