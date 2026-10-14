import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { KeyRound, Save } from 'lucide-react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header className="mb-6 flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"><KeyRound size={20} /></span>
                <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Password & security</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Choose a strong password to help keep your student account secure.
                    </p>
                </div>
            </header>

            <form onSubmit={updatePassword} className="space-y-5">
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Current password"
                        className="font-semibold text-slate-700 dark:text-slate-300"
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        type="password"
                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-none transition duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 motion-reduce:transition-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                        autoComplete="current-password"
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="New password" className="font-semibold text-slate-700 dark:text-slate-300" />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-none transition duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 motion-reduce:transition-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm new password"
                        className="font-semibold text-slate-700 dark:text-slate-300"
                    />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        type="password"
                        className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-none transition duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 motion-reduce:transition-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                    <PrimaryButton disabled={processing} className="min-w-32 py-3 transition duration-200 hover:-translate-y-0.5 disabled:transform-none motion-reduce:transition-none">
                        <Save size={17} />
                        {processing ? 'Updating...' : 'Update password'}
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
                            Password updated successfully.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
