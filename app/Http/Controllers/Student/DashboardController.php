<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\AttendanceRecord;
use App\Models\ClassSchedule;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();
        $monthRecords = AttendanceRecord::query()
            ->where('user_id', $user->id)
            ->whereBetween('attendance_date', [today()->startOfMonth(), today()->endOfMonth()]);
        $present = (clone $monthRecords)->where('status', 'present')->count();
        $late = (clone $monthRecords)->where('status', 'late')->count();
        $absent = (clone $monthRecords)->where('status', 'absent')->count();
        $total = (clone $monthRecords)->count();

        $recentAttendance = AttendanceRecord::query()
            ->where('user_id', $user->id)
            ->latest('attendance_date')
            ->limit(5)
            ->get()
            ->map(fn (AttendanceRecord $record) => [
                'id' => $record->id,
                'date' => $record->attendance_date->format('M j, Y'),
                'status' => $record->status,
                'check_in_at' => $record->check_in_at?->format('H:i'),
            ]);

        $upcomingClasses = ClassSchedule::query()
            ->where('user_id', $user->id)
            ->where('day_of_week', Carbon::now()->format('l'))
            ->orderBy('start_time')
            ->get(['id', 'subject_name', 'start_time', 'end_time', 'room'])
            ->map(fn (ClassSchedule $class) => [
                'id' => $class->id,
                'subject_name' => $class->subject_name,
                'start_time' => Carbon::parse($class->start_time)->format('H:i'),
                'end_time' => Carbon::parse($class->end_time)->format('H:i'),
                'room' => $class->room,
            ]);

        return Inertia::render('Dashboard', [
            'summary' => [
                'present' => $present,
                'late' => $late,
                'absent' => $absent,
                'rate' => $total > 0 ? (int) round((($present + $late) / $total) * 100) : null,
            ],
            'recentAttendance' => $recentAttendance,
            'upcomingClasses' => $upcomingClasses,
        ]);
    }
}
