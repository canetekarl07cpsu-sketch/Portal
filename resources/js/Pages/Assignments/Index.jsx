import StudentLayout from '@/Layouts/StudentLayout';
import PageHeading from '@/Components/PageHeading';
import { BookOpen, Info } from 'lucide-react';

export default function Index({ records = [] }) {
    return (
        <StudentLayout title="Assignments">
            <PageHeading eyebrow="Student services" title="Assignments" description="Keep track of assignments and upcoming school work." />
            <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-14">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"><BookOpen size={26} /></span>
                <h2 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">No assignments to display yet</h2>
                <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500 dark:text-slate-400">Assignment records have not been connected yet. Connect the page to your existing assignments backend to display actual tasks.</p>
            </section>
        </StudentLayout>
    );
}
