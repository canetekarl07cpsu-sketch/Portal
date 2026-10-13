
import { Head, Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import {
    GraduationCap,
    LayoutDashboard,
    ChartNoAxesColumn,
    BookOpen,
    ClipboardList,
    CalendarDays,
    FileUp,
    LogOut,
    Menu,
    X,
    Search,
    Filter,
    ChevronRight,
    FileText,
    CircleDashed,
    CheckCircle2,
    UserRound,
} from 'lucide-react';

function InitialAvatar({ name }) {
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

export default function GradesIndex({ grades = [] }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [semesterFilter, setSemesterFilter] = useState('All Semesters');
    const [logoFailed, setLogoFailed] = useState(false);

    const displayName = user?.name || 'Student';
    const studentId = user?.student_id || 'Student ID not available';

    const semesters = useMemo(
        () => [
            'All Semesters',
            ...new Set(
                grades
                    .map((grade) => grade.semester)
                    .filter(Boolean),
            ),
        ],
        [grades],
    );

    const filteredGrades = useMemo(() => {
        const query = search.trim().toLowerCase();

        return grades.filter((grade) => {
            const matchesSearch =
                !query ||
                String(grade.subject_code || '').toLowerCase().includes(query) ||
                String(grade.subject_name || '').toLowerCase().includes(query) ||
                String(grade.school_year || '').toLowerCase().includes(query);

            const matchesSemester =
                semesterFilter === 'All Semesters' ||
                grade.semester === semesterFilter;

            return matchesSearch && matchesSemester;
        });
    }, [grades, search, semesterFilter]);

    const totalUnits = filteredGrades.reduce(
        (total, grade) => total + Number(grade.units || 0),
        0,
    );

    const recordedCount = filteredGrades.filter(
        (grade) => grade.grade !== null && grade.grade !== '',
    ).length;

    const navigation = [
        {
            label: 'Dashboard',
            icon: LayoutDashboard,
            href: route('dashboard'),
            active: false,
        },
        {
            label: 'My Grades',
            icon: ChartNoAxesColumn,
            href: route('grades.index'),
            active: true,
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
        },
    ];

    return (
        <>
            <Head title="My Grades" />

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
                    <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-6">
                        <Link href="/" className="flex items-center gap-3">
                            {!logoFailed ? (
                                <img
                                    src="/images/school-logo.jpg"
                                    alt="School logo"
                                    onError={() => setLogoFailed(true)}
                                    className="h-11 w-11 rounded-xl bg-white object-contain p-1"
                                />
                            ) : (
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-green-900">
                                    <GraduationCap size={27} />
                                </div>
                            )}

                            <div>
                                <p className="text-base font-bold">
                                    Student Portal
                                </p>
                                <p className="mt-0.5 text-xs text-green-300">
                                    Academic Services
                                </p>
                            </div>
                        </Link>

                        <button
                            type="button"
                            aria-label="Close sidebar"
                            onClick={() => setSidebarOpen(false)}
                            className="rounded-lg p-2 text-green-200 hover:bg-white/10 lg:hidden"
                        >
                            <X size={21} />
                        </button>
                    </div>

                    <div className="px-6 pb-3 pt-7">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-green-400">
                            Student Menu
                        </p>
                    </div>

                    <nav className="flex-1 space-y-1 overflow-y-auto px-4 pb-5">
                        {navigation.map((item) => {
                            const Icon = item.icon;

                            if (item.href) {
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                                            item.active
                                                ? 'bg-green-700 text-white'
                                                : 'text-green-100 hover:bg-white/10'
                                        }`}
                                    >
                                        <Icon size={19} />
                                        {item.label}
                                    </Link>
                                );
                            }

                            return (
                                <div
                                    key={item.label}
                                    className="flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-3 text-sm text-green-100/80"
                                    title="This module has not been connected yet."
                                >
                                    <Icon
                                        size={19}
                                        className="text-green-300"
                                    />
                                    <span className="flex-1">
                                        {item.label}
                                    </span>
                                    <span className="rounded-md border border-white/10 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-green-300">
                                        Soon
                                    </span>
                                </div>
                            );
                        })}

                        <div className="my-6 border-t border-white/10" />

                        <Link
                            href="/"
                            onClick={() => setSidebarOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-green-100 transition hover:bg-white/10"
                        >
                            <GraduationCap size={19} />
                            Home Page
                        </Link>
                    </nav>

                    <div className="border-t border-white/10 p-4">
                        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                            <InitialAvatar name={displayName} />

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold">
                                    {displayName}
                                </p>
                                <p className="mt-1 truncate text-xs text-green-300">
                                    {studentId}
                                </p>
                            </div>
                        </div>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-green-100 transition hover:bg-white/10 hover:text-white"
                        >
                            <LogOut size={18} />
                            Sign Out
                        </Link>
                    </div>
                </aside>

                <div className="min-h-screen lg:pl-72">
                    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
                        <div className="flex h-[76px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-9">
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    aria-label="Open navigation"
                                    onClick={() => setSidebarOpen(true)}
                                    className="rounded-lg border border-gray-200 p-2 text-gray-700 hover:bg-gray-50 lg:hidden"
                                >
                                    <Menu size={21} />
                                </button>

                                <div>
                                    <p className="text-xs font-medium text-gray-500">
                                        Student Portal
                                    </p>
                                    <h1 className="text-lg font-bold tracking-tight text-gray-950 sm:text-xl">
                                        My Grades
                                    </h1>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="hidden text-right sm:block">
                                    <p className="text-sm font-semibold text-gray-900">
                                        {displayName}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {studentId}
                                    </p>
                                </div>
                                <InitialAvatar name={displayName} />
                            </div>
                        </div>
                    </header>

                    <main className="mx-auto max-w-[1600px] px-4 py-7 sm:px-6 sm:py-9 lg:px-9">
                        <section className="relative overflow-hidden rounded-2xl bg-green-800 p-6 text-white sm:p-8">
                            <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full border border-white/10" />

                            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-200">
                                        Academic Records
                                    </p>
                                    <h2 className="mt-3 text-3xl font-bold tracking-tight">
                                        My Grades
                                    </h2>
                                    <p className="mt-3 max-w-xl text-sm leading-6 text-green-100 sm:text-base">
                                        Review your recorded subject grades,
                                        units, semester, and school year.
                                    </p>
                                </div>

                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                                    <ChartNoAxesColumn size={32} />
                                </div>
                            </div>
                        </section>

                        <section className="mt-7 grid gap-4 sm:grid-cols-3">
                            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-500">
                                        Subjects Listed
                                    </p>
                                    <BookOpen
                                        size={21}
                                        className="text-green-800"
                                    />
                                </div>
                                <p className="mt-4 text-3xl font-bold text-gray-950">
                                    {filteredGrades.length}
                                </p>
                                <p className="mt-2 text-xs text-gray-500">
                                    Matching subject records
                                </p>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-500">
                                        Total Units
                                    </p>
                                    <GraduationCap
                                        size={22}
                                        className="text-green-800"
                                    />
                                </div>
                                <p className="mt-4 text-3xl font-bold text-gray-950">
                                    {totalUnits}
                                </p>
                                <p className="mt-2 text-xs text-gray-500">
                                    Units in the filtered list
                                </p>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-500">
                                        Grades Recorded
                                    </p>
                                    <CheckCircle2
                                        size={21}
                                        className="text-green-800"
                                    />
                                </div>
                                <p className="mt-4 text-3xl font-bold text-gray-950">
                                    {recordedCount}
                                </p>
                                <p className="mt-2 text-xs text-gray-500">
                                    Records with a grade value
                                </p>
                            </div>
                        </section>

                        <section className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                                <h2 className="font-bold text-gray-950">
                                    Subject Grade Records
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Search by subject name, subject code, or
                                    school year.
                                </p>

                                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                    <div className="relative flex-1">
                                        <Search
                                            size={19}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />
                                        <input
                                            type="search"
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            placeholder="Search subjects..."
                                            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
                                        />
                                    </div>

                                    <div className="relative sm:w-56">
                                        <Filter
                                            size={17}
                                            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                        />
                                        <select
                                            value={semesterFilter}
                                            onChange={(e) =>
                                                setSemesterFilter(e.target.value)
                                            }
                                            className="w-full appearance-none rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
                                        >
                                            {semesters.map((semester) => (
                                                <option
                                                    key={semester}
                                                    value={semester}
                                                >
                                                    {semester}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {filteredGrades.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[900px] text-left text-sm">
                                        <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                                            <tr>
                                                <th className="px-6 py-4 font-semibold">
                                                    Subject
                                                </th>
                                                <th className="px-5 py-4 font-semibold">
                                                    Code
                                                </th>
                                                <th className="px-5 py-4 font-semibold">
                                                    Units
                                                </th>
                                                <th className="px-5 py-4 font-semibold">
                                                    Grade
                                                </th>
                                                <th className="px-5 py-4 font-semibold">
                                                    Semester
                                                </th>
                                                <th className="px-5 py-4 font-semibold">
                                                    School Year
                                                </th>
                                                <th className="px-5 py-4 font-semibold">
                                                    Remarks
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {filteredGrades.map((grade) => (
                                                <tr
                                                    key={grade.id}
                                                    className="transition hover:bg-green-50/40"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="font-semibold text-gray-900">
                                                            {grade.subject_name}
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 text-gray-600">
                                                        {grade.subject_code}
                                                    </td>
                                                    <td className="px-5 py-4 text-gray-600">
                                                        {grade.units}
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <span className="inline-flex rounded-lg bg-green-50 px-3 py-1.5 font-bold text-green-800">
                                                            {grade.grade ?? 'Not recorded'}
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-4 text-gray-600">
                                                        {grade.semester}
                                                    </td>
                                                    <td className="px-5 py-4 text-gray-600">
                                                        {grade.school_year}
                                                    </td>
                                                    <td className="px-5 py-4 text-gray-600">
                                                        {grade.remarks || '—'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center px-6 py-12 text-center">
                                    <div className="mb-4 rounded-2xl bg-green-50 p-4 text-green-800">
                                        {grades.length === 0 ? (
                                            <FileText size={30} />
                                        ) : (
                                            <Search size={30} />
                                        )}
                                    </div>

                                    <h3 className="text-base font-bold text-gray-900">
                                        {grades.length === 0
                                            ? 'No grade records yet'
                                            : 'No matching subjects found'}
                                    </h3>

                                    <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                                        {grades.length === 0
                                            ? 'Your academic grades will appear here once authorized school staff enter and publish your grade records.'
                                            : 'Try another subject name, subject code, school year, or semester filter.'}
                                    </p>

                                    {grades.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSearch('');
                                                setSemesterFilter('All Semesters');
                                            }}
                                            className="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                        >
                                            Clear filters
                                        </button>
                                    )}
                                </div>
                            )}

                            <div className="flex flex-col gap-2 border-t border-gray-100 px-5 py-4 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                                <span>
                                    Showing {filteredGrades.length} of {grades.length} subject records
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <CircleDashed
                                        size={14}
                                        className="text-green-700"
                                    />
                                    Records are linked to your student account
                                </span>
                            </div>
                        </section>

                        <footer className="mt-10 border-t border-gray-200 py-6">
                            <p className="text-xs text-gray-500">
                                Student Portal · Academic Services
                            </p>
                        </footer>
                    </main>
                </div>
            </div>
        </>
    );
}
