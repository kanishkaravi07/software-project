'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { SearchBar } from '@/components/SearchBar';
import { ItemCard } from '@/components/ItemCard';
import { Toast } from '@/components/Toast';
import { MockStore } from '@/lib/supabase/mockStore';
import { Item, UserProfile } from '@/lib/types';
import { Package, PlusCircle } from 'lucide-react';

export default function AdminItemsPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [items, setItems] = useState<Item[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const loadItems = () => {
    const user = MockStore.getCurrentUser();
    setCurrentUser(user);
    const list = MockStore.searchItems(searchQuery, selectedCategory);
    setItems(list);
  };

  useEffect(() => {
    loadItems();
  }, [searchQuery, selectedCategory]);

  const handleDeleteItem = (itemId: string) => {
    if (confirm('Are you sure you want to delete this campus item from inventory?')) {
      try {
        MockStore.deleteItem(itemId);
        setToast({ message: 'Item deleted successfully.', type: 'success' });
        loadItems();
      } catch (err: any) {
        setToast({ message: err.message || 'Failed to delete item.', type: 'error' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
      <Navbar userRole="ADMIN" userName={currentUser?.name} />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        <Sidebar role="ADMIN" />

        <main className="flex-1 space-y-6 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
                <Package className="w-6 h-6 text-indigo-500" />
                <span>Inventory Management</span>
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Add, edit, inspect, or remove items from the campus catalog
              </p>
            </div>

            <Link
              href="/admin/items/add"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Item</span>
            </Link>
          </div>

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                isAdminView={true}
                onDeleteItem={handleDeleteItem}
              />
            ))}
          </div>

          {items.length === 0 && (
            <div className="p-12 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
              <p className="text-sm font-semibold text-zinc-500">No items found matching your filters.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
