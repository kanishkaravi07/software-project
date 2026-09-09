'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { SearchBar } from '@/components/SearchBar';
import { ItemCard } from '@/components/ItemCard';
import { RequestTable } from '@/components/RequestTable';
import { Toast } from '@/components/Toast';
import { MockStore } from '@/lib/supabase/mockStore';
import { Item, BorrowRequest, UserProfile } from '@/lib/types';
import { Package, Clock, BookOpen, History, ArrowRight, HandHandshake } from 'lucide-react';

export default function StudentDashboardPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [items, setItems] = useState<Item[]>([]);
  const [requests, setRequests] = useState<BorrowRequest[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const loadData = () => {
    const user = MockStore.getCurrentUser();
    setCurrentUser(user);

    const itemList = MockStore.searchItems(searchQuery, selectedCategory);
    setItems(itemList);

    if (user) {
      const reqList = MockStore.getStudentRequests(user.id);
      setRequests(reqList);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchQuery, selectedCategory]);

  const handleBorrowRequest = (item: Item) => {
    if (!currentUser) {
      setToast({ message: 'Please log in to borrow items.', type: 'error' });
      return;
    }

    try {
      MockStore.createBorrowRequest(currentUser.id, item.id);
      setToast({ message: `Borrow request submitted for ${item.item_name}! Status: PENDING`, type: 'success' });
      loadData();
    } catch (err: any) {
      setToast({ message: err.message || 'Failed to submit borrow request.', type: 'error' });
    }
  };

  const handleReturnItem = (requestId: string) => {
    if (!currentUser) return;
    try {
      MockStore.requestReturn(requestId, currentUser.id);
      setToast({ message: 'Return request submitted! Awaiting Admin verification.', type: 'success' });
      loadData();
    } catch (err: any) {
      setToast({ message: err.message || 'Failed to submit return request.', type: 'error' });
    }
  };

  const activeBorrowed = requests.filter((r) => r.status === 'APPROVED' || r.status === 'RETURN_PENDING');
  const pendingRequests = requests.filter((r) => r.status === 'PENDING');
  const completedHistory = requests.filter((r) => r.status === 'COMPLETED' || r.status === 'REJECTED');

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
      <Navbar userRole="STUDENT" userName={currentUser?.name} />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        <Sidebar role="STUDENT" />

        <main className="flex-1 space-y-8 min-w-0">
          {/* Welcome Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-sky-600 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md">
                Student Dashboard
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">
                Welcome back, {currentUser?.name || 'Student'}! 👋
              </h1>
              <p className="text-xs sm:text-sm text-indigo-100 mt-1 max-w-xl">
                Department: {currentUser?.department || 'General Studies'} • Search campus items below and send borrow requests.
              </p>
            </div>
            <Link
              href="/student/items"
              className="px-4 py-2.5 rounded-xl bg-white text-indigo-700 font-bold text-xs shadow-md hover:bg-indigo-50 transition-colors shrink-0 flex items-center gap-1.5"
            >
              <span>Explore Full Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <span className="text-[11px] font-semibold text-zinc-400 block">Available Items</span>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">{items.length}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <span className="text-[11px] font-semibold text-zinc-400 block">Currently Borrowed</span>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{activeBorrowed.length}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <span className="text-[11px] font-semibold text-zinc-400 block">Pending Requests</span>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{pendingRequests.length}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <span className="text-[11px] font-semibold text-zinc-400 block">Completed Returns</span>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{completedHistory.length}</p>
            </div>
          </div>

          {/* Search & Category Bar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-500" />
                <span>Search & Borrow Campus Items</span>
              </h2>
            </div>
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Available Items Grid */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ItemCard key={item.id} item={item} onBorrowRequest={handleBorrowRequest} />
              ))}
            </div>

            {items.length === 0 && (
              <div className="p-12 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                <p className="text-sm font-semibold text-zinc-500">No items found matching your search query.</p>
              </div>
            )}
          </div>

          {/* Currently Borrowed Section */}
          <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <span>Currently Borrowed Items</span>
              </h2>
              <Link href="/student/borrowed" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                View All
              </Link>
            </div>

            <RequestTable
              requests={activeBorrowed}
              onReturnItem={handleReturnItem}
              emptyMessage="You do not have any currently borrowed items."
            />
          </div>
        </main>
      </div>
    </div>
  );
}
