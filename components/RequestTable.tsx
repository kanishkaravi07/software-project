'use client';

import React, { useState } from 'react';
import { BorrowRequest } from '@/lib/types';
import { formatDate, getStatusBadge } from '@/lib/utils';
import { CheckCircle2, XCircle, RotateCcw, MessageSquare, AlertCircle } from 'lucide-react';

interface RequestTableProps {
  requests: BorrowRequest[];
  isAdmin?: boolean;
  onApprove?: (requestId: string, remark?: string) => void;
  onReject?: (requestId: string, remark?: string) => void;
  onReturnItem?: (requestId: string) => void;
  onConfirmReturn?: (requestId: string, remark?: string) => void;
  emptyMessage?: string;
}

export function RequestTable({
  requests,
  isAdmin = false,
  onApprove,
  onReject,
  onReturnItem,
  onConfirmReturn,
  emptyMessage = 'No borrow requests found.'
}: RequestTableProps) {
  const [activeRemarkId, setActiveRemarkId] = useState<string | null>(null);
  const [remarkText, setRemarkText] = useState<string>('');

  const handleActionWithRemark = (
    requestId: string,
    actionFn: (id: string, remark?: string) => void
  ) => {
    actionFn(requestId, remarkText || undefined);
    setActiveRemarkId(null);
    setRemarkText('');
  };

  if (requests.length === 0) {
    return (
      <div className="p-8 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-3 text-zinc-400">
          <AlertCircle className="w-6 h-6" />
        </div>
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
      <table className="w-full text-left text-xs">
        <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">
          <tr>
            <th className="px-4 py-3.5">Item Name</th>
            {isAdmin && <th className="px-4 py-3.5">Student Info</th>}
            <th className="px-4 py-3.5">Request Date</th>
            <th className="px-4 py-3.5">Expected Return</th>
            <th className="px-4 py-3.5">Status</th>
            <th className="px-4 py-3.5">Remark / Log</th>
            <th className="px-4 py-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
          {requests.map((req) => {
            const badge = getStatusBadge(req.status);
            const isRemarkingThis = activeRemarkId === req.id;

            return (
              <tr key={req.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                {/* Item Name */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={req.item?.image_url || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80'}
                      alt={req.item?.item_name || 'Item'}
                      className="w-10 h-10 rounded-lg object-cover bg-zinc-100 dark:bg-zinc-800 shrink-0"
                    />
                    <div>
                      <p className="font-bold text-zinc-900 dark:text-zinc-100 text-sm line-clamp-1">
                        {req.item?.item_name || 'Item Details'}
                      </p>
                      <span className="text-[11px] text-zinc-400">{req.item?.category}</span>
                    </div>
                  </div>
                </td>

                {/* Student Info (Admin only) */}
                {isAdmin && (
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {req.student?.name || 'Student'}
                      </p>
                      <p className="text-[11px] text-zinc-400">{req.student?.email}</p>
                      {req.student?.department && (
                        <span className="text-[10px] text-indigo-500 font-medium">
                          {req.student.department}
                        </span>
                      )}
                    </div>
                  </td>
                )}

                {/* Dates */}
                <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400">
                  {formatDate(req.request_date)}
                </td>

                <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400">
                  {formatDate(req.expected_return_date)}
                </td>

                {/* Status Badge */}
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${badge.className}`}>
                    {badge.label}
                  </span>
                </td>

                {/* Admin Remark / Log */}
                <td className="px-4 py-4 max-w-xs">
                  {req.admin_remark ? (
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 italic line-clamp-2">
                      "{req.admin_remark}"
                    </span>
                  ) : (
                    <span className="text-zinc-400 text-[11px]">-</span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-4 py-4 text-right">
                  {/* Admin Actions */}
                  {isAdmin && req.status === 'PENDING' && (
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          if (onApprove) onApprove(req.id, 'Approved');
                        }}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => {
                          if (onReject) onReject(req.id, 'Not available');
                        }}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}

                  {isAdmin && (req.status === 'RETURN_PENDING' || req.status === 'APPROVED') && (
                    <button
                      onClick={() => {
                        if (onConfirmReturn) onConfirmReturn(req.id, 'Returned in good condition');
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-sm flex items-center gap-1 ml-auto"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Confirm Return</span>
                    </button>
                  )}

                  {/* Student Action: Return Item */}
                  {!isAdmin && req.status === 'APPROVED' && (
                    <button
                      onClick={() => {
                        if (onReturnItem) onReturnItem(req.id);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 flex items-center gap-1.5 ml-auto"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Return Item</span>
                    </button>
                  )}

                  {!isAdmin && req.status === 'RETURN_PENDING' && (
                    <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                      Awaiting Admin Verification
                    </span>
                  )}

                  {(req.status === 'COMPLETED' || req.status === 'REJECTED') && (
                    <span className="text-[11px] text-zinc-400 font-medium">Logged</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
