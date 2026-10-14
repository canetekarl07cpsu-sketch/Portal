import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { ShieldAlert, Trash2 } from 'lucide-react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    const openModal = () => {
        clearErrors();
        reset();
        setConfirmingUserDeletion(true);
    };

    return (
        <section className={`space-y-5 ${className}`}>
            <header className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300"><ShieldAlert size={20} /></span>
                <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        Delete account
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Permanently remove your account and associated data. This action cannot be undone.
                    </p>
                </div>
            </header>

            <div className="rounded-xl border border-rose-100 bg-rose-50/70 p-4 text-sm leading-6 text-rose-800 dark:border-rose-950 dark:bg-rose-950/30 dark:text-rose-200">
                You will be signed out immediately after confirming your password.
            </div>

            <DangerButton type="button" onClick={openModal} className="transition duration-200 hover:-translate-y-0.5 motion-reduce:transition-none">
                <Trash2 size={17} />
                Delete Account
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-none transition duration-200 focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-500/10 motion-reduce:transition-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-rose-400 dark:focus:bg-slate-950 sm:w-3/4"
                            isFocused
                            required
                            placeholder="Password"
                        />

                        <InputError
                            role="alert"
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <SecondaryButton type="button" onClick={closeModal} disabled={processing}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton type="submit" className="transition duration-200 hover:-translate-y-0.5 motion-reduce:transition-none" disabled={processing}>
                            <Trash2 size={17} />
                            {processing ? 'Deleting...' : 'Delete account'}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
