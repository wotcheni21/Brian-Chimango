import type { Metadata } from "next";
import { Suspense } from "react";
import AdminDashboard from "./AdminDashboard";

export const metadata: Metadata = {
  title: "RSVP Admin | Brian & Chimango",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-ivory px-6 py-10 text-ink">
          <div className="mx-auto max-w-6xl">Loading RSVP admin...</div>
        </main>
      }
    >
      <AdminDashboard />
    </Suspense>
  );
}
