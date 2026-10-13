<?php

namespace App\Http\Controllers;

use App\Models\ClassActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClassActivityController extends Controller
{
    public function index(Request $request): Response
    {
        $activities = ClassActivity::where(
            'user_id',
            $request->user()->getAuthIdentifier()
        )
            ->orderByDesc('activity_date')
            ->get();

        return Inertia::render('ClassActivities/Index', [
            'activities' => $activities,
        ]);
    }
}
