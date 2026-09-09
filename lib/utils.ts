import { RequestStatus, ItemStatus } from './types';

export function formatDate(dateString?: string | null): string {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export function getStatusBadge(status: RequestStatus | ItemStatus) {
  switch (status) {
    case 'PENDING':
      return {
        label: 'Pending Approval',
        className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
      };
    case 'APPROVED':
    case 'BORROWED':
      return {
        label: status === 'BORROWED' ? 'Borrowed' : 'Approved',
        className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
      };
    case 'RETURN_PENDING':
      return {
        label: 'Return Requested',
        className: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
      };
    case 'COMPLETED':
    case 'AVAILABLE':
      return {
        label: status === 'AVAILABLE' ? 'Available' : 'Completed / Returned',
        className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
      };
    case 'REJECTED':
    case 'UNAVAILABLE':
      return {
        label: status === 'UNAVAILABLE' ? 'Unavailable' : 'Rejected',
        className: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
      };
    default:
      return {
        label: status,
        className: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border border-zinc-500/20'
      };
  }
}

export function getConditionBadge(condition: string) {
  switch (condition) {
    case 'NEW':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
    case 'GOOD':
      return 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300';
    case 'FAIR':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300';
    default:
      return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300';
  }
}
