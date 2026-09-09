'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { RequestTable } from '@/components/RequestTable';
import { Toast } from '@/components/Toast';
import { MockStore } from '@/lib/supabase/mockStore';
import { BorrowRequest, UserProfile } from '@/lib/types';
import { Clock } from 'lucide-react';

export default function AdminRequestsPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [requests, setRequests] = useState<BorrowRequest[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const loadRequests = () => {
    const user = MockStore.getCurrentUser();
    setCurrentUser(user);
    const list = MockStore.getRequests();
    setRequests(list);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleApprove = (requestId: string, remark?: string) => {
    try {
      MockStore.approveRequest(requestId, remark);
      setToast({ message: 'Request APPROVED successfully.', type: 'success' });
      loadRequests();
    } catch (err: any) {
      setToast({ message: err.message || 'Failed to approve request.', type: 'error' });
    }
  };

  const handleReject = (requestId: string, remark?: string) => {
    try {
      MockStore.rejectRequest(requestId, remark);
      setToast({ message: 'Request REJECTED.', type: 'error' });
      loadRequests();
    } catch (err: any) {
      setToast({ message: err.message || 'Failed to reject request.', type: 'error' });
    }
  };

  const pendingList = requests.filter((r) => r.status === 'PENDING');

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
      <Navbar userRole="ADMIN" userName={currentUser?.name} />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        <Sidebar role="ADMIN" />

        <main className="flex-1 space-y-6 min-w-0">
          <div>
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
              <Clock className="w-6 h-6 text-amber-500" />
              <span>Pending Borrow Requests</span>
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Review student borrow requests and grant or decline approval
            </p>
          </div>

          <RequestTable
            requests={pendingList}
            isAdmin={true}
            onApprove={handleApprove}
            onReject={handleReject}
            emptyMessage="There are currently no pending borrow requests requiring approval."
          />
        </main>
      </div>
    </div>
  );
}
