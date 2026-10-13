
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import {
    GraduationCap,
    Menu,
    X,
    ArrowRight,
    ChartNoAxesColumn,
    ClipboardList,
    CalendarDays,
    BookOpen,
    FileUp,
    ShieldCheck,
    ChevronRight,
} from 'lucide-react';

export default function Welcome({ auth }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const isLoggedIn = Boolean(auth?.user);

    const services = [
        {
            title: 'Academic Grades',
            description:
                'Review your recorded grades, subject units, and academic performance.',
            icon: ChartNoAxesColumn,
            number: '01',
        },
        {
            title: 'Online Enrollment',
            description:
                'Submit an enrollment request and check your enrollment records.',
            icon: ClipboardList,
            number: '02',
        },
        {
            title: 'Class Schedule',
            description:
                'View your weekly subjects, class times, instructors, and rooms.',
            icon: CalendarDays,
            number: '03',
        },
        {
            title: 'Class Activities',
            description:
                'Keep track of classroom activities, instructions, and deadlines.',
            icon: BookOpen,
            number: '04',
        },
        {
            title: 'Assignments',
            description:
                'View assigned work, check due dates, and submit your files online.',
            icon: FileUp,
            number: '05',
        },
    ];

    return (
        <>
            <Head title="Home" />

            <div className="min-h-screen bg-white text-gray-900">
                <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
                    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
                        <Link
                            href="/"
                            className="flex items-center gap-3"
                        >
                            <img
                                src="/images/school-logo.jpg"
                                alt="School logo"
                                className="h-12 w-12 rounded-xl object-contain"
                            />
                            <div>
                                <p className="text-base font-extrabold tracking-tight text-green-950 sm:text-lg">
                                    Student Portal
                                </p>
                                <p className="text-xs text-gray-500">
                                    Academic Services
                                </p>
                            </div>
                        </Link>

                        <nav className="hidden items-center gap-8 md:flex">
                            <a
                                href="#home"
                                className="text-sm font-semibold text-gray-700 transition hover:text-green-700"
                            >
                                Home
                            </a>
                            <a
                                href="#services"
                                className="text-sm font-semibold text-gray-700 transition hover:text-green-700"
                            >
                                Student Services
                            </a>
                            <a
                                href="#about"
                                className="text-sm font-semibold text-gray-700 transition hover:text-green-700"
                            >
                                About
                            </a>
                        </nav>

                        <div className="hidden items-center gap-3 md:flex">
                            {isLoggedIn ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center gap-2 rounded-lg bg-green-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-900"
                                >
                                    Dashboard
                                    <ArrowRight size={17} />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center gap-2 rounded-lg bg-green-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-900"
                                    >
                                        Get Started
                                        <ArrowRight size={17} />
                                    </Link>
                                </>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle navigation"
                            className="rounded-lg border border-gray-200 p-2 text-gray-700 md:hidden"
                        >
                            {menuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>

                    {menuOpen && (
                        <nav className="border-t border-gray-200 bg-white p-5 md:hidden">
                            <div className="mx-auto flex max-w-7xl flex-col gap-2">
                                <a
                                    href="#home"
                                    onClick={() => setMenuOpen(false)}
                                    className="rounded-lg px-3 py-3 text-sm font-semibold hover:bg-green-50"
                                >
                                    Home
                                </a>
                                <a
                                    href="#services"
                                    onClick={() => setMenuOpen(false)}
                                    className="rounded-lg px-3 py-3 text-sm font-semibold hover:bg-green-50"
                                >
                                    Student Services
                                </a>
                                <a
                                    href="#about"
                                    onClick={() => setMenuOpen(false)}
                                    className="rounded-lg px-3 py-3 text-sm font-semibold hover:bg-green-50"
                                >
                                    About
                                </a>

                                {isLoggedIn ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="mt-2 rounded-lg bg-green-800 px-4 py-3 text-center text-sm font-semibold text-white"
                                    >
                                        Open Dashboard
                                    </Link>
                                ) : (
                                    <div className="mt-2 grid grid-cols-2 gap-3">
                                        <Link
                                            href={route('login')}
                                            className="rounded-lg border border-gray-200 px-4 py-3 text-center text-sm font-semibold"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-green-800 px-4 py-3 text-center text-sm font-semibold text-white"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </nav>
                    )}
                </header>

                <main>
                    <section
                        id="home"
                        className="relative overflow-hidden bg-green-950"
                    >
                        <div className="absolute -right-24 -top-28 h-96 w-96 rounded-full border border-white/10" />
                        <div className="absolute -bottom-44 right-1/4 h-96 w-96 rounded-full border border-white/10" />

                        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-16 lg:py-32">
                            <div>
                                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-800/40 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-green-200">
                                    <ShieldCheck size={16} />
                                    Your Academic Workspace
                                </div>

                                <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                                    Your education,
                                    <span className="block text-green-400">
                                        one portal.
                                    </span>
                                </h1>

                                <p className="mt-6 max-w-xl text-base leading-8 text-green-100 sm:text-lg">
                                    Access your academic records, manage
                                    enrollment, check your class schedule,
                                    explore class activities, and submit
                                    assignments in one convenient place.
                                </p>

                                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                    {isLoggedIn ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-green-950 transition hover:bg-green-50"
                                        >
                                            Go to Dashboard
                                            <ArrowRight size={18} />
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('login')}
                                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-green-950 transition hover:bg-green-50"
                                            >
                                                Student Login
                                                <ArrowRight size={18} />
                                            </Link>

                                            <Link
                                                href={route('register')}
                                                className="inline-flex items-center justify-center rounded-lg border border-green-400/40 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                                            >
                                                Create an Account
                                            </Link>
                                        </>
                                    )}
                                </div>

                                <p className="mt-6 text-sm text-green-200/80">
                                    Simple access. Organized academics.
                                </p>
                            </div>

                            <div className="relative mx-auto w-full max-w-md">
                                <div className="absolute -inset-4 rounded-3xl bg-green-500/10 blur-2xl" />

                                <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white p-6 shadow-2xl sm:p-8">
                                    <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                                        <img
                                            src="/images/school-logo.jpg"
                                            alt="School logo"
                                            className="h-16 w-16 rounded-2xl object-contain"
                                        />
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-widest text-green-700">
                                                Welcome to
                                            </p>
                                            <h2 className="mt-1 text-xl font-extrabold text-green-950">
                                                Student Portal
                                            </h2>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Academic Services
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-3">
                                        {[
                                            {
                                                icon: ChartNoAxesColumn,
                                                title: 'Academic Records',
                                                detail: 'Grades and subject information',
                                            },
                                            {
                                                icon: CalendarDays,
                                                title: 'Class Information',
                                                detail: 'Schedules and activities',
                                            },
                                            {
                                                icon: FileUp,
                                                title: 'Student Tasks',
                                                detail: 'Assignments and submissions',
                                            },
                                        ].map((item) => {
                                            const Icon = item.icon;

                                            return (
                                                <div
                                                    key={item.title}
                                                    className="flex items-center gap-4 rounded-xl border border-gray-100 p-4"
                                                >
                                                    <div className="rounded-xl bg-green-50 p-3 text-green-800">
                                                        <Icon size={22} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-sm font-bold text-gray-900">
                                                            {item.title}
                                                        </h3>
                                                        <p className="mt-1 text-xs text-gray-500">
                                                            {item.detail}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-6 flex items-center gap-2 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-900">
                                        <ShieldCheck size={19} />
                                        A central place for student services
                                    </div>
                                </div>

                                <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-xl sm:flex">
                                    <div className="rounded-lg bg-green-100 p-2 text-green-800">
                                        <GraduationCap size={23} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">
                                            Student-focused
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Your academic journey
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section
                        id="services"
                        className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24"
                    >
                        <div className="max-w-2xl">
                            <p className="text-sm font-bold uppercase tracking-widest text-green-700">
                                Student Services
                            </p>
                            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
                                Everything you need for school.
                            </h2>
                            <p className="mt-4 text-base leading-7 text-gray-600">
                                Navigate your academic responsibilities using
                                the services provided by the Student Portal.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {services.map((service) => {
                                const Icon = service.icon;

                                return (
                                    <article
                                        key={service.title}
                                        className="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="rounded-xl bg-green-50 p-3 text-green-800 transition group-hover:bg-green-800 group-hover:text-white">
                                                <Icon size={25} />
                                            </div>
                                            <span className="text-sm font-bold text-gray-300">
                                                {service.number}
                                            </span>
                                        </div>

                                        <h3 className="mt-6 text-lg font-bold text-gray-950">
                                            {service.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-gray-600">
                                            {service.description}
                                        </p>

                                        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-green-800">
                                            Student service
                                            <ChevronRight
                                                size={17}
                                                className="transition group-hover:translate-x-1"
                                            />
                                        </div>
                                    </article>
                                );
                            })}

                            <article className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                                <div className="rounded-xl bg-white p-3 text-green-800 w-fit">
                                    <GraduationCap size={25} />
                                </div>

                                <h3 className="mt-6 text-lg font-bold text-gray-950">
                                    One Student Account
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-gray-600">
                                    Sign in with your student account to access
                                    the academic information associated with you.
                                </p>

                                <Link
                                    href={isLoggedIn ? route('dashboard') : route('login')}
                                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-green-800 hover:text-green-950"
                                >
                                    {isLoggedIn ? 'Open Dashboard' : 'Access your account'}
                                    <ArrowRight size={17} />
                                </Link>
                            </article>
                        </div>
                    </section>

                    <section
                        id="about"
                        className="border-y border-gray-200 bg-gray-50"
                    >
                        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 md:grid-cols-2 md:items-center md:py-20">
                            <div>
                                <p className="text-sm font-bold uppercase tracking-widest text-green-700">
                                    About the Portal
                                </p>
                                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-950">
                                    Academic information made accessible.
                                </h2>
                            </div>

                            <div>
                                <p className="text-sm leading-7 text-gray-600 sm:text-base">
                                    The Student Portal brings essential academic
                                    services together in one interface. Students
                                    can use their account to access grades,
                                    submit enrollment requests, view schedules
                                    and activities, and upload assignment files
                                    as those services become available.
                                </p>

                                <Link
                                    href={isLoggedIn ? route('dashboard') : route('login')}
                                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-900"
                                >
                                    {isLoggedIn ? 'Open Dashboard' : 'Access Student Portal'}
                                    <ArrowRight size={17} />
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="bg-green-950 text-white">
                    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
                        <Link href="/" className="flex items-center gap-3">
                            <img
                                src="/images/school-logo.jpg"
                                alt="School logo"
                                className="h-10 w-10 rounded-lg object-contain"
                            />
                            <div>
                                <p className="font-bold">Student Portal</p>
                                <p className="mt-1 text-xs text-green-300">
                                    Academic Services
                                </p>
                            </div>
                        </Link>

                        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-green-100">
                            <a href="#home" className="hover:text-white">
                                Home
                            </a>
                            <a href="#services" className="hover:text-white">
                                Student Services
                            </a>
                            <a href="#about" className="hover:text-white">
                                About
                            </a>
                            <Link
                                href={isLoggedIn ? route('dashboard') : route('login')}
                                className="hover:text-white"
                            >
                                {isLoggedIn ? 'Dashboard' : 'Log in'}
                            </Link>
                        </div>

                        <p className="text-xs text-green-300">
                            Student Portal · Academic Services
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
