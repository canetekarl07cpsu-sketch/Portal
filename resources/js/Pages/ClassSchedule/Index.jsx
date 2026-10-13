
import { Head, Link, usePage } from '@inertiajs/react';
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
    Clock,
    MapPin,
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

function formatTime(time) {
    if (!time) return '—';

    const [hours, minutes] = time.split(':').map(Number);

    return new Date(2000, 0, 1, hours, minutes).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
    });
}

export default function Index({ schedules = [] }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [logoFailed, setLogoFailed] = useState(false);

    const name = user?.name || 'Student';
    const studentId = user?.student_id || 'Student ID not available';

    const navigation = [
        { label: 'Dashboard', icon: LayoutDashboard, href: route('dashboard') },
        { label: 'My Grades', icon: ChartNoAxesColumn, href: route('grades.index') },
        { label: 'Online Enrollment', icon: ClipboardList, href: route('enrollment.index') },
        { label: 'Class Schedule', icon: CalendarDays, href: route('class-schedule.index'), active: true },
        { label: 'Class Activities', icon: BookOpen, href: route('class-activities.index') },
        { label: 'Assignments', icon: FileUp, href: route('assignments.index') },
    ];

    const groupedSchedules = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ]
        .map((day) => ({
            day,
            items: schedules.filter((item) => item.day_of_week === day),
        }))
        .filter((group) => group.items.length > 0);

    return (
        <>
            <Head title="Class Schedule" />

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
                            {!logoFailed ? (
                                <img
                                    src="/images/school-logo.jpg"
                                    alt="School logo"
                                    onError={() => setLogoFailed(true)}
                                    className="h-11 w-11 shrink-0 rounded-xl bg-white object-contain p-1"
                                />
                            ) : (
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-green-900">
                                    <GraduationCap size={27} />
                                </div>
                            )}
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

                        <Link href="/" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-green-100 hover:bg-white/10">
                            <GraduationCap size={19} />
                            Home Page
                        </Link>
                    </nav>

                    <div className="border-t border-white/10 p-4">
                        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                            <Avatar name={name} />
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold">{name}</p>
                                <p className="truncate text-xs text-green-300">{studentId}</p>
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
                                    <h1 className="text-xl font-bold">Class Schedule</h1>
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

                    <main className="mx-auto max-w-[1400px] space-y-7 px-4 py-7 sm:px-6 sm:py-9 lg:px-9">
                        <section>
                            <p className="text-sm font-semibold text-green-700">ACADEMIC SERVICES</p>
                            <h2 className="mt-2 text-2xl font-bold">My Class Schedule</h2>
                            <p className="mt-2 text-sm text-gray-500">
                                Check your class times, subjects, instructors, and classroom locations.
                            </p>
                        </section>

                        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="flex items-center gap-3 border-b border-gray-100 p-5 sm:p-6">
                                <div className="rounded-xl bg-green-50 p-3 text-green-800">
                                    <CalendarDays size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold">Weekly Class Schedule</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {schedules.length} scheduled class{schedules.length === 1 ? '' : 'es'}
                                    </p>
                                </div>
                            </div>

                            {schedules.length === 0 ? (
                                <div className="px-5 py-14 text-center">
                                    <CalendarDays size={36} className="mx-auto text-green-700" />
                                    <h3 className="mt-4 font-semibold">No class schedule available</h3>
                                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                                        Your schedule will appear here when records are assigned to your account.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-7 p-5 sm:p-6">
                                    {groupedSchedules.map((group) => (
                                        <div key={group.day}>
                                            <h3 className="mb-3 border-l-4 border-green-700 pl-3 font-bold">
                                                {group.day}
                                            </h3>
                                            <div className="overflow-x-auto rounded-xl border border-gray-200">
                                                <table className="w-full min-w-[700px] text-left text-sm">
                                                    <thead className="bg-gray-50 text-gray-600">
                                                        <tr>
                                                            <th className="px-4 py-3">Time</th>
                                                            <th className="px-4 py-3">Subject</th>
                                                            <th className="px-4 py-3">Instructor</th>
                                                            <th className="px-4 py-3">Room</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100">
                                                        {group.items.map((item) => (
                                                            <tr key={item.id}>
                                                                <td className="whitespace-nowrap px-4 py-4">
                                                                    <div className="flex items-center gap-2 text-green-800">
                                                                        <Clock size={16} />
                                                                        <span>{formatTime(item.start_time)} - {formatTime(item.end_time)}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-4">
                                                                    <p className="font-semibold">{item.subject_name}</p>
                                                                    <p className="mt-1 text-xs text-gray-500">{item.subject_code}</p>
                                                                </td>
                                                                <td className="px-4 py-4 text-gray-600">{item.instructor || 'Not assigned'}</td>
                                                                <td className="px-4 py-4 text-gray-600">
                                                                    <span className="inline-flex items-center gap-1.5">
                                                                        <MapPin size={15} />
                                                                        {item.room || 'Not assigned'}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {schedules.length > 0 && (
                            <p className="text-sm text-gray-500">
                                School year: {schedules[0].school_year} · {schedules[0].semester}
                            </p>
                        )}

                        <footer className="border-t border-gray-200 py-5 text-xs text-gray-500">
                            Student Portal · Academic Services
                        </footer>
                    </main>
                </div>
            </div>
        </>
    );
}
