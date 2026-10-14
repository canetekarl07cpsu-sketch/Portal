import { Link, usePage } from '@inertiajs/react';
import StudentLayout from '@/Layouts/StudentLayout';
import PageHeading from '@/Components/PageHeading';
import StatCard from '@/Components/StatCard';
import StatusBadge from '@/Components/StatusBadge';
import { CalendarCheck, Clock3, CircleX, ChartNoAxesColumn, ArrowUpRight, CalendarDays, BookOpen, ClipboardList } from 'lucide-react';

export default function Dashboard({ summary = {}, recentAttendance = [], upcomingClasses = [] }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const firstName = (user?.name ?? 'Student').split(' ')[0];

    const shortcuts = [
        { label: 'Attendance history', description: 'Review your recorded school days', href: route('attendance.index'), icon: CalendarCheck },
        { label: 'Class schedule', description: 'View your classes and timetable', href: route('class-schedule.index'), icon: CalendarDays },
        { label: 'Assignments', description: 'Keep track of your school work', href: route('assignments.index'), icon: ClipboardList },
        { label: 'Grades', description: 'Check available academic results', href: route('grades.index'), icon: BookOpen },
    ];

    return (
        <StudentLayout title="Dashboard">
            <PageHeading eyebrow="Student overview" title={`Welcome back, ${firstName}`} description="Here is a quick overview of your student portal. Attendance figures appear when your records are available." />
            <section className="mb-8 rounded-3xl bg-gradient from-blue-950 via-blue-900 to-slate-800 p-6 text-white shadow-lg shadow-blue-950/10 sm:p-8">
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                    <div>
                        <p className="text-sm font-medium text-blue-200">Your student account</p>
                        <h2 className="mt-2 text-2xl font-bold">{user?.name ?? 'Student'}</h2>
                        <p className="mt-2 text-sm text-blue-100/75">{user?.student_id ? `Student ID: ${user.student_id}` : (user?.email ?? 'Keep your student information up to date.')}</p>
                    </div>
                    <Link href={route('attendance.index')} className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-950 transition hover:bg-blue-50">View attendance <ArrowUpRight size={17} /></Link>
                </div>
            </section>

            <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Present this month" value={summary.present ?? '—'} helper="Based on recorded attendance" icon={CalendarCheck} tone="green" />
                <StatCard label="Late this month" value={summary.late ?? '—'} helper="Based on recorded attendance" icon={Clock3} tone="amber" />
                <StatCard label="Absent this month" value={summary.absent ?? '—'} helper="Based on recorded attendance" icon={CircleX} tone="red" />
                <StatCard label="Attendance rate" value={summary.rate == null ? '—' : `${summary.rate}%`} helper="Present and late / recorded days" icon={ChartNoAxesColumn} tone="navy" />
            </div>

            <div className="mb-6 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 dark:border-slate-800 sm:px-6">
                        <div><h2 className="font-bold text-slate-900 dark:text-white">Recent attendance</h2><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Your latest recorded attendance</p></div>
                        <Link href={route('attendance.index')} className="text-sm font-semibold text-blue-800 hover:underline dark:text-blue-300">View all</Link>
                    </div>
                    {recentAttendance.length ? <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800/60"><tr><th className="px-6 py-3">Date</th><th className="px-6 py-3">Check in</th><th className="px-6 py-3">Status</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-800">{recentAttendance.map((row) => <tr key={row.id}><td className="px-6 py-4 text-slate-700 dark:text-slate-200">{row.date}</td><td className="px-6 py-4 text-slate-500">{row.check_in_at ?? '—'}</td><td className="px-6 py-4"><StatusBadge status={row.status} /></td></tr>)}</tbody></table></div> : <div className="px-6 py-12 text-center"><CalendarCheck className="mx-auto text-slate-300 dark:text-slate-600" size={32} /><p className="mt-3 font-semibold text-slate-700 dark:text-slate-200">No attendance records yet</p><p className="mt-1 text-sm text-slate-500">Your attendance entries will appear here once recorded.</p></div>}
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                    <h2 className="font-bold text-slate-900 dark:text-white">Quick access</h2>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Jump to a student service</p>
                    <div className="mt-5 space-y-2">{shortcuts.map(({ label, description, href, icon: Icon }) => <a key={label} href={href} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-blue-200 hover:bg-blue-50/70 dark:border-slate-800 dark:hover:border-blue-900 dark:hover:bg-blue-950/30"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"><Icon size={19} /></span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</span><span className="mt-0.5 block text-xs text-slate-500">{description}</span></span><ArrowUpRight size={16} className="text-slate-400" /></a>)}</div>
                </section>
            </div>
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                    <div><h2 className="font-bold text-slate-900 dark:text-white">Today’s classes</h2><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Your timetable for today</p></div>
                    <Link href={route('class-schedule.index')} className="text-sm font-semibold text-blue-800 hover:underline dark:text-blue-300">Open calendar</Link>
                </div>
                {upcomingClasses.length ? <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">{upcomingClasses.map((item) => <div key={item.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-3"><span className="min-w-28 text-sm font-semibold text-blue-800 dark:text-blue-300">{item.start_time} – {item.end_time}</span><span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.subject_name}</span><span className="text-sm text-slate-500">{item.room ?? 'Room not assigned'}</span></div>)}</div> : <p className="mt-4 rounded-xl bg-slate-50 px-4 py-5 text-center text-sm text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">No classes are scheduled for today.</p>}
            </section>
        </StudentLayout>
    );
}
