import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Check if user is authenticated and is an admin
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/auth/login?callbackUrl=/admin');
  }

  return (
    <div className="min-h-screen bg-bg text-text-primary">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <AdminHeader />

        {/* Content */}
        <main className="flex-1 p-6 bg-bg">
          {children}
        </main>
      </div>
    </div>
  );
}
