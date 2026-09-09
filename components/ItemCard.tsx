'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Item } from '@/lib/types';
import { getStatusBadge, getConditionBadge } from '@/lib/utils';
import { MapPin, Box, ArrowRight, HandHandshake } from 'lucide-react';

interface ItemCardProps {
  item: Item;
  onBorrowRequest?: (item: Item) => void;
  isAdminView?: boolean;
  onEditItem?: (item: Item) => void;
  onDeleteItem?: (itemId: string) => void;
}

export function ItemCard({ item, onBorrowRequest, isAdminView = false, onEditItem, onDeleteItem }: ItemCardProps) {
  const isAvailable = item.status === 'AVAILABLE' && item.available_quantity > 0;
  const statusBadge = getStatusBadge(item.status);
  const conditionClass = getConditionBadge(item.condition);

  return (
    <div className="group rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image container */}
      <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        <img
          src={item.image_url || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80'}
          alt={item.item_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80';
          }}
        />

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide bg-white/90 dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-200 backdrop-blur-md shadow-sm border border-zinc-200/50 dark:border-zinc-700/50">
            {item.category}
          </span>
        </div>

        {/* Status Pill */}
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide backdrop-blur-md shadow-sm ${statusBadge.className}`}>
            {item.available_quantity > 0 ? `${item.available_quantity} Left` : 'Out of Stock'}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${conditionClass}`}>
              Condition: {item.condition}
            </span>
          </div>

          <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {item.item_name}
          </h3>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1 min-h-[2.25rem]">
            {item.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-3">
            <div className="flex items-center gap-1.5 line-clamp-1">
              <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span className="truncate">{item.location}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0 font-semibold text-zinc-700 dark:text-zinc-300">
              <Box className="w-3.5 h-3.5 text-indigo-500" />
              <span>{item.available_quantity}/{item.quantity}</span>
            </div>
          </div>

          {/* Action Buttons */}
          {isAdminView ? (
            <div className="grid grid-cols-2 gap-2">
              <Link
                href={`/admin/items/edit/${item.id}`}
                className="w-full text-center px-3 py-2 rounded-xl text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                Edit Details
              </Link>
              <button
                onClick={() => onDeleteItem && onDeleteItem(item.id)}
                className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 border border-rose-200/50 dark:border-rose-800/50 transition-colors"
              >
                Delete
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                href={`/student/items/${item.id}`}
                className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => onBorrowRequest && onBorrowRequest(item)}
                disabled={!isAvailable}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  isAvailable
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 active:scale-[0.98]'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed border border-zinc-200 dark:border-zinc-700'
                }`}
              >
                <HandHandshake className="w-3.5 h-3.5" />
                <span>{isAvailable ? 'Borrow' : 'Unavailable'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
