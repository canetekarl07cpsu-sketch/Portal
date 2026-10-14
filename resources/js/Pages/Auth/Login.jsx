import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    ArrowRight,
    Eye,
    EyeOff,
    GraduationCap,
    IdCard,
    LockKeyhole,
    ShieldCheck,
} from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        student_id: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Student Login" />

            <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white lg:grid lg:grid-cols-[0.95fr_1.05fr]">
                <section className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 p-10 text-white lg:flex xl:p-16">
                    <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 h-96 w-96 rounded-full border border-white/10" />
                    <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full border border-white/10" />
                    <div aria-hidden="true" className="pointer-events-none absolute right-16 top-1/3 h-40 w-40 rounded-full bg-blue-400/10 blur-3xl" />

                    <Link href="/" className="relative z-10 inline-flex w-fit items-center gap-3 rounded-xl transition duration-200 hover:opacity-80 motion-reduce:transition-none">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-950 shadow-lg shadow-blue-950/20"><GraduationCap size={28} /></span>
                        <span>
                            <span className="block text-lg font-bold tracking-tight">Student Portal</span>
                            <span className="mt-0.5 block text-xs font-medium text-blue-200">Central Philippines State University</span>
                        </span>
                    </Link>

                    <div className="relative z-10 max-w-xl py-12">
                        <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-blue-200">Your academic workspace</p>
                        <h1 className="text-5xl font-bold leading-tight tracking-tight xl:text-6xl">
                            Your school day,
                            <span className="mt-2 block text-blue-200">all in one place.</span>
                        </h1>
                        <p className="mt-6 max-w-lg text-base leading-7 text-blue-100/80 xl:text-lg xl:leading-8">
                            Sign in to check attendance, view your weekly class calendar, and stay on top of your school work.
                        </p>

                        <div className="mt-9 grid gap-3 sm:grid-cols-2">
                            {['Attendance & check-in', 'Class times & calendar', 'Assignments & activities', 'Grades & enrollment'].map((item) => (
                                <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-medium text-blue-50 backdrop-blur-sm">
                                    <span className="h-2 w-2 rounded-full bg-sky-300 shadow-[0_0_12px_rgba(125,211,252,0.8)]" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="relative z-10 text-xs text-blue-200/70">Student Portal · Secure Student Access</p>
                </section>

                <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-8 lg:px-12">
                    <div className="w-full max-w-md">
                        <Link href="/" className="mb-7 inline-flex items-center gap-3 text-sm font-bold text-blue-950 transition hover:text-blue-700 motion-reduce:transition-none dark:text-white dark:hover:text-blue-300 lg:hidden">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-white dark:bg-blue-700"><GraduationCap size={23} /></span>
                            <span>Student Portal</span>
                        </Link>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 transition-shadow duration-300 hover:shadow-2xl hover:shadow-slate-900/10 motion-reduce:transition-none dark:border-slate-800 dark:bg-slate-900 sm:p-9">
                            <div className="mb-7">
                                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"><GraduationCap size={25} /></span>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-800 dark:text-blue-300">Welcome back</p>
                                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">Sign in to your account</h2>
                                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">Use your student ID and password to continue to your school portal.</p>
                            </div>

                            {status && (
                                <div role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-5">
                                <div>
                                    <label htmlFor="student_id" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Student ID number</label>
                                    <div className="relative">
                                        <IdCard size={19} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            id="student_id"
                                            type="text"
                                            name="student_id"
                                            value={data.student_id}
                                            onChange={(e) => setData('student_id', e.target.value)}
                                            autoComplete="username"
                                            autoFocus
                                            required
                                            aria-invalid={Boolean(errors.student_id)}
                                            aria-describedby={errors.student_id ? 'student-id-error' : undefined}
                                            placeholder="Enter your student ID"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 motion-reduce:transition-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                                        />
                                    </div>
                                    {errors.student_id && <p id="student-id-error" role="alert" className="mt-2 text-sm font-medium text-rose-600 dark:text-rose-400">{errors.student_id}</p>}
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between gap-3">
                                        <label htmlFor="password" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                                        {canResetPassword && (
                                            <Link href={route('password.request')} className="text-xs font-semibold text-blue-800 transition hover:text-blue-950 hover:underline dark:text-blue-300 dark:hover:text-blue-200 motion-reduce:transition-none">
                                                Forgot password?
                                            </Link>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <LockKeyhole size={19} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            autoComplete="current-password"
                                            required
                                            aria-invalid={Boolean(errors.password)}
                                            aria-describedby={errors.password ? 'password-error' : undefined}
                                            placeholder="Enter your password"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 text-sm text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 motion-reduce:transition-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((visible) => !visible)}
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition duration-200 hover:bg-slate-200/70 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 motion-reduce:transition-none dark:hover:bg-slate-800 dark:hover:text-blue-300"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    {errors.password && <p id="password-error" role="alert" className="mt-2 text-sm font-medium text-rose-600 dark:text-rose-400">{errors.password}</p>}
                                </div>

                                <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="h-4 w-4 rounded border-slate-300 text-blue-800 transition focus:ring-blue-600 dark:border-slate-600 dark:bg-slate-950"
                                    />
                                    Remember me
                                </label>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-900 px-5 py-3.5 text-sm font-semibold text-white shadow-sm shadow-blue-950/15 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-950 hover:shadow-md disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none dark:bg-blue-700 dark:hover:bg-blue-600"
                                >
                                    {processing ? 'Signing in...' : 'Sign in'}
                                    {!processing && <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" />}
                                </button>
                            </form>

                            <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                                <ShieldCheck size={18} className="mt-0.5 shrink-0 text-blue-800 dark:text-blue-300" />
                                <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">Your school information is available only after securely signing in to your student account.</p>
                            </div>

                            <p className="mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
                                Don’t have a student account?{' '}
                                <Link href={route('register')} className="font-semibold text-blue-800 transition hover:text-blue-950 hover:underline dark:text-blue-300 dark:hover:text-blue-200 motion-reduce:transition-none">
                                    Register here
                                </Link>
                            </p>
                        </div>

                        <p className="mt-6 text-center text-xs text-slate-400">Student Portal · Secure Student Access</p>
                    </div>
                </section>
            </main>
        </>
    );
}
