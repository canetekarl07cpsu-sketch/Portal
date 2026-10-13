
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    GraduationCap,
    UserRound,
    IdCard,
    Mail,
    LockKeyhole,
    Eye,
    EyeOff,
    ArrowRight,
} from 'lucide-react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);

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
                            Start your journey
                        </p>

                        <h1 className="text-5xl font-bold leading-tight xl:text-6xl">
                            One portal.
                            <span className="mt-2 block text-green-200">
                                Your academic life.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-md text-lg leading-8 text-green-100">
                            Create your student account to access grades,
                            enrollment, class schedules, activities, and
                            assignments in one place.
                        </p>

                        <div className="mt-10 space-y-4 text-sm text-green-100">
                            <p>Secure access to your student account</p>
                            <p>Academic information in one convenient place</p>
                            <p>Stay connected with your class activities</p>
                        </div>
                    </div>

                    <p className="relative z-10 text-sm text-green-200">
                        Student Portal · Academic Services
                    </p>
                </section>

                <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10 lg:px-12">
                    <div className="w-full max-w-md">
                        <Link
                            href="/"
                            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-green-800 lg:hidden"
                        >
                            <GraduationCap size={24} />
                            Student Portal
                        </Link>

                        <div className="mb-7">
                            <p className="text-sm font-semibold uppercase tracking-widest text-green-700">
                                Student registration
                            </p>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                                Create your account
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Enter your details to set up your student
                                portal account.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-semibold text-gray-800"
                                >
                                    Full Name
                                </label>

                                <div className="relative">
                                    <UserRound
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        autoComplete="name"
                                        required
                                        placeholder="Enter your full name"
                                        className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
                                    />
                                </div>

                                {errors.name && (
                                    <p className="mt-1.5 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

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
                                        value={data.student_id}
                                        onChange={(e) =>
                                            setData(
                                                'student_id',
                                                e.target.value,
                                            )
                                        }
                                        autoComplete="username"
                                        required
                                        placeholder="Enter your student ID"
                                        className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
                                    />
                                </div>

                                {errors.student_id && (
                                    <p className="mt-1.5 text-sm text-red-600">
                                        {errors.student_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-semibold text-gray-800"
                                >
                                    Email Address
                                </label>

                                <div className="relative">
                                    <Mail
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        autoComplete="email"
                                        required
                                        placeholder="Enter your email address"
                                        className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
                                    />
                                </div>

                                {errors.email && (
                                    <p className="mt-1.5 text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-semibold text-gray-800"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <LockKeyhole
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        autoComplete="new-password"
                                        required
                                        placeholder="Create a password"
                                        className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-12 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
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
                                    <p className="mt-1.5 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="password_confirmation"
                                    className="mb-2 block text-sm font-semibold text-gray-800"
                                >
                                    Confirm Password
                                </label>

                                <div className="relative">
                                    <LockKeyhole
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        id="password_confirmation"
                                        type={
                                            showPasswordConfirmation
                                                ? 'text'
                                                : 'password'
                                        }
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                'password_confirmation',
                                                e.target.value,
                                            )
                                        }
                                        autoComplete="new-password"
                                        required
                                        placeholder="Re-enter your password"
                                        className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-12 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPasswordConfirmation(
                                                !showPasswordConfirmation,
                                            )
                                        }
                                        aria-label={
                                            showPasswordConfirmation
                                                ? 'Hide confirmation password'
                                                : 'Show confirmation password'
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-800"
                                    >
                                        {showPasswordConfirmation ? (
                                            <EyeOff size={19} />
                                        ) : (
                                            <Eye size={19} />
                                        )}
                                    </button>
                                </div>

                                {errors.password_confirmation && (
                                    <p className="mt-1.5 text-sm text-red-600">
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-800 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {processing
                                    ? 'Creating account...'
                                    : 'Create Account'}
                                {!processing && <ArrowRight size={18} />}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link
                                href={route('login')}
                                className="font-semibold text-green-800 hover:text-green-950"
                            >
                                Sign in
                            </Link>
                        </p>

                        <p className="mt-8 text-center text-xs text-gray-400">
                            Student Portal · Secure Student Access
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}
