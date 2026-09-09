'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { Toast } from '@/components/Toast';
import { MockStore } from '@/lib/supabase/mockStore';
import { Item, UserProfile } from '@/lib/types';
import { getStatusBadge, getConditionBadge } from '@/lib/utils';
import { MapPin, Box, Calendar, ArrowLeft, HandHandshake, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function StudentItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const itemId = params.id as string;

  const [item, setItem] = useState<Item | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [expectedReturnDate, setExpectedReturnDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const user = MockStore.getCurrentUser();
    setCurrentUser(user);

    if (itemId) {
      const found = MockStore.getItemById(itemId);
      setItem(found);
    }

    // Default expected return date to +7 days
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 7);
    setExpectedReturnDate(defaultDate.toISOString().split('T')[0]);
  }, [itemId]);

  if (!item) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
        <Navbar userRole="STUDENT" />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-3">
            <h2 className="text-xl font-bold">Item Not Found</h2>
            <Link href="/student/items" className="text-xs font-semibold text-indigo-600 hover:underline">
              Return to Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isAvailable = item.status === 'AVAILABLE' && item.available_quantity > 0;
  const statusBadge = getStatusBadge(item.status);
  const conditionClass = getConditionBadge(item.condition);

  const handleBorrowSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setToast({ message: 'Please log in to submit a borrow request.', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      MockStore.createBorrowRequest(currentUser.id, item.id, expectedReturnDate);
      setToast({ message: `Borrow request submitted for ${item.item_name}!`, type: 'success' });
      setTimeout(() => {
        router.push('/student/requests');
      }, 1200);
    } catch (err: any) {
      setToast({ message: err.message || 'Failed to submit borrow request.', type: 'error' });
    } finally {
      setLoading(false);
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
            <Link
              href="/student/items"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Catalog</span>
            </Link>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
              {/* Product Image */}
              <div className="relative h-72 md:h-full bg-zinc-100 dark:bg-zinc-800 min-h-[300px]">
                <img
                  src={item.image_url || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80'}
                  alt={item.item_name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm border border-zinc-200/50">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Product Details & Borrow Form */}
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${conditionClass}`}>
                      Condition: {item.condition}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${statusBadge.className}`}>
                      {statusBadge.label}
                    </span>
                  </div>

                  <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
                    {item.item_name}
                  </h1>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span><strong>Campus Location:</strong> {item.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Box className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span><strong>Stock Availability:</strong> {item.available_quantity} available out of {item.quantity} total</span>
                    </div>
                  </div>
                </div>

                {/* Borrow Form Box */}
                <form onSubmit={handleBorrowSubmit} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/80 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Select Expected Return Date
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                      <input
                        type="date"
                        value={expectedReturnDate}
                        onChange={(e) => setExpectedReturnDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!isAvailable || loading}
                    className={`w-full py-3 rounded-xl text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
                      isAvailable
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25'
                        : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    <HandHandshake className="w-4 h-4" />
                    <span>{loading ? 'Submitting Request...' : (isAvailable ? 'Confirm Borrow Request' : 'Item Currently Unavailable')}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
