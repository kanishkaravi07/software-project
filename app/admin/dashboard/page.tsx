'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { StatCard } from '@/components/StatCard';
import { RequestTable } from '@/components/RequestTable';
import { Toast } from '@/components/Toast';
import { MockStore } from '@/lib/supabase/mockStore';
import { DashboardStats, BorrowRequest, UserProfile } from '@/lib/types';
import {
  Box,
  CheckCircle,
  BookOpen,
  Clock,
  Users,
  PlusCircle,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalItems: 0,
    availableItems: 0,
    borrowedItems: 0,
    pendingRequests: 0,
    totalStudents: 0
  });
  const [requests, setRequests] = useState<BorrowRequest[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const loadData = () => {
    const user = MockStore.getCurrentUser();
    setCurrentUser(user);

    const s = MockStore.getStats();
    setStats(s);

    const reqs = MockStore.getRequests();
    setRequests(reqs);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = (requestId: string, remark?: string) => {
    try {
      MockStore.approveRequest(requestId, remark);
      setToast({ message: 'Borrow request APPROVED! Item available quantity updated.', type: 'success' });
      loadData();
    } catch (err: any) {
      setToast({ message: err.message || 'Failed to approve request.', type: 'error' });
    }
  };

  const handleReject = (requestId: string, remark?: string) => {
    try {
      MockStore.rejectRequest(requestId, remark);
      setToast({ message: 'Borrow request REJECTED.', type: 'error' });
      loadData();
    } catch (err: any) {
      setToast({ message: err.message || 'Failed to reject request.', type: 'error' });
    }
  };

  const handleConfirmReturn = (requestId: string, remark?: string) => {
    try {
      MockStore.confirmReturn(requestId, remark);
      setToast({ message: 'Item return CONFIRMED! Item restored to available stock.', type: 'success' });
      loadData();
    } catch (err: any) {
      setToast({ message: err.message || 'Failed to confirm return.', type: 'error' });
    }
  };

  const pendingRequestsList = requests.filter((r) => r.status === 'PENDING' || r.status === 'RETURN_PENDING');

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
      <Navbar userRole="ADMIN" userName={currentUser?.name} />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        <Sidebar role="ADMIN" />

        <main className="flex-1 space-y-8 min-w-0">
          {/* Header Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-emerald-950 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-zinc-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                Administrator Control Center
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">
                Campus Resources & Borrowing Overview
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Monitor live inventory stock, review pending borrow requests, and confirm returned items.
              </p>
            </div>

            <Link
              href="/admin/items/add"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all shrink-0 flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Item</span>
            </Link>
          </div>

          {/* Statistics Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard
              title="Total Items"
              value={stats.totalItems}
              icon={Box}
              colorScheme="indigo"
              description="Across all categories"
            />
            <StatCard
              title="Available Items"
              value={stats.availableItems}
              icon={CheckCircle}
              colorScheme="emerald"
              description="Ready to borrow"
            />
            <StatCard
              title="Borrowed Items"
              value={stats.borrowedItems}
              icon={BookOpen}
              colorScheme="blue"
              description="Currently in use"
            />
            <StatCard
              title="Pending Requests"
              value={stats.pendingRequests}
              icon={Clock}
              colorScheme="amber"
              description="Needs review"
            />
            <StatCard
              title="Total Students"
              value={stats.totalStudents}
              icon={Users}
              colorScheme="purple"
              description="Registered users"
            />
          </div>

          {/* Pending Action Desk */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                <span>Action Required: Pending Requests & Return Approvals</span>
              </h2>
              <Link href="/admin/requests" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                <span>View All Requests</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <RequestTable
              requests={pendingRequestsList}
              isAdmin={true}
              onApprove={handleApprove}
              onReject={handleReject}
              onConfirmReturn={handleConfirmReturn}
              emptyMessage="Great news! There are no pending borrow requests or return verifications requiring admin action right now."
            />
          </div>
        </main>
      </div>
    </div>
  );
}
