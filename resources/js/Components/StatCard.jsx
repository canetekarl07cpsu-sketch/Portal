export default function StatCard({ label, value, helper, icon: Icon, tone = 'navy' }) {
    const tones = {
        navy: 'bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300',
        green: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300',
        amber: 'bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300',
        red: 'bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300',
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
                    <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{value ?? '—'}</p>
                    {helper && <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{helper}</p>}
                </div>
                {Icon && <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tones[tone] ?? tones.navy}`}><Icon size={21} /></span>}
            </div>
        </div>
    );
}
