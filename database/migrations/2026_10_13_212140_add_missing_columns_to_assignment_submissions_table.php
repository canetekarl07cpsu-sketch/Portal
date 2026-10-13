
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $addUserId = !Schema::hasColumn(
            'assignment_submissions',
            'user_id'
        );

        $addFilePath = !Schema::hasColumn(
            'assignment_submissions',
            'file_path'
        );

        $addOriginalName = !Schema::hasColumn(
            'assignment_submissions',
            'original_name'
        );

        $addSubmittedAt = !Schema::hasColumn(
            'assignment_submissions',
            'submitted_at'
        );

        Schema::table('assignment_submissions', function (Blueprint $table) use (
            $addUserId,
            $addFilePath,
            $addOriginalName,
            $addSubmittedAt
        ) {
            if ($addUserId) {
                $table->foreignId('user_id')
                    ->nullable()
                    ->constrained('users')
                    ->cascadeOnDelete();
            }

            if ($addFilePath) {
                $table->string('file_path')->nullable();
            }

            if ($addOriginalName) {
                $table->string('original_name')->nullable();
            }

            if ($addSubmittedAt) {
                $table->timestamp('submitted_at')->nullable();
            }
        });
    }

    public function down(): void
    {
        // Keep existing submission data safe.
    }
};
