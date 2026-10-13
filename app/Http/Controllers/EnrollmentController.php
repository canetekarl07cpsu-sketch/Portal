<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EnrollmentController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Enrollment/Index', [
            'enrollments' => $request->user()
                ->enrollments()
                ->latest()
                ->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'course' => ['required', 'string', 'max:255'],
            'school_year' => ['required', 'string', 'max:20'],
            'semester' => ['required', 'string', 'max:30'],
        ]);

        $request->user()->enrollments()->create([
            ...$validated,
            'status' => 'Pending',
        ]);

        return redirect()
            ->route('enrollment.index')
            ->with('success', 'Enrollment submitted successfully.');
    }
}
