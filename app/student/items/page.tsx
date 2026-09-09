'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { SearchBar } from '@/components/SearchBar';
import { ItemCard } from '@/components/ItemCard';
import { Toast } from '@/components/Toast';
import { MockStore } from '@/lib/supabase/mockStore';
import { Item, UserProfile } from '@/lib/types';
import { Package } from 'lucide-react';

export default function StudentItemsPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [items, setItems] = useState<Item[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const loadItems = () => {
    const user = MockStore.getCurrentUser();
    setCurrentUser(user);
    const itemList = MockStore.searchItems(searchQuery, selectedCategory);
    setItems(itemList);
  };

  useEffect(() => {
    loadItems();
  }, [searchQuery, selectedCategory]);

  const handleBorrowRequest = (item: Item) => {
    if (!currentUser) {
      setToast({ message: 'Please log in as a student to borrow items.', type: 'error' });
      return;
    }

    try {
      MockStore.createBorrowRequest(currentUser.id, item.id);
      setToast({ message: `Borrow request submitted for ${item.item_name}! Status: PENDING`, type: 'success' });
      loadItems();
    } catch (err: any) {
      setToast({ message: err.message || 'Failed to submit borrow request.', type: 'error' });
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
              <Package className="w-6 h-6 text-indigo-500" />
              <span>Campus Items Catalog</span>
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Search equipment, books, and resources across campus departments
            </p>
          </div>

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} onBorrowRequest={handleBorrowRequest} />
            ))}
          </div>

          {items.length === 0 && (
            <div className="p-12 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
              <p className="text-sm font-semibold text-zinc-500">No items found matching "{searchQuery}".</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
