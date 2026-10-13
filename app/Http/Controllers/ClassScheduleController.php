<?php

namespace App\Http\Controllers;

use App\Models\ClassSchedule;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClassScheduleController extends Controller
{
    public function index(Request $request): Response
    {
        $schedules = ClassSchedule::where(
            'user_id',
            $request->user()->getAuthIdentifier()
        )
            ->orderByRaw(
                "FIELD(day_of_week, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')"
            )
            ->orderBy('start_time')
            ->get();

        return Inertia::render('ClassSchedule/Index', [
            'schedules' => $schedules,
        ]);
    }
}
