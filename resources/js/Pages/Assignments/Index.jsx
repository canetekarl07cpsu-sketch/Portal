
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    GraduationCap,
    LayoutDashboard,
    ChartNoAxesColumn,
    ClipboardList,
    CalendarDays,
    BookOpen,
    FileUp,
    LogOut,
    Menu,
    X,
    Calendar,
    CheckCircle2,
    Upload,
    Clock,
} from 'lucide-react';

function formatDate(date) {
    if (!date) return 'No deadline specified';

    const [year, month, day] = date.split('-').map(Number);

    return new Date(year, month - 1, day).toLocaleDateString('en-PH', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export default function Index({ assignments = [] }) {
    const { auth, flash } = usePage().props;
    const user = auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openAssignment, setOpenAssignment] = useState(null);

    const name = user?.name || 'Student';
    const studentId = user?.student_id || 'Student ID not available';

    const { data, setData, post, processing, errors, reset } = useForm({
        file: null,
    });

    const navigation = [
        {
            label: 'Dashboard',
            icon: LayoutDashboard,
            href: route('dashboard'),
        },
        {
            label: 'My Grades',
            icon: ChartNoAxesColumn,
            href: route('grades.index'),
        },
        {
            label: 'Online Enrollment',
            icon: ClipboardList,
            href: route('enrollment.index'),
        },
        {
            label: 'Class Schedule',
            icon: CalendarDays,
            href: route('class-schedule.index'),
        },
        {
            label: 'Class Activities',
            icon: BookOpen,
            href: route('class-activities.index'),
        },
        {
            label: 'Assignments',
            icon: FileUp,
            href: route('assignments.index'),
            active: true,
        },
    ];

    function submitAssignment(e, assignmentId) {
        e.preventDefault();

        post(route('assignments.submit', assignmentId), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset('file');
                setOpenAssignment(null);
            },
        });
    }

    return (
        <>
            <Head title="Assignments" />

            <div className="min-h-screen bg-gray-50 text-gray-900">
                {sidebarOpen && (
                    <button
                        type="button"
                        aria-label="Close navigation"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    />
                )}

                <aside
                    className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-green-950 text-white transition-transform duration-200 lg:translate-x-0 ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
                        <Link href="/" className="flex items-center gap-3">
                            <img
                                src="/images/school-logo.jpg"
                                alt="School logo"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                                className="h-11 w-11 rounded-xl bg-white object-contain p-1"
                            />

                            <div>
                                <p className="font-bold">Student Portal</p>
                                <p className="text-xs text-green-300">
                                    Academic Services
                                </p>
                            </div>
                        </Link>

                        <button
                            type="button"
                            onClick={() => setSidebarOpen(false)}
                            aria-label="Close sidebar"
                            className="ml-auto rounded-lg p-2 hover:bg-white/10 lg:hidden"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="px-6 pb-3 pt-7">
                        <p className="text-xs font-semibold uppercase tracking-widest text-green-400">
                            Student Menu
                        </p>
                    </div>

                    <nav className="flex-1 space-y-1 overflow-y-auto px-4">
                        {navigation.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${
                                        item.active
                                            ? 'bg-green-700 text-white'
                                            : 'text-green-100 hover:bg-white/10'
                                    }`}
                                >
                                    <Icon size={19} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="border-t border-white/10 p-4">
                        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-800">
                                {name
                                    .split(' ')
                                    .filter(Boolean)
                                    .slice(0, 2)
                                    .map((part) => part[0])
                                    .join('')
                                    .toUpperCase()}
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold">
                                    {name}
                                </p>
                                <p className="truncate text-xs text-green-300">
                                    {studentId}
                                </p>
                            </div>
                        </div>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-green-100 hover:bg-white/10"
                        >
                            <LogOut size={18} />
                            Sign Out
                        </Link>
                    </div>
                </aside>

                <div className="min-h-screen lg:pl-72">
                    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95">
                        <div className="flex h-[76px] items-center gap-3 px-4 sm:px-6 lg:px-9">
                            <button
                                type="button"
                                onClick={() => setSidebarOpen(true)}
                                aria-label="Open navigation"
                                className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50 lg:hidden"
                            >
                                <Menu size={21} />
                            </button>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Student Portal
                                </p>
                                <h1 className="text-xl font-bold">
                                    Assignments
                                </h1>
                            </div>
                        </div>
                    </header>

                    <main className="mx-auto max-w-[1400px] space-y-7 px-4 py-7 sm:px-6 sm:py-9 lg:px-9">
                        <section>
                            <p className="text-sm font-semibold text-green-700">
                                ACADEMIC SERVICES
                            </p>
                            <h2 className="mt-2 text-2xl font-bold">
                                My Assignments
                            </h2>
                            <p className="mt-2 text-sm text-gray-500">
                                View assignment instructions, check deadlines,
                                and upload your completed work.
                            </p>
                        </section>

                        {flash?.success && (
                            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                                {flash.success}
                            </div>
                        )}

                        {assignments.length === 0 ? (
                            <section className="rounded-2xl border border-gray-200 bg-white px-5 py-14 text-center shadow-sm">
                                <BookOpen
                                    size={38}
                                    className="mx-auto text-green-700"
                                />
                                <h3 className="mt-4 font-semibold">
                                    No assignments available
                                </h3>
                                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                                    Assignments will appear here when they have
                                    been added to the portal.
                                </p>
                            </section>
                        ) : (
                            <section className="grid gap-5 xl:grid-cols-2">
                                {assignments.map((assignment) => {
                                    const submission =
                                        assignment.submissions?.[0];

                                    return (
                                        <article
                                            key={assignment.id}
                                            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="min-w-0">
                                                    <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                                                        {assignment.subject_code}
                                                    </p>
                                                    <h3 className="mt-2 text-lg font-bold">
                                                        {assignment.title}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {assignment.subject_name}
                                                    </p>
                                                </div>

                                                <span
                                                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                                                        submission
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-amber-100 text-amber-800'
                                                    }`}
                                                >
                                                    {submission
                                                        ? 'Submitted'
                                                        : 'Not submitted'}
                                                </span>
                                            </div>

                                            <p className="mt-5 whitespace-pre-line text-sm leading-6 text-gray-700">
                                                {assignment.description ||
                                                    'No additional instructions provided.'}
                                            </p>

                                            <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4 text-sm text-gray-500">
                                                <Calendar
                                                    size={17}
                                                    className="text-green-700"
                                                />
                                                <span>
                                                    Due: {formatDate(assignment.due_date)}
                                                </span>
                                            </div>

                                            {submission && (
                                                <div className="mt-4 rounded-xl bg-green-50 p-4">
                                                    <div className="flex items-center gap-2 text-sm font-semibold text-green-800">
                                                        <CheckCircle2 size={18} />
                                                        Work submitted
                                                    </div>
                                                    <p className="mt-2 break-all text-sm text-gray-700">
                                                        {submission.original_name}
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        Submitted:{' '}
                                                        {submission.submitted_at
                                                            ? new Date(
                                                                  submission.submitted_at
                                                              ).toLocaleString('en-PH')
                                                            : 'Recorded'}
                                                    </p>
                                                    <a
                                                        href={`/storage/${submission.file_path}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="mt-3 inline-block text-sm font-semibold text-green-800 underline"
                                                    >
                                                        View submitted file
                                                    </a>
                                                </div>
                                            )}

                                            {openAssignment === assignment.id ? (
                                                <form
                                                    onSubmit={(e) =>
                                                        submitAssignment(
                                                            e,
                                                            assignment.id
                                                        )
                                                    }
                                                    className="mt-5 space-y-4 rounded-xl border border-gray-200 p-4"
                                                >
                                                    <label className="block text-sm font-semibold">
                                                        Choose your file
                                                    </label>

                                                    <input
                                                        key={assignment.id}
                                                        type="file"
                                                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.jpg,.jpeg,.png,.txt"
                                                        onChange={(e) =>
                                                            setData(
                                                                'file',
                                                                e.target.files?.[0] || null
                                                            )
                                                        }
                                                        required
                                                        className="block w-full rounded-lg border border-gray-300 p-3 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-green-50 file:px-3 file:py-2 file:font-semibold file:text-green-800"
                                                    />

                                                    <p className="text-xs text-gray-500">
                                                        Accepted: PDF, Word,
                                                        PowerPoint, Excel, ZIP,
                                                        images, and TXT. Maximum
                                                        size: 10 MB.
                                                    </p>

                                                    {errors.file && (
                                                        <p className="text-sm text-red-600">
                                                            {errors.file}
                                                        </p>
                                                    )}

                                                    <div className="flex flex-wrap gap-3">
                                                        <button
                                                            type="submit"
                                                            disabled={
                                                                processing ||
                                                                !data.file
                                                            }
                                                            className="rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-50"
                                                        >
                                                            {processing
                                                                ? 'Uploading...'
                                                                : 'Submit File'}
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setOpenAssignment(null);
                                                                reset('file');
                                                            }}
                                                            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        reset('file');
                                                        setOpenAssignment(assignment.id);
                                                    }}
                                                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
                                                >
                                                    <Upload size={17} />
                                                    {submission
                                                        ? 'Replace Submission'
                                                        : 'Upload Assignment'}
                                                </button>
                                            )}
                                        </article>
                                    );
                                })}
                            </section>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}
