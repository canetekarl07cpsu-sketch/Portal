import { Link } from '@inertiajs/react';
import StudentLayout from '@/Layouts/StudentLayout';
import PageHeading from '@/Components/PageHeading';
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, MapPin } from 'lucide-react';

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function asLocalDate(value) {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
}

function asDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatTime(value) {
    if (!value) return '—';

    const [hours, minutes] = value.split(':').map(Number);
    return new Date(2000, 0, 1, hours, minutes).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
    });
}

export default function Index({ schedules = [], weekStart, today }) {
    const start = asLocalDate(weekStart);
    const days = weekdays.map((name, index) => {
        const date = new Date(start);
        date.setDate(start.getDate() + index);
        return {
            name,
            date,
            dateString: asDateString(date),
            items: schedules.filter((item) => item.day_of_week === name),
        };
    });
    const previousWeek = new Date(start);
    previousWeek.setDate(start.getDate() - 7);
    const nextWeek = new Date(start);
    nextWeek.setDate(start.getDate() + 7);
    const weekLabel = start.toLocaleDateString([], { month: 'long', year: 'numeric' });

    return (
        <StudentLayout title="Class Calendar">
            <PageHeading
                eyebrow="Student services"
                title="Class calendar"
                description="Your saved timetable, organized by day and class time."
            />

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 dark:border-slate-800 sm:px-6">
                    <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"><CalendarDays size={22} /></span>
                        <div>
                            <h2 className="font-bold text-slate-900 dark:text-white">Weekly timetable</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{weekLabel} · {schedules.length} class{schedules.length === 1 ? '' : 'es'}</p>
                        </div>
                    </div>
                    <nav aria-label="Calendar week" className="flex items-center gap-2">
                        <Link href={route('class-schedule.index', { week: asDateString(previousWeek) })} aria-label="Previous week" className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"><ArrowLeft size={18} /></Link>
                        <Link href={route('class-schedule.index')} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">This week</Link>
                        <Link href={route('class-schedule.index', { week: asDateString(nextWeek) })} aria-label="Next week" className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"><ArrowRight size={18} /></Link>
                    </nav>
                </div>

                <div className="grid divide-y divide-slate-100 dark:divide-slate-800 md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-7">
                    {days.map(({ name, date, dateString, items }) => {
                        const isToday = dateString === today;
                        return (
                            <section key={name} aria-label={`${name}, ${dateString}`} className={`min-h-48 p-4 ${isToday ? 'bg-blue-50/60 dark:bg-blue-950/20' : ''}`}>
                                <header className="mb-4 border-b border-slate-100 pb-3 dark:border-slate-800">
                                    <p className={`text-xs font-bold uppercase tracking-wide ${isToday ? 'text-blue-800 dark:text-blue-300' : 'text-slate-500 dark:text-slate-400'}`}>{name}{isToday ? ' · Today' : ''}</p>
                                    <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{date.toLocaleDateString([], { month: 'short', day: 'numeric' })}</p>
                                </header>
                                <div className="space-y-2">
                                    {items.map((item) => (
                                        <article key={item.id} className="rounded-xl border border-blue-100 bg-blue-50/70 p-3 dark:border-blue-900/60 dark:bg-blue-950/30">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{item.subject_name}</p>
                                            <p className="mt-1 text-xs font-medium text-blue-800 dark:text-blue-300">{item.subject_code}</p>
                                            <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300"><Clock3 size={14} />{formatTime(item.start_time)} – {formatTime(item.end_time)}</p>
                                            {item.room && <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400"><MapPin size={14} />{item.room}</p>}
                                            {item.instructor && <p className="mt-2 truncate text-xs text-slate-500 dark:text-slate-400">{item.instructor}</p>}
                                        </article>
                                    ))}
                                    {!items.length && <p className="py-3 text-center text-xs text-slate-400">No classes</p>}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </section>
        </StudentLayout>
    );
}
