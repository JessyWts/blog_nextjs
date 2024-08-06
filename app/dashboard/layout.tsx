'use client';

import DashboardNav from "../components/DashboardNav";
import ProtectedRoute from "../components/protectedRoute";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return (
        <ProtectedRoute>
            <section className="max-w-[1200px] mx-auto w-full mt-2 p-2">
                <DashboardNav />
                {children}
            </section>
        </ProtectedRoute>
    );
};