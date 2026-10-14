import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    ArrowRight,
    BadgeCheck,
    Eye,
    EyeOff,
    GraduationCap,
    IdCard,
    LockKeyhole,
    Mail,
    ShieldCheck,
    UserRound,
} from 'lucide-react';

const inputClassName = 'w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 motion-reduce:transition-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950';

function FieldError({ id, message }) {
    return message ? (
        <p id={id} role="alert" className="mt-2 text-sm font-medium text-rose-600 dark:text-rose-400">
            {message}
        </p>
    ) : null;
}

function RegistrationField({ id, label, icon: Icon, error, children }) {
    return (
        <div>
            <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                {label}
            </label>
            <div className="relative">
                <Icon size={19} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                {children}
            </div>
            <FieldError id={`${id}-error`} message={error} />
        </div>
    );
}

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        student_id: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Student Registration" />

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
                        <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-blue-200">Start your school journey</p>
                        <h1 className="text-5xl font-bold leading-tight tracking-tight xl:text-6xl">
                            One account,
                            <span className="mt-2 block text-blue-200">your school essentials.</span>
                        </h1>
                        <p className="mt-6 max-w-lg text-base leading-7 text-blue-100/80 xl:text-lg xl:leading-8">
                            Create your student account to access attendance, class times, assignments, grades, and more.
                        </p>

                        <div className="mt-9 space-y-3">
                            {[
                                'One place for your student services',
                                'Stay up to date with your class calendar',
                                'Secure access to your school information',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-medium text-blue-50 backdrop-blur-sm">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200"><BadgeCheck size={15} /></span>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="relative z-10 text-xs text-blue-200/70">Central Philippines State University · Academic Services</p>
                </section>

                <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-8 lg:px-12">
                    <div className="w-full max-w-xl">
                        <Link href="/" className="mb-6 inline-flex items-center gap-3 text-sm font-bold text-blue-950 transition hover:text-blue-700 motion-reduce:transition-none dark:text-white dark:hover:text-blue-300 lg:hidden">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-white dark:bg-blue-700"><GraduationCap size={23} /></span>
                            Student Portal
                        </Link>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 transition-shadow duration-300 hover:shadow-2xl hover:shadow-slate-900/10 motion-reduce:transition-none dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                            <div className="mb-6">
                                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"><UserRound size={22} /></span>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-800 dark:text-blue-300">Student registration</p>
                                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">Create your account</h2>
                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Enter your student details to get started.</p>
                            </div>

                            <form onSubmit={submit} className="space-y-4">
                                <RegistrationField id="name" label="Full name" icon={UserRound} error={errors.name}>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        autoComplete="name"
                                        required
                                        aria-invalid={Boolean(errors.name)}
                                        aria-describedby={errors.name ? 'name-error' : undefined}
                                        placeholder="Enter your full name"
                                        className={inputClassName}
                                    />
                                </RegistrationField>

                                <RegistrationField id="student_id" label="Student ID number" icon={IdCard} error={errors.student_id}>
                                    <input
                                        id="student_id"
                                        type="text"
                                        value={data.student_id}
                                        onChange={(e) => setData('student_id', e.target.value)}
                                        autoComplete="username"
                                        required
                                        aria-invalid={Boolean(errors.student_id)}
                                        aria-describedby={errors.student_id ? 'student_id-error' : undefined}
                                        placeholder="Enter your student ID"
                                        className={inputClassName}
                                    />
                                </RegistrationField>

                                <RegistrationField id="email" label="Email address" icon={Mail} error={errors.email}>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        autoComplete="email"
                                        required
                                        aria-invalid={Boolean(errors.email)}
                                        aria-describedby={errors.email ? 'email-error' : undefined}
                                        placeholder="Enter your email address"
                                        className={inputClassName}
                                    />
                                </RegistrationField>

                                <RegistrationField id="password" label="Password" icon={LockKeyhole} error={errors.password}>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        autoComplete="new-password"
                                        required
                                        aria-invalid={Boolean(errors.password)}
                                        aria-describedby={errors.password ? 'password-error' : undefined}
                                        placeholder="Create a password"
                                        className={`${inputClassName} pr-12`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((visible) => !visible)}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition duration-200 hover:bg-slate-200/70 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 motion-reduce:transition-none dark:hover:bg-slate-800 dark:hover:text-blue-300"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </RegistrationField>

                                <RegistrationField id="password_confirmation" label="Confirm password" icon={LockKeyhole} error={errors.password_confirmation}>
                                    <input
                                        id="password_confirmation"
                                        type={showPasswordConfirmation ? 'text' : 'password'}
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        autoComplete="new-password"
                                        required
                                        aria-invalid={Boolean(errors.password_confirmation)}
                                        aria-describedby={errors.password_confirmation ? 'password_confirmation-error' : undefined}
                                        placeholder="Re-enter your password"
                                        className={`${inputClassName} pr-12`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswordConfirmation((visible) => !visible)}
                                        aria-label={showPasswordConfirmation ? 'Hide confirmation password' : 'Show confirmation password'}
                                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition duration-200 hover:bg-slate-200/70 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 motion-reduce:transition-none dark:hover:bg-slate-800 dark:hover:text-blue-300"
                                    >
                                        {showPasswordConfirmation ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </RegistrationField>

                                <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/60">
                                    <ShieldCheck size={18} className="mt-0.5 shrink-0 text-blue-800 dark:text-blue-300" />
                                    <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">Use an email address you can access and keep your password private.</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-900 px-5 py-3.5 text-sm font-semibold text-white shadow-sm shadow-blue-950/15 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-950 hover:shadow-md disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none dark:bg-blue-700 dark:hover:bg-blue-600"
                                >
                                    {processing ? 'Creating account...' : 'Create student account'}
                                    {!processing && <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" />}
                                </button>
                            </form>

                            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                                Already have an account?{' '}
                                <Link href={route('login')} className="font-semibold text-blue-800 transition hover:text-blue-950 hover:underline motion-reduce:transition-none dark:text-blue-300 dark:hover:text-blue-200">
                                    Sign in
                                </Link>
                            </p>
                        </div>

                        <p className="mt-5 text-center text-xs text-slate-400">Student Portal · Secure Student Access</p>
                    </div>
                </section>
            </main>
        </>
    );
}
