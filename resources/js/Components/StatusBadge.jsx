const styles = {
    present: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15 dark:bg-emerald-400/10 dark:text-emerald-300',
    late: 'bg-amber-50 text-amber-700 ring-amber-600/15 dark:bg-amber-400/10 dark:text-amber-300',
    absent: 'bg-rose-50 text-rose-700 ring-rose-600/15 dark:bg-rose-400/10 dark:text-rose-300',
    pending: 'bg-slate-100 text-slate-600 ring-slate-500/10 dark:bg-slate-700 dark:text-slate-300',
};

export default function StatusBadge({ status = 'pending' }) {
    const key = String(status).toLowerCase();
    const label = key.charAt(0).toUpperCase() + key.slice(1);
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[key] ?? styles.pending}`}>
            {label}
        </span>
    );
}
