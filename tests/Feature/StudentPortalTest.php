<?php

namespace Tests\Feature;

use App\Models\AttendanceRecord;
use App\Models\ClassSchedule;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class StudentPortalTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_loads_attendance_and_todays_classes_from_the_authenticated_students_records(): void
    {
        $user = User::factory()->create([
            'email_verified_at' => now(),
        ]);
        AttendanceRecord::create([
            'user_id' => $user->id,
            'attendance_date' => today(),
            'status' => 'present',
            'check_in_at' => now(),
        ]);
        $class = $this->createSchedule($user, Carbon::now()->format('l'));

        $this->actingAs($user)
            ->get(route('dashboard'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Dashboard')
                ->where('summary.present', 1)
                ->where('summary.rate', 100)
                ->has('recentAttendance', 1)
                ->where('upcomingClasses.0.id', $class->id));
    }

    public function test_student_can_check_in_and_check_out_and_times_are_saved(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post(route('attendance.check-in'))
            ->assertSessionHas('status', 'Your check-in has been recorded.');

        $record = AttendanceRecord::query()
            ->where('user_id', $user->id)
            ->whereDate('attendance_date', today())
            ->firstOrFail();

        $this->assertNotNull($record->check_in_at);
        $this->assertNull($record->check_out_at);

        $this->post(route('attendance.check-out'))
            ->assertSessionHas('status', 'Your check-out has been recorded.');

        $this->assertNotNull($record->fresh()->check_out_at);
    }

    public function test_weekly_calendar_shows_only_the_authenticated_students_saved_schedule(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $day = Carbon::now()->format('l');
        $class = $this->createSchedule($user, $day);
        $this->createSchedule($otherUser, $day);

        $this->actingAs($user)
            ->get(route('class-schedule.index', ['week' => today()->toDateString()]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('ClassSchedule/Index')
                ->where('weekStart', Carbon::now()->startOfWeek(Carbon::MONDAY)->toDateString())
                ->has('schedules', 1)
                ->where('schedules.0.id', $class->id));
    }

    private function createSchedule(User $user, string $day): ClassSchedule
    {
        return ClassSchedule::create([
            'user_id' => $user->id,
            'subject_code' => 'SCI101',
            'subject_name' => 'Science',
            'instructor' => 'Alex Teacher',
            'day_of_week' => $day,
            'start_time' => '09:00:00',
            'end_time' => '10:00:00',
            'room' => 'Room 12',
            'school_year' => '2026-2027',
            'semester' => 'First',
        ]);
    }
}
