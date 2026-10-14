import { usePage } from '@inertiajs/react';
import { BadgeCheck, Mail, ShieldCheck, UserRound } from 'lucide-react';
import PageHeading from '@/Components/PageHeading';
import StudentLayout from '@/Layouts/StudentLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

function getInitials(name = 'Student') {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();
}

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const user = auth?.user ?? {};
    const verified = Boolean(user.email_verified_at);

    return (
        <StudentLayout title="My Profile">
            <PageHeading
                eyebrow="Account settings"
                title="My profile"
                description="Manage your student information and keep your account secure."
            />

            <section className="mb-7 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-slate-800 text-white shadow-lg shadow-blue-950/10 transition-shadow duration-300 hover:shadow-xl hover:shadow-blue-950/15 motion-reduce:transition-none">
                <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-xl font-bold text-white shadow-inner sm:h-20 sm:w-20 sm:text-2xl">
                        {getInitials(user.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-blue-200">Student account</p>
                        <h2 className="mt-1 truncate text-2xl font-bold tracking-tight sm:text-3xl">{user.name ?? 'Student'}</h2>
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-blue-100/80">
                            <span className="inline-flex items-center gap-2"><Mail size={16} />{user.email ?? 'No email on file'}</span>
                            {user.student_id && <span className="inline-flex items-center gap-2"><UserRound size={16} />Student ID: {user.student_id}</span>}
                        </div>
                    </div>
                    <div className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ${verified ? 'bg-emerald-400/15 text-emerald-100' : 'bg-amber-300/15 text-amber-100'}`}>
                        {verified ? <BadgeCheck size={17} /> : <ShieldCheck size={17} />}
                        {verified ? 'Email verified' : 'Email not verified'}
                    </div>
                </div>
            </section>

            {status === 'verification-link-sent' && (
                <div role="status" className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
                    A new verification link has been sent to your email address.
                </div>
            )}

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-6">
                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none dark:border-slate-800 dark:bg-slate-900 sm:p-7">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </section>

                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none dark:border-slate-800 dark:bg-slate-900 sm:p-7">
                        <UpdatePasswordForm />
                    </section>
                </div>

                <section className="h-fit rounded-2xl border border-rose-200 bg-white p-5 shadow-sm transition duration-300 hover:shadow-md motion-reduce:transition-none dark:border-rose-950 dark:bg-slate-900 sm:p-7">
                    <DeleteUserForm />
                </section>
            </div>
        </StudentLayout>
    );
}
