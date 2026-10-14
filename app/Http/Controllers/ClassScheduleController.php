<?php

namespace App\Http\Controllers;

use App\Models\ClassSchedule;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class ClassScheduleController extends Controller
{
    public function index(Request $request): Response
    {
        $validated = $request->validate([
            'week' => ['nullable', 'date_format:Y-m-d'],
        ]);
        $weekStart = Carbon::parse($validated['week'] ?? today()->toDateString())
            ->startOfWeek(Carbon::MONDAY);

        $schedules = ClassSchedule::where(
            'user_id',
            $request->user()->getAuthIdentifier()
        )
            ->orderBy('start_time')
            ->get();

        return Inertia::render('ClassSchedule/Index', [
            'schedules' => $schedules,
            'weekStart' => $weekStart->toDateString(),
            'today' => today()->toDateString(),
        ]);
    }
}
