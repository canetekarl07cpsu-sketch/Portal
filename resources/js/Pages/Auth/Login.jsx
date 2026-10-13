
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    GraduationCap,
    IdCard,
    LockKeyhole,
    Eye,
    EyeOff,
    ArrowRight,
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

            <div className="min-h-screen bg-white text-black lg:grid lg:grid-cols-2">
                <section className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-green-800 p-12 text-white lg:flex xl:p-16">
                    <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
                    <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full border border-white/10" />

                    <Link href="/" className="relative z-10 flex items-center gap-3">
                        <div className="rounded-xl bg-white p-2.5 text-green-800">
                            <GraduationCap size={30} />
                        </div>
                        <span className="text-xl font-bold tracking-tight">
                            Student Portal
                        </span>
                    </Link>

                    <div className="relative z-10 max-w-xl py-12">
                        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-green-200">
                            Your academic journey
                        </p>

                        <h1 className="text-5xl font-bold leading-tight xl:text-6xl">
                            Your education,
                            <span className="mt-2 block text-green-200">
                                all in one place.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-md text-lg leading-8 text-green-100">
                            Access your grades, class schedules, enrollment,
                            activities, and assignments through one convenient
                            student portal.
                        </p>

                        <div className="mt-10 flex items-center gap-3 text-sm text-green-100">
                            <span className="h-2 w-2 rounded-full bg-green-300" />
                            Your student account, your academic information.
                        </div>
                    </div>

                    <p className="relative z-10 text-sm text-green-200">
                        Student Portal · Academic Services
                    </p>
                </section>

                <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-10 lg:px-12">
                    <div className="w-full max-w-md">
                        <Link
                            href="/"
                            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-green-800 lg:hidden"
                        >
                            <GraduationCap size={24} />
                            Student Portal
                        </Link>

                        <div className="mb-8">
                            <p className="text-sm font-semibold uppercase tracking-widest text-green-700">
                                Welcome back
                            </p>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                                Sign in to your account
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Enter your student ID number and password to
                                continue.
                            </p>
                        </div>

                        {status && (
                            <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="student_id"
                                    className="mb-2 block text-sm font-semibold text-gray-800"
                                >
                                    Student ID Number
                                </label>

                                <div className="relative">
                                    <IdCard
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        id="student_id"
                                        type="text"
                                        name="student_id"
                                        value={data.student_id}
                                        onChange={(e) =>
                                            setData('student_id', e.target.value)
                                        }
                                        autoComplete="username"
                                        autoFocus
                                        required
                                        placeholder="Enter your student ID"
                                        className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-12 pr-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
                                    />
                                </div>

                                {errors.student_id && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.student_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between gap-3">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Password
                                    </label>

                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-xs font-semibold text-green-800 hover:text-green-950"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>

                                <div className="relative">
                                    <LockKeyhole
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        autoComplete="current-password"
                                        required
                                        placeholder="Enter your password"
                                        className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-12 pr-12 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        aria-label={
                                            showPassword
                                                ? 'Hide password'
                                                : 'Show password'
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-800"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={19} />
                                        ) : (
                                            <Eye size={19} />
                                        )}
                                    </button>
                                </div>

                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked)
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-green-700 focus:ring-green-700"
                                />
                                Remember me
                            </label>

                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-800 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {processing ? 'Signing in...' : 'Sign in'}
                                {!processing && <ArrowRight size={18} />}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-gray-600">
                            Don't have a student account?{' '}
                            <Link
                                href={route('register')}
                                className="font-semibold text-green-800 hover:text-green-950"
                            >
                                Register here
                            </Link>
                        </p>

                        <p className="mt-10 text-center text-xs text-gray-400">
                            Student Portal · Secure Student Access
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}
