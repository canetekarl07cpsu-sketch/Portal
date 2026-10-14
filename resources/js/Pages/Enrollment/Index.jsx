import StudentLayout from '@/Layouts/StudentLayout';
import PageHeading from '@/Components/PageHeading';
import { ClipboardList, Info } from 'lucide-react';

export default function Index({ records = [] }) {
    return (
        <StudentLayout title="Enrollment">
            <PageHeading eyebrow="Student services" title="Enrollment" description="Review enrollment information and available updates." />
            <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-14">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"><ClipboardList size={26} /></span>
                <h2 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">No enrollment to display yet</h2>
                <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500 dark:text-slate-400">Enrollment data has not been connected yet. Connect your existing enrollment backend to display actual student information.</p>
            </section>
        </StudentLayout>
    );
}
