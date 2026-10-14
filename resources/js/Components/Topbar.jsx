import { Link, usePage, router } from '@inertiajs/react';
import { Menu, Bell, ChevronDown, LogOut } from 'lucide-react';

export default function Topbar({ onMenuClick }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 sm:px-8">
            <div className="flex items-center gap-3">
                <button onClick={onMenuClick} aria-label="Open navigation" className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 lg:hidden"><Menu size={20} /></button>
                <div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Student workspace</p>
                    <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white sm:text-base">School Portal</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <span className="hidden text-right sm:block">
                    <span className="block max-w-40 truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{user?.name ?? 'Student'}</span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">{user?.student_id ?? user?.email ?? 'Student account'}</span>
                </span>
                <Link href={route('profile.edit')} aria-label="Open profile" className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-950 ring-2 ring-white dark:bg-blue-900 dark:text-blue-100 dark:ring-slate-900">
                    {(user?.name ?? 'S').charAt(0).toUpperCase()}
                </Link>
                <button onClick={() => router.post(route('logout'))} aria-label="Log out" title="Log out" className="rounded-xl p-2.5 text-slate-500 transition hover:bg-rose-50 hover:text-rose-700 dark:text-slate-400 dark:hover:bg-rose-950/40"><LogOut size={19} /></button>
            </div>
        </header>
    );
}
