'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { RequestTable } from '@/components/RequestTable';
import { Toast } from '@/components/Toast';
import { MockStore } from '@/lib/supabase/mockStore';
import { BorrowRequest, UserProfile } from '@/lib/types';
import { BookOpen } from 'lucide-react';

export default function StudentBorrowedPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [borrowedRequests, setBorrowedRequests] = useState<BorrowRequest[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const loadData = () => {
    const user = MockStore.getCurrentUser();
    setCurrentUser(user);
    if (user) {
      const list = MockStore.getStudentRequests(user.id);
      const active = list.filter((r) => r.status === 'APPROVED' || r.status === 'RETURN_PENDING');
      setBorrowedRequests(active);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReturnItem = (requestId: string) => {
    if (!currentUser) return;
    try {
      MockStore.requestReturn(requestId, currentUser.id);
      setToast({ message: 'Return request created! Awaiting Admin verification.', type: 'success' });
      loadData();
    } catch (err: any) {
      setToast({ message: err.message || 'Failed to submit return request.', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
      <Navbar userRole="STUDENT" userName={currentUser?.name} />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        <Sidebar role="STUDENT" />

        <main className="flex-1 space-y-6 min-w-0">
          <div>
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <span>Currently Borrowed Items</span>
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Items currently in your possession. Click "Return Item" when ready to return them to campus storage.
            </p>
          </div>

          <RequestTable
            requests={borrowedRequests}
            onReturnItem={handleReturnItem}
            emptyMessage="You do not have any active borrowed items at this moment."
          />
        </main>
      </div>
    </div>
  );
}
