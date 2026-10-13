
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    GraduationCap,
    LayoutDashboard,
    BookOpen,
    ClipboardList,
    CalendarDays,
    FileUp,
    ArrowUpRight,
    Clock3,
    CheckCircle2,
    CircleDashed,
    LogOut,
    Menu,
    X,
    UserRound,
    ChevronRight,
    ChartNoAxesColumn,
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

export default function Dashboard() {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [logoFailed, setLogoFailed] = useState(false);

    const displayName = user?.name || 'Student';
    const studentId = user?.student_id || 'Student ID not available';

    const currentDate = new Date().toLocaleDateString('en-PH', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const navigation = [
        {
            label: 'Dashboard',
            icon: LayoutDashboard,
            href: route('dashboard'),
            active: true,
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
        },
    ];

    const overviewCards = [
        {
            title: 'Academic Grades',
            description: 'View your academic records',
            icon: ChartNoAxesColumn,
            href: route('grades.index'),
        },
        {
            title: 'Online Enrollment',
            description: 'Submit an enrollment request',
            icon: ClipboardList,
            href: route('enrollment.index'),
        },
        {
            title: 'Class Schedule',
            description: 'View your class schedule',
            icon: CalendarDays,
            href: route('class-schedule.index'),
        },
        {
            title: 'Class Activities',
            description: 'View your class activities',
            icon: BookOpen,
            href: route('class-activities.index'),
        },
    ];

    return (
        <>
            <Head title="Student Dashboard" />

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
                            {!logoFailed ? (
                                <img
                                    src="/images/school-logo.jpg"
                                    alt="School logo"
                                    onError={() => setLogoFailed(true)}
                                    className="h-11 w-11 rounded-xl bg-white object-contain p-1"
                                />
                            ) : (
                                <div className="rounded-xl bg-white p-2 text-green-900">
                                    <GraduationCap size={28} />
                                </div>
                            )}

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
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            }

                            return (
                                <div
                                    key={item.label}
                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-green-100/70"
                                >
                                    <Icon size={19} className="text-green-300" />
                                    <span className="flex-1">{item.label}</span>
                                    <span className="text-[10px] uppercase text-green-300">
                                        Soon
                                    </span>
                                </div>
                            );
                        })}

                        <div className="my-6 border-t border-white/10" />

                        <Link
                            href="/"
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-green-100 hover:bg-white/10"
                        >
                            <GraduationCap size={19} />
                            <span>Home Page</span>
                            <ArrowUpRight size={15} className="ml-auto" />
                        </Link>
                    </nav>

                    <div className="border-t border-white/10 p-4">
                        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                            <Avatar name={displayName} />
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
                            className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-green-100 hover:bg-white/10"
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
                                        Dashboard
                                    </h1>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="hidden text-xs text-gray-500 md:inline">
                                    {currentDate}
                                </span>
                                <Avatar name={displayName} />
                                <div className="hidden sm:block">
                                    <p className="text-sm font-semibold">
                                        {displayName}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Student Account
                                    </p>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="mx-auto max-w-[1600px] px-4 py-7 sm:px-6 sm:py-9 lg:px-9">
                        <section className="relative overflow-hidden rounded-2xl bg-green-800 p-6 text-white sm:p-9">
                            <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full border border-white/10" />
                            <div className="absolute -bottom-28 right-20 h-72 w-72 rounded-full border border-white/10" />

                            <div className="relative max-w-3xl">
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-green-100">
                                    <span className="h-2 w-2 rounded-full bg-green-300" />
                                    Student Workspace
                                </div>

                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                    Welcome back, {displayName.split(' ')[0]}!
                                </h2>

                                <p className="mt-3 max-w-xl text-sm leading-7 text-green-100 sm:text-base">
                                    Access your grades, enrollment, class
                                    schedule, activities, and assignments
                                    from your academic workspace.
                                </p>

                                <div className="mt-6 flex flex-wrap gap-3 text-sm text-green-100">
                                    <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
                                        <UserRound size={16} />
                                        {studentId}
                                    </span>

                                    <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
                                        <Clock3 size={16} />
                                        {currentDate}
                                    </span>
                                </div>
                            </div>

                            <GraduationCap
                                size={100}
                                strokeWidth={1.2}
                                className="absolute bottom-7 right-9 hidden text-white/20 lg:block"
                            />
                        </section>

                        <section className="mt-9">
                            <div className="mb-5">
                                <h2 className="text-lg font-bold">
                                    Academic Services
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Open a service to view more information.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                {overviewCards.map((card) => {
                                    const Icon = card.icon;
                                    const content = (
                                        <>
                                            <div className="flex items-center justify-between">
                                                <div className="rounded-xl bg-green-50 p-3 text-green-800">
                                                    <Icon size={24} />
                                                </div>
                                                <ChevronRight
                                                    size={19}
                                                    className="text-gray-400"
                                                />
                                            </div>

                                            <h3 className="mt-5 font-bold">
                                                {card.title}
                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                                {card.description}
                                            </p>
                                        </>
                                    );

                                    return card.href ? (
                                        <Link
                                            key={card.title}
                                            href={card.href}
                                            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md"
                                        >
                                            {content}
                                        </Link>
                                    ) : (
                                        <div
                                            key={card.title}
                                            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                                        >
                                            {content}
                                            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                Coming soon
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        <section className="mt-9 grid gap-6 xl:grid-cols-2">
                            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                                <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                                    <h2 className="font-bold">
                                        My Academic Activities
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Your class updates and tasks.
                                    </p>
                                </div>

                                <div className="flex flex-col items-center px-5 py-10 text-center">
                                    <div className="rounded-2xl bg-green-50 p-4 text-green-800">
                                        <BookOpen size={27} />
                                    </div>
                                    <h3 className="mt-4 text-sm font-semibold">
                                        No activities to display yet
                                    </h3>
                                    <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
                                        Class activities and assignment updates
                                        will appear here when those features
                                        are connected.
                                    </p>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                                <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                                    <h2 className="font-bold">Quick Access</h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Student services
                                    </p>
                                </div>

                                <div className="space-y-1 p-3">
                                    {navigation
                                        .filter((item) => item.href && !item.active)
                                        .map((item) => {
                                            const Icon = item.icon;

                                            return (
                                                <Link
                                                    key={item.label}
                                                    href={item.href}
                                                    className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-green-50"
                                                >
                                                    <div className="rounded-lg bg-green-50 p-2.5 text-green-800">
                                                        <Icon size={19} />
                                                    </div>
                                                    <span className="flex-1 text-sm font-semibold">
                                                        {item.label}
                                                    </span>
                                                    <ChevronRight
                                                        size={18}
                                                        className="text-gray-400"
                                                    />
                                                </Link>
                                            );
                                        })}
                                </div>
                            </div>
                        </section>

                        <footer className="mt-10 border-t border-gray-200 py-6">
                            <div className="flex flex-col justify-between gap-2 text-xs text-gray-500 sm:flex-row">
                                <p>Student Portal · Academic Services</p>
                                <p>
                                    Your academic information, organized in
                                    one place.
                                </p>
                            </div>
                        </footer>
                    </main>
                </div>
            </div>
        </>
    );
}
