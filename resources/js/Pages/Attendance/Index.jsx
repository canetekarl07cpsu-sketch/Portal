import { useForm, usePage } from '@inertiajs/react';
import StudentLayout from '@/Layouts/StudentLayout';
import PageHeading from '@/Components/PageHeading';
import StatCard from '@/Components/StatCard';
import StatusBadge from '@/Components/StatusBadge';
import PrimaryButton from '@/Components/PrimaryButton';
import { CalendarCheck, Clock3, CircleX, ChartNoAxesColumn, LogIn, Info } from 'lucide-react';

export default function AttendanceIndex({ records = [], summary = {}, todayRecord = null }) {
    const { post, processing, errors, recentlySuccessful } = useForm({});
    const { flash } = usePage().props;

    return (
        <StudentLayout title="Attendance">
            <PageHeading eyebrow="Student services" title="Attendance history" description="Review your recorded attendance and check-in details." action={
                !todayRecord ? <PrimaryButton onClick={() => post(route('attendance.check-in'))} disabled={processing}><LogIn size={17} />{processing ? 'Recording...' : 'Check in today'}</PrimaryButton>
                    : !todayRecord.check_out_at ? <PrimaryButton onClick={() => post(route('attendance.check-out'))} disabled={processing}><Clock3 size={17} />{processing ? 'Recording...' : 'Check out today'}</PrimaryButton>
                        : <span className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"><CalendarCheck size={17} /> Attendance complete</span>
            } />
            {(flash?.status || recentlySuccessful) && <div role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{flash?.status ?? 'Attendance updated.'}</div>}
            {errors.attendance && <div role="alert" className="mb-5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{errors.attendance}</div>}
            <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Present this month" value={summary.present ?? '—'} icon={CalendarCheck} tone="green" />
                <StatCard label="Late this month" value={summary.late ?? '—'} icon={Clock3} tone="amber" />
                <StatCard label="Absent this month" value={summary.absent ?? '—'} icon={CircleX} tone="red" />
                <StatCard label="Attendance rate" value={summary.rate == null ? '—' : `${summary.rate}%`} icon={ChartNoAxesColumn} tone="navy" />
            </div>
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="border-b border-slate-100 px-5 py-5 dark:border-slate-800 sm:px-6"><h2 className="font-bold text-slate-900 dark:text-white">Attendance records</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Showing the latest 30 entries</p></div>
                {records.length ? <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800/60"><tr><th className="px-6 py-4">Date</th><th className="px-6 py-4">Check-in</th><th className="px-6 py-4">Check-out</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Notes</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-800">{records.map((record) => <tr key={record.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30"><td className="whitespace-nowrap px-6 py-4 font-medium text-slate-800 dark:text-slate-200">{record.date}</td><td className="px-6 py-4 text-slate-600 dark:text-slate-300">{record.check_in_at ?? '—'}</td><td className="px-6 py-4 text-slate-600 dark:text-slate-300">{record.check_out_at ?? '—'}</td><td className="px-6 py-4"><StatusBadge status={record.status} /></td><td className="max-w-56 px-6 py-4 text-slate-500">{record.notes ?? '—'}</td></tr>)}</tbody></table></div> : <div className="px-6 py-14 text-center"><CalendarCheck size={34} className="mx-auto text-slate-300 dark:text-slate-600" /><p className="mt-3 font-semibold text-slate-800 dark:text-white">No records available</p><p className="mt-1 text-sm text-slate-500">Attendance will appear here when it has been recorded.</p></div>}
            </section>
            <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500"><Info size={15} className="mt-0.5 shrink-0" />Check-in currently records the authenticated student as present. Confirm your school’s attendance rules before using this in production.</p>
        </StudentLayout>
    );
}
