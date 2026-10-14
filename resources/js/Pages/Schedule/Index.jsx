import StudentLayout from '@/Layouts/StudentLayout';
import PageHeading from '@/Components/PageHeading';
import { CalendarDays, Info } from 'lucide-react';

export default function Index({ records = [] }) {
    return (
        <StudentLayout title="Class Schedule">
            <PageHeading eyebrow="Student services" title="Class Schedule" description="Review your timetable and class details." />
            <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-14">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"><CalendarDays size={26} /></span>
                <h2 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">No class schedule to display yet</h2>
                <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500 dark:text-slate-400">No schedule records are connected yet. This page intentionally avoids displaying sample classes that may not match your school's data.</p>
            </section>
        </StudentLayout>
    );
}
