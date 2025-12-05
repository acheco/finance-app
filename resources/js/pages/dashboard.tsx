import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
  return (
    <AppLayout title="Overview">
      <Head title="Dashboard" />
      <div className="overflow-auto">
        <div className="aspect-video bg-blue-100">Content</div>
        <div className="aspect-video bg-green-100">Content</div>
        <div className="aspect-video bg-yellow-100">Content</div>
        <div className="aspect-video bg-red-100">Content</div>
        <div className="aspect-video bg-emerald-100">Content</div>
        <div className="aspect-video bg-slate-100">Content</div>
      </div>
    </AppLayout>
  );
}
