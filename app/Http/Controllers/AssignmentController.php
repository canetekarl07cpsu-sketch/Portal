<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\AssignmentSubmission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AssignmentController extends Controller
{
    public function index(Request $request): Response
    {
        $assignments = Assignment::with([
            'submissions' => function ($query) use ($request) {
                $query->where(
                    'user_id',
                    $request->user()->getAuthIdentifier()
                );
            },
        ])
            ->orderBy('due_date')
            ->get();

        return Inertia::render('Assignments/Index', [
            'assignments' => $assignments,
        ]);
    }

    public function submit(
        Request $request,
        Assignment $assignment
    ): RedirectResponse {
        $request->validate([
            'file' => [
                'required',
                'file',
                'mimes:pdf,doc,docx,ppt,pptx,xls,xlsx,zip,jpg,jpeg,png,txt',
                'max:10240',
            ],
        ]);

        $file = $request->file('file');
        $path = $file->store('assignment-submissions', 'public');

        AssignmentSubmission::updateOrCreate(
            [
                'assignment_id' => $assignment->id,
                'user_id' => $request->user()->getAuthIdentifier(),
            ],
            [
                'file_path' => $path,
                'original_name' => $file->getClientOriginalName(),
                'submitted_at' => now(),
            ]
        );

        return redirect()
            ->route('assignments.index')
            ->with('success', 'Assignment submitted successfully.');
    }
}
