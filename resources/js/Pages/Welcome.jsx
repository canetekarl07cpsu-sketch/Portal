import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import {
    ArrowDown,
    ArrowRight,
    BookOpen,
    CalendarCheck,
    CalendarDays,
    ChartNoAxesColumn,
    Check,
    ChevronRight,
    ClipboardList,
    FileUp,
    GraduationCap,
    Menu,
    ShieldCheck,
    UserRound,
    X,
} from 'lucide-react';

const services = [
    {
        title: 'Attendance',
        description: 'Check in, check out, and review your recorded school days.',
        icon: CalendarCheck,
        color: 'blue',
    },
    {
        title: 'Class calendar',
        description: 'See your weekly classes, times, instructors, and rooms.',
        icon: CalendarDays,
        color: 'indigo',
    },
    {
        title: 'Assignments',
        description: 'Keep track of school work, due dates, and submissions.',
        icon: FileUp,
        color: 'violet',
    },
    {
        title: 'Grades',
        description: 'Review the academic results connected to your account.',
        icon: ChartNoAxesColumn,
        color: 'emerald',
    },
    {
        title: 'Enrollment',
        description: 'Submit and follow your enrollment requests online.',
        icon: ClipboardList,
        color: 'amber',
    },
    {
        title: 'Class activities',
        description: 'Stay up to date with classroom activities and instructions.',
        icon: BookOpen,
        color: 'sky',
    },
];

const colorStyles = {
    blue: 'bg-blue-50 text-blue-800 group-hover:bg-blue-900 group-hover:text-white dark:bg-blue-900/40 dark:text-blue-300',
    indigo: 'bg-indigo-50 text-indigo-800 group-hover:bg-indigo-900 group-hover:text-white dark:bg-indigo-900/40 dark:text-indigo-300',
    violet: 'bg-violet-50 text-violet-800 group-hover:bg-violet-900 group-hover:text-white dark:bg-violet-900/40 dark:text-violet-300',
    emerald: 'bg-emerald-50 text-emerald-800 group-hover:bg-emerald-900 group-hover:text-white dark:bg-emerald-900/40 dark:text-emerald-300',
    amber: 'bg-amber-50 text-amber-800 group-hover:bg-amber-900 group-hover:text-white dark:bg-amber-900/40 dark:text-amber-300',
    sky: 'bg-sky-50 text-sky-800 group-hover:bg-sky-900 group-hover:text-white dark:bg-sky-900/40 dark:text-sky-300',
};

