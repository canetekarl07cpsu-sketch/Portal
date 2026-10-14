export default function PageHeading({ eyebrow, title, description, action }) {
    return (
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">{eyebrow}</p>}
                <h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">{title}</h1>
                {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>}
            </div>
            {action}
        </div>
    );
}
