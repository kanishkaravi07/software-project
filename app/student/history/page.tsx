'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { RequestTable } from '@/components/RequestTable';
import { MockStore } from '@/lib/supabase/mockStore';
import { BorrowRequest, UserProfile } from '@/lib/types';
import { History } from 'lucide-react';

export default function StudentHistoryPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [historyRequests, setHistoryRequests] = useState<BorrowRequest[]>([]);

  useEffect(() => {
    const user = MockStore.getCurrentUser();
    setCurrentUser(user);
    if (user) {
      const list = MockStore.getStudentRequests(user.id);
      const past = list.filter((r) => r.status === 'COMPLETED' || r.status === 'REJECTED');
      setHistoryRequests(past);
    }
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
      <Navbar userRole="STUDENT" userName={currentUser?.name} />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        <Sidebar role="STUDENT" />

        <main className="flex-1 space-y-6 min-w-0">
          <div>
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
              <History className="w-6 h-6 text-purple-500" />
              <span>Borrowing History</span>
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Archived log of all your completed returns and past request outcomes
            </p>
          </div>

          <RequestTable
            requests={historyRequests}
            emptyMessage="No completed borrowing history found."
          />
        </main>
      </div>
    </div>
  );
}