export default function Welcome({ auth }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const isLoggedIn = Boolean(auth?.user);
    const primaryHref = isLoggedIn ? route('dashboard') : route('login');

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <Head title="Central Philippines State University Student Portal" />

            <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
                <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
                    <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
                        <Link href="/" className="group inline-flex shrink-0 items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-950 text-white shadow-sm transition duration-200 group-hover:scale-105 motion-reduce:transition-none dark:bg-blue-700">
                                <GraduationCap size={25} />
                            </span>
                            <span>
                                <span className="block text-sm font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-base">Student Portal</span>
                                <span className="mt-0.5 block text-[11px] font-medium text-slate-500 dark:text-slate-400">Central Philippines State University</span>
                            </span>
                        </Link>

                        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
                            <a href="#home" className="text-sm font-semibold text-slate-600 transition hover:text-blue-800 motion-reduce:transition-none dark:text-slate-300 dark:hover:text-blue-300">Home</a>
                            <a href="#services" className="text-sm font-semibold text-slate-600 transition hover:text-blue-800 motion-reduce:transition-none dark:text-slate-300 dark:hover:text-blue-300">Student services</a>
                            <a href="#about" className="text-sm font-semibold text-slate-600 transition hover:text-blue-800 motion-reduce:transition-none dark:text-slate-300 dark:hover:text-blue-300">About</a>
                        </nav>

                        <div className="hidden items-center gap-3 md:flex">
                            {isLoggedIn ? (
                                <Link href={route('dashboard')} className="inline-flex items-center gap-2 rounded-xl bg-blue-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-blue-900 motion-reduce:transition-none dark:bg-blue-700 dark:hover:bg-blue-600">
                                    Open dashboard <ArrowRight size={16} />
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 motion-reduce:transition-none dark:text-slate-200 dark:hover:bg-slate-800">Log in</Link>
                                    <Link href={route('register')} className="inline-flex items-center gap-2 rounded-xl bg-blue-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-blue-900 motion-reduce:transition-none dark:bg-blue-700 dark:hover:bg-blue-600">
                                        Get started <ArrowRight size={16} />
                                    </Link>
                                </>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => setMenuOpen((open) => !open)}
                            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                            aria-expanded={menuOpen}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 motion-reduce:transition-none md:hidden dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                    {menuOpen && (
                        <nav aria-label="Mobile navigation" className="border-t border-slate-200 bg-white p-4 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200 md:hidden dark:border-slate-800 dark:bg-slate-950">
                            <div className="mx-auto flex max-w-7xl flex-col gap-1">
                                <a href="#home" onClick={closeMenu} className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-slate-800">Home</a>
                                <a href="#services" onClick={closeMenu} className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-slate-800">Student services</a>
                                <a href="#about" onClick={closeMenu} className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-slate-800">About</a>
                                {isLoggedIn ? (
                                    <Link href={route('dashboard')} onClick={closeMenu} className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-950 px-4 py-3 text-sm font-semibold text-white dark:bg-blue-700">
                                        Open dashboard <ArrowRight size={16} />
                                    </Link>
                                ) : (
                                    <div className="mt-2 grid grid-cols-2 gap-3">
                                        <Link href={route('login')} onClick={closeMenu} className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">Log in</Link>
                                        <Link href={route('register')} onClick={closeMenu} className="rounded-xl bg-blue-950 px-4 py-3 text-center text-sm font-semibold text-white dark:bg-blue-700">Register</Link>
                                    </div>
                                )}
                            </div>
                        </nav>
                    )}
                </header>

                <main>
                    <section id="home" className="relative isolate overflow-hidden bg-slate-50 dark:bg-slate-900/40">
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                            <div className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-blue-200/50 blur-3xl dark:bg-blue-900/20" />
                            <div className="absolute -bottom-48 -left-40 h-[30rem] w-[30rem] rounded-full bg-indigo-100/70 blur-3xl dark:bg-indigo-900/10" />
                            <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_0.7px,transparent_0.7px)] [background-size:24px_24px] opacity-[0.14] dark:opacity-[0.08]" />
                        </div>

                        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-28">
                            <div className="relative z-10">
                                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-900 shadow-sm dark:border-blue-900 dark:bg-slate-900/80 dark:text-blue-200">
                                    <ShieldCheck size={15} />
                                    Your student workspace
                                </div>

                                <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                                    School life,
                                    <span className="mt-2 block text-blue-800 dark:text-blue-300">all in one place.</span>
                                </h1>

                                <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                                    A simpler way to stay on top of attendance, class times, assignments, and the rest of your academic journey.
                                </p>

                                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                    <Link href={primaryHref} className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-950 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-950/15 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-xl motion-reduce:transition-none dark:bg-blue-700 dark:hover:bg-blue-600">
                                        {isLoggedIn ? 'Go to your dashboard' : 'Sign in to your portal'}
                                        <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" />
                                    </Link>
                                    {!isLoggedIn && (
                                        <Link href={route('register')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-700 transition duration-200 hover:border-blue-300 hover:bg-white hover:text-blue-900 motion-reduce:transition-none dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-blue-700 dark:hover:text-blue-200">
                                            Create a student account
                                        </Link>
                                    )}
                                </div>

                                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
                                    <span className="inline-flex items-center gap-2"><Check size={16} className="text-emerald-600 dark:text-emerald-400" />Student-focused services</span>
                                    <span className="inline-flex items-center gap-2"><Check size={16} className="text-emerald-600 dark:text-emerald-400" />One secure account</span>
                                </div>
                            </div>

                            <div className="relative mx-auto w-full max-w-lg">
                                <div aria-hidden="true" className="absolute -inset-5 rounded-[2.5rem] bg-blue-300/30 blur-2xl dark:bg-blue-700/15" />
                                <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-7 dark:border-slate-700 dark:bg-slate-900">
                                    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-900 dark:bg-blue-900/40 dark:text-blue-200"><GraduationCap size={24} /></span>
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Your school</p>
                                                <h2 className="mt-0.5 font-bold text-slate-900 dark:text-white">Central Philippines State University</h2>
                                            </div>
                                        </div>
                                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"><ShieldCheck size={18} /></span>
                                    </div>

                                    <div className="mt-5 rounded-2xl bg-gradient-to-br from-blue-950 via-blue-900 to-slate-800 p-5 text-white sm:p-6">
                                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">Everything connected</p>
                                        <p className="mt-2 max-w-sm text-xl font-bold leading-7 sm:text-2xl">The tools you need for your school day.</p>
                                        <div className="mt-5 flex flex-wrap gap-2">
                                            {['Attendance', 'Class calendar', 'School work'].map((item) => (
                                                <span key={item} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-50">{item}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-3">
                                        {[
                                            { label: 'Attendance', detail: 'Your check-in history', icon: CalendarCheck, tone: 'text-blue-800 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30' },
                                            { label: 'Timetable', detail: 'Classes, days & times', icon: CalendarDays, tone: 'text-indigo-800 bg-indigo-50 dark:text-indigo-300 dark:bg-indigo-900/30' },
                                            { label: 'Assignments', detail: 'Tasks & submissions', icon: FileUp, tone: 'text-violet-800 bg-violet-50 dark:text-violet-300 dark:bg-violet-900/30' },
                                            { label: 'Grades', detail: 'Your academic results', icon: ChartNoAxesColumn, tone: 'text-emerald-800 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-900/30' },
                                        ].map(({ label, detail, icon: Icon, tone }) => (
                                            <div key={label} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition duration-200 hover:border-blue-200 hover:bg-slate-50 motion-reduce:transition-none dark:border-slate-800 dark:hover:border-blue-900 dark:hover:bg-slate-800/60">
                                                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone}`}><Icon size={19} /></span>
                                                <span className="min-w-0">
                                                    <span className="block truncate text-sm font-bold text-slate-800 dark:text-slate-100">{label}</span>
                                                    <span className="mt-0.5 block truncate text-[11px] text-slate-500 dark:text-slate-400">{detail}</span>
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <Link href={primaryHref} className="mt-5 flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-sm font-semibold text-blue-950 transition duration-200 hover:border-blue-200 hover:bg-blue-50 motion-reduce:transition-none dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-200 dark:hover:bg-blue-950/50">
                                        <span className="inline-flex items-center gap-2"><UserRound size={17} />{isLoggedIn ? 'Return to your portal' : 'Access your student account'}</span>
                                        <ChevronRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <a href="#services" aria-label="Scroll to student services" className="mx-auto mb-7 hidden w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 transition hover:text-blue-800 motion-reduce:transition-none lg:flex dark:hover:text-blue-300">
                            Explore services <ArrowDown size={15} />
                        </a>
                    </section>

                    <section id="services" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-20 lg:py-24">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                            <div className="max-w-2xl">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-800 dark:text-blue-300">Student services</p>
                                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl dark:text-white">Your school essentials, organized.</h2>
                                <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">Find the key information and tools for your academic day in one convenient portal.</p>
                            </div>
                            <Link href={primaryHref} className="inline-flex w-fit items-center gap-2 text-sm font-bold text-blue-900 transition hover:gap-3 dark:text-blue-300">
                                {isLoggedIn ? 'Open dashboard' : 'Access your portal'} <ArrowRight size={17} />
                            </Link>
                        </div>

                        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {services.map(({ title, description, icon: Icon, color }, index) => (
                                <article key={title} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-900/5 motion-reduce:transition-none dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900 sm:p-6">
                                    <div className="flex items-center justify-between">
                                        <span className={`flex h-12 w-12 items-center justify-center rounded-xl transition duration-300 motion-reduce:transition-none ${colorStyles[color]}`}><Icon size={23} /></span>
                                        <span className="text-xs font-bold tracking-[0.16em] text-slate-300 dark:text-slate-600">0{index + 1}</span>
                                    </div>
                                    <h3 className="mt-5 text-lg font-bold text-slate-950 dark:text-white">{title}</h3>
                                    <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p>
                                    <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-900 dark:text-blue-300">
                                        Included in your portal
                                        <ChevronRight size={16} className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" />
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section id="about" className="scroll-mt-24 border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
                        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-8 sm:py-20 md:grid-cols-[0.9fr_1.1fr] md:items-center">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-800 dark:text-blue-300">About the portal</p>
                                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl dark:text-white">Less searching. More focus on school.</h2>
                            </div>
                            <div>
                                <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
                                    Access attendance, schedules, assignments, and academic services in one secure student portal.
                                </p>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"><ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-400" />Secure student access</span>
                                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"><CalendarDays size={16} className="text-blue-700 dark:text-blue-300" />School schedule & time</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="px-4 py-16 sm:px-8 sm:py-20">
                        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-slate-800 px-6 py-10 text-center text-white shadow-xl shadow-blue-950/15 sm:px-12 sm:py-14">
                            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full border border-white/10" />
                            <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full border border-white/10" />
                            <div className="relative mx-auto max-w-2xl">
                                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-blue-100"><GraduationCap size={26} /></span>
                                <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">Ready for your school day?</h2>
                                <p className="mt-4 text-sm leading-7 text-blue-100/80 sm:text-base">Sign in to see your student services, or create an account to get started.</p>
                                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                                    <Link href={primaryHref} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-950 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-50 motion-reduce:transition-none">
                                        {isLoggedIn ? 'Open dashboard' : 'Student login'} <ArrowRight size={17} />
                                    </Link>
                                    {!isLoggedIn && <Link href={route('register')} className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-white/10 motion-reduce:transition-none">Create an account</Link>}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
                    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                        <Link href="/" className="inline-flex w-fit items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                            <GraduationCap size={20} className="text-blue-900 dark:text-blue-300" />
                            Student Portal
                        </Link>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Central Philippines State University · Secure Student Access</p>
                        <div className="flex items-center gap-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                            {!isLoggedIn && <Link href={route('login')} className="transition hover:text-blue-900 dark:hover:text-blue-300">Log in</Link>}
                            {isLoggedIn ? <Link href={route('dashboard')} className="transition hover:text-blue-900 dark:hover:text-blue-300">Dashboard</Link> : <Link href={route('register')} className="transition hover:text-blue-900 dark:hover:text-blue-300">Register</Link>}
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
