'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { RequestTable } from '@/components/RequestTable';
import { Toast } from '@/components/Toast';
import { MockStore } from '@/lib/supabase/mockStore';
import { BorrowRequest, UserProfile } from '@/lib/types';
import { BookOpen } from 'lucide-react';

export default function AdminBorrowedPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [borrowedList, setBorrowedList] = useState<BorrowRequest[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const loadData = () => {
    const user = MockStore.getCurrentUser();
    setCurrentUser(user);
    const reqs = MockStore.getRequests();
    const active = reqs.filter((r) => r.status === 'APPROVED' || r.status === 'RETURN_PENDING');
    setBorrowedList(active);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleConfirmReturn = (requestId: string, remark?: string) => {
    try {
      MockStore.confirmReturn(requestId, remark || 'Return verified and restocked.');
      setToast({ message: 'Item return CONFIRMED! Quantity incremented and status updated to COMPLETED.', type: 'success' });
      loadData();
    } catch (err: any) {
      setToast({ message: err.message || 'Failed to confirm return.', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
      <Navbar userRole="ADMIN" userName={currentUser?.name} />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        <Sidebar role="ADMIN" />

        <main className="flex-1 space-y-6 min-w-0">
          <div>
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <span>Currently Borrowed & Return Verification</span>
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Verify physical item condition when returned by students and click "Confirm Return" to update stock.
            </p>
          </div>

          <RequestTable
            requests={borrowedList}
            isAdmin={true}
            onConfirmReturn={handleConfirmReturn}
            emptyMessage="No items are currently checked out or awaiting return confirmation."
          />
        </main>
      </div>
    </div>
  );
}
