'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Clock,
  CheckSquare,
  Users,
  History,
  BookOpen,
  ArrowDownLeft
} from 'lucide-react';

interface SidebarProps {
  role: 'STUDENT' | 'ADMIN';
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const studentLinks = [
    { name: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
    { name: 'Browse Items', href: '/student/items', icon: Package },
    { name: 'My Requests', href: '/student/requests', icon: Clock },
    { name: 'Currently Borrowed', href: '/student/borrowed', icon: BookOpen },
    { name: 'Borrowing History', href: '/student/history', icon: History }
  ];

  const adminLinks = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Manage Items', href: '/admin/items', icon: Package },
    { name: 'Add New Item', href: '/admin/items/add', icon: PlusCircle },
    { name: 'Borrow Requests', href: '/admin/requests', icon: Clock },
    { name: 'Borrowed & Returns', href: '/admin/borrowed', icon: ArrowDownLeft },
    { name: 'Students Directory', href: '/admin/students', icon: Users },
    { name: 'All Borrow History', href: '/admin/history', icon: History }
  ];

  const links = role === 'ADMIN' ? adminLinks : studentLinks;

  return (
    <aside className="w-64 shrink-0 hidden md:block bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-4 min-h-[calc(100vh-4rem)]">
      <div className="mb-4 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/50">
        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block mb-0.5">
          Navigation Mode
        </span>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
          <span className={`w-2 h-2 rounded-full ${role === 'ADMIN' ? 'bg-emerald-500' : 'bg-indigo-500'}`} />
          {role === 'ADMIN' ? 'Administrator Console' : 'Student Portal'}
        </div>
      </div>

      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== '/admin/items' && link.href !== '/student/items' && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400 dark:text-zinc-500'}`} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
