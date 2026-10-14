import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard, CalendarCheck, GraduationCap, CalendarDays,
    ClipboardList, BookOpen, UserRound, X, School,
} from 'lucide-react';

const links = [
    { label: 'Dashboard', href: 'dashboard', icon: LayoutDashboard, routeName: 'dashboard' },
    { label: 'Attendance', href: 'attendance.index', icon: CalendarCheck, routeName: 'attendance.index' },
    { label: 'Grades', href: 'grades.index', icon: GraduationCap, routeName: 'grades.index' },
    { label: 'Class Schedule', href: 'class-schedule.index', icon: CalendarDays, routeName: 'class-schedule.index' },
    { label: 'Enrollment', href: 'enrollment.index', icon: ClipboardList, routeName: 'enrollment.index' },
    { label: 'Assignments', href: 'assignments.index', icon: BookOpen, routeName: 'assignments.index' },
    { label: 'Profile', href: 'profile.edit', icon: UserRound, routeName: 'profile.edit' },
];

export default function Sidebar({ open = false, onClose = () => {} }) {
    const { url } = usePage();

    const nav = (
        <>
            <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-950"><School size={25} /></span>
                <div>
                    <p className="font-bold tracking-tight text-white">Student Portal</p>
                    <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.17em] text-blue-200">School Services</p>
                </div>
                <button onClick={onClose} className="ml-auto rounded-lg p-2 text-blue-100 hover:bg-white/10 lg:hidden" aria-label="Close navigation"><X size={19} /></button>
            </div>
            <div className="px-4 pt-7">
                <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300/70">Main menu</p>
                <nav className="space-y-1">
                    {links.map(({ label, href, icon: Icon, routeName }) => {
                        const active = routeName === 'dashboard'
                            ? url === '/dashboard'
                            : url.startsWith('/' + href.split('.')[0].replace('.', '/')) ||
                              (routeName === 'class-schedule.index' && url.startsWith('/class-schedule')) ||
                              (routeName === 'attendance.index' && url.startsWith('/attendance')) ||
                              (routeName === 'profile.edit' && url.startsWith('/profile'));
                        return (
                            <Link key={routeName} href={route(routeName)}
                                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${active ? 'bg-white text-blue-950 shadow-sm' : 'text-blue-100/80 hover:bg-white/10 hover:text-white'}`}>
                                <Icon size={19} />
                                <span>{label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="mt-auto p-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <p className="text-sm font-semibold text-white">Need help?</p>
                    <p className="mt-1 text-xs leading-5 text-blue-100/70">Contact your school office for account or attendance support.</p>
                </div>
            </div>
        </>
    );

    return (
        <>
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-gradient-to-b from-blue-950 to-slate-950 lg:flex">{nav}</aside>
            {open && <div className="fixed inset-0 z-40 lg:hidden">
                <button aria-label="Close navigation overlay" onClick={onClose} className="absolute inset-0 bg-slate-950/60" />
                <aside className="relative flex h-full w-[min(19rem,88vw)] flex-col bg-gradient-to-b from-blue-950 to-slate-950 shadow-2xl">{nav}</aside>
            </div>}
        </>
    );
}
