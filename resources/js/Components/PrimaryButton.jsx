export default function PrimaryButton({ children, className = '', ...props }) {
    return (
        <button
            {...props}
            className={`inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-950 focus:outline-none focus:ring-4 focus:ring-blue-900/15 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-700 dark:hover:bg-blue-600 ${className}`}
        >
            {children}
        </button>
    );
}
