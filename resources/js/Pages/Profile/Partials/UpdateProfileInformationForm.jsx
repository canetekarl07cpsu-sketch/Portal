import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Save, UserRound } from 'lucide-react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'), { preserveScroll: true });
    };

    return (
        <section className={className}>
            <header className="mb-6 flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"><UserRound size={21} /></span>
                <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Personal information</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Update the name and email address associated with your account.
                    </p>
                </div>
            </header>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="name" value="Full name" className="font-semibold text-slate-700 dark:text-slate-300" />

                    <TextInput
                        id="name"
                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-none transition duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 motion-reduce:transition-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email address" className="font-semibold text-slate-700 dark:text-slate-300" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-none transition duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 motion-reduce:transition-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm font-semibold text-blue-800 underline decoration-blue-300 underline-offset-4 transition hover:text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 motion-reduce:transition-none dark:text-blue-300 dark:hover:text-blue-200 dark:focus:ring-offset-slate-900"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                    </div>
                )}

                <div className="flex flex-wrap items-center gap-4 pt-1">
                    <PrimaryButton disabled={processing} className="min-w-32 py-3 transition duration-200 hover:-translate-y-0.5 disabled:transform-none motion-reduce:transition-none">
                        <Save size={17} />
                        {processing ? 'Saving...' : 'Save changes'}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition duration-200 ease-out motion-reduce:transition-none"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition duration-150 ease-in motion-reduce:transition-none"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <p role="status" className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                            Changes saved successfully.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
