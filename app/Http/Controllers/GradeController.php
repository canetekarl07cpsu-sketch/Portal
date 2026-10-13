<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class GradeController extends Controller
{
    public function index(): Response
    {
        $grades = Grade::where('user_id', Auth::id())
            ->orderByDesc('school_year')
            ->orderBy('semester')
            ->orderBy('subject_code')
            ->get();

        return Inertia::render('Grades/Index', [
            'grades' => $grades,
        ]);
    }
}
