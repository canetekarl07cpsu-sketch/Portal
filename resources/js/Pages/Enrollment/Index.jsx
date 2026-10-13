
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
} from 'lucide-react';

function Avatar({ name }) {
    const initials = (name || 'Student')
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();

    return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-800">
            {initials}
        </div>
    );
}

export default function Index({ enrollments = [] }) {
    const { auth, flash } = usePage().props;
    const user = auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const name = user?.name || 'Student';
    const studentId = user?.student_id || 'Student ID not available';

    const { data, setData, post, processing, errors, reset } = useForm({
        course: '',
        school_year: '',
        semester: '1st Semester',
    });

    const navigation = [
        { label: 'Dashboard', icon: LayoutDashboard, href: route('dashboard') },
        { label: 'My Grades', icon: ChartNoAxesColumn, href: route('grades.index') },
        { label: 'Online Enrollment', icon: ClipboardList, href: route('enrollment.index'), active: true },
        { label: 'Class Schedule', icon: CalendarDays, href: route('class-schedule.index') },
        { label: 'Class Activities', icon: BookOpen, href: route('class-activities.index') },
        { label: 'Assignments', icon: FileUp, href: route('assignments.index') },
    ];

    function submit(e) {
        e.preventDefault();

        post(route('enrollment.store'), {
            onSuccess: () => reset('course', 'school_year'),
        });
    }

    return (
        <>
            <Head title="Online Enrollment" />

            <div className="min-h-screen bg-gray-50 text-gray-900">
                {sidebarOpen && (
                    <button
                        type="button"
                        aria-label="Close navigation"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    />
                )}

                <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-green-950 text-white transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
                        <Link href="/" className="flex min-w-0 items-center gap-3">
                            <img
                                src="/images/school-logo.jpg"
                                alt="School logo"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                className="h-11 w-11 rounded-xl bg-white object-contain p-1"
                            />
                            <div>
                                <p className="font-bold">Student Portal</p>
                                <p className="text-xs text-green-300">Academic Services</p>
                            </div>
                        </Link>

                        <button type="button" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar" className="ml-auto rounded-lg p-2 hover:bg-white/10 lg:hidden">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="px-6 pb-3 pt-7">
                        <p className="text-xs font-semibold uppercase tracking-widest text-green-400">Student Menu</p>
                    </div>

                    <nav className="flex-1 space-y-1 overflow-y-auto px-4 pb-5">
                        {navigation.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${item.active ? 'bg-green-700 text-white' : 'text-green-100 hover:bg-white/10'}`}
                                >
                                    <Icon size={19} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}

                        <div className="my-6 border-t border-white/10" />

                        <Link href="/" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-green-100 hover:bg-white/10">
                            <GraduationCap size={19} />
                            Home Page
                        </Link>
                    </nav>

                    <div className="border-t border-white/10 p-4">
                        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                            <Avatar name={name} />
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold">{name}</p>
                                <p className="mt-1 truncate text-xs text-green-300">{studentId}</p>
                            </div>
                        </div>

                        <Link href={route('logout')} method="post" as="button" className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-green-100 hover:bg-white/10">
                            <LogOut size={18} />
                            Sign Out
                        </Link>
                    </div>
                </aside>

                <div className="min-h-screen lg:pl-72">
                    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
                        <div className="flex h-[76px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-9">
                            <div className="flex items-center gap-3">
                                <button type="button" onClick={() => setSidebarOpen(true)} aria-label="Open navigation" className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50 lg:hidden">
                                    <Menu size={21} />
                                </button>
                                <div>
                                    <p className="text-xs text-gray-500">Student Portal</p>
                                    <h1 className="text-xl font-bold">Online Enrollment</h1>
                                </div>
                            </div>
                            <div className="hidden items-center gap-3 sm:flex">
                                <Avatar name={name} />
                                <div>
                                    <p className="text-sm font-semibold">{name}</p>
                                    <p className="text-xs text-gray-500">{studentId}</p>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="mx-auto max-w-[1400px] space-y-8 px-4 py-7 sm:px-6 sm:py-9 lg:px-9">
                        <section>
                            <p className="text-sm font-semibold text-green-700">ACADEMIC SERVICES</p>
                            <h2 className="mt-2 text-2xl font-bold">Online Enrollment</h2>
                            <p className="mt-2 text-sm text-gray-500">Submit an enrollment request and track its status.</p>
                        </section>

                        {flash?.success && (
                            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                                {flash.success}
                            </div>
                        )}

                        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                            <h3 className="text-lg font-bold">Enrollment Form</h3>
                            <p className="mt-1 text-sm text-gray-500">Enter your enrollment information below.</p>

                            <form onSubmit={submit} className="mt-6 grid gap-5 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label htmlFor="course" className="mb-2 block text-sm font-medium">Course or Program</label>
                                    <input
                                        id="course"
                                        type="text"
                                        value={data.course}
                                        onChange={(e) => setData('course', e.target.value)}
                                        placeholder="Enter your course or program"
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                    />
                                    {errors.course && <p className="mt-1 text-sm text-red-600">{errors.course}</p>}
                                </div>

                                <div>
                                    <label htmlFor="school_year" className="mb-2 block text-sm font-medium">School Year</label>
                                    <input
                                        id="school_year"
                                        type="text"
                                        value={data.school_year}
                                        onChange={(e) => setData('school_year', e.target.value)}
                                        placeholder="Example: 2026-2027"
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                    />
                                    {errors.school_year && <p className="mt-1 text-sm text-red-600">{errors.school_year}</p>}
                                </div>

                                <div>
                                    <label htmlFor="semester" className="mb-2 block text-sm font-medium">Semester</label>
                                    <select
                                        id="semester"
                                        value={data.semester}
                                        onChange={(e) => setData('semester', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                    >
                                        <option>1st Semester</option>
                                        <option>2nd Semester</option>
                                        <option>Summer</option>
                                    </select>
                                    {errors.semester && <p className="mt-1 text-sm text-red-600">{errors.semester}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <button type="submit" disabled={processing} className="rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-60">
                                        {processing ? 'Submitting...' : 'Submit Enrollment'}
                                    </button>
                                </div>
                            </form>
                        </section>

                        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                                <h3 className="font-bold">My Enrollment Records</h3>
                                <p className="mt-1 text-sm text-gray-500">Review the enrollment requests you have submitted.</p>
                            </div>

                            {enrollments.length === 0 ? (
                                <div className="px-5 py-12 text-center">
                                    <ClipboardList size={32} className="mx-auto text-green-700" />
                                    <h4 className="mt-3 font-semibold">No enrollment records yet</h4>
                                    <p className="mt-1 text-sm text-gray-500">Your submitted requests will appear here.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-gray-50 text-gray-600">
                                            <tr>
                                                <th className="px-5 py-4">Course</th>
                                                <th className="px-5 py-4">School Year</th>
                                                <th className="px-5 py-4">Semester</th>
                                                <th className="px-5 py-4">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {enrollments.map((enrollment) => (
                                                <tr key={enrollment.id}>
                                                    <td className="px-5 py-4 font-medium">{enrollment.course}</td>
                                                    <td className="px-5 py-4">{enrollment.school_year}</td>
                                                    <td className="px-5 py-4">{enrollment.semester}</td>
                                                    <td className="px-5 py-4">
                                                        <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                                                            {enrollment.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>

                        <footer className="border-t border-gray-200 py-5 text-xs text-gray-500">
                            Student Portal · Academic Services
                        </footer>
                    </main>
                </div>
            </div>
        </>
    );
}
