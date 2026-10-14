import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import Topbar from '@/Components/Topbar';

export default function StudentLayout({ title = 'Student Portal', children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <div className="min-h-screen lg:pl-64">
                    <Topbar onMenuClick={() => setSidebarOpen(true)} />
                    <main className="mx-auto max-w-[1600px] px-4 py-7 sm:px-8 sm:py-9">{children}</main>
                    <footer className="px-4 pb-6 text-center text-xs text-slate-400 sm:px-8">Student Portal · Academic Services</footer>
                </div>
            </div>
        </>
    );
}
