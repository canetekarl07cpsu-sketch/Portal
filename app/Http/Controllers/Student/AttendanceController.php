<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\AttendanceRecord;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AttendanceController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $records = AttendanceRecord::query()
            ->where('user_id', $user->id)
            ->orderByDesc('attendance_date')
            ->limit(30)
            ->get()
            ->map(fn (AttendanceRecord $record) => [
                'id' => $record->id,
                'date' => $record->attendance_date?->toDateString(),
                'status' => $record->status,
                'check_in_at' => $record->check_in_at?->format('H:i'),
                'check_out_at' => $record->check_out_at?->format('H:i'),
                'notes' => $record->notes,
            ]);

        $monthRecords = AttendanceRecord::query()
            ->where('user_id', $user->id)
            ->whereBetween('attendance_date', [
                now()->startOfMonth()->toDateString(),
                now()->endOfMonth()->toDateString(),
            ]);

        $total = (clone $monthRecords)->count();
        $present = (clone $monthRecords)->where('status', 'present')->count();
        $late = (clone $monthRecords)->where('status', 'late')->count();
        $absent = (clone $monthRecords)->where('status', 'absent')->count();

        return Inertia::render('Attendance/Index', [
            'records' => $records,
            'summary' => [
                'present' => $present,
                'late' => $late,
                'absent' => $absent,
                'rate' => $total > 0
                    ? (int) round((($present + $late) / $total) * 100)
                    : null,
            ],
            'todayRecord' => AttendanceRecord::query()
                ->where('user_id', $user->id)
                ->whereDate('attendance_date', today())
                ->first(['id', 'status', 'check_in_at', 'check_out_at'])
                ?->only(['id', 'status', 'check_in_at', 'check_out_at']),
        ]);
    }

    /**
     * Records a check-in for the authenticated user.
     * In production, define your school's check-in policy and authorization rules.
     */
    public function checkIn(Request $request): RedirectResponse
    {
        $user = $request->user();
        $today = today()->toDateString();

        $existing = AttendanceRecord::query()
            ->where('user_id', $user->id)
            ->whereDate('attendance_date', $today)
            ->first();

        if ($existing) {
            return back()->withErrors([
                'attendance' => 'An attendance record already exists for today.',
            ]);
        }

        AttendanceRecord::create([
            'user_id' => $user->id,
            'attendance_date' => $today,
            'status' => 'present',
            'check_in_at' => now(),
        ]);

        return back()->with('status', 'Your check-in has been recorded.');
    }

    public function checkOut(Request $request): RedirectResponse
    {
        $record = AttendanceRecord::query()
            ->where('user_id', $request->user()->id)
            ->whereDate('attendance_date', today())
            ->first();

        if (! $record || ! $record->check_in_at) {
            return back()->withErrors([
                'attendance' => 'Check in before recording your check-out.',
            ]);
        }

        if ($record->check_out_at) {
            return back()->withErrors([
                'attendance' => 'Your check-out has already been recorded for today.',
            ]);
        }

        $record->update(['check_out_at' => now()]);

        return back()->with('status', 'Your check-out has been recorded.');
    }
}
