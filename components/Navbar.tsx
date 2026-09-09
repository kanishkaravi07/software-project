'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, User, ShieldCheck, GraduationCap, Box } from 'lucide-react';
import { MockStore } from '@/lib/supabase/mockStore';

interface NavbarProps {
  userRole?: 'STUDENT' | 'ADMIN' | null;
  userName?: string;
}

export function Navbar({ userRole, userName }: NavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    MockStore.logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href={userRole === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard'} className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-sky-600 dark:from-indigo-400 dark:to-sky-400 bg-clip-text text-transparent">
                CAMPUSSHARE
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium tracking-wide">
              CAMPUS ITEM BORROWING SYSTEM
            </p>
          </div>
        </Link>

        {/* Right Section: User Badge & Actions */}
        <div className="flex items-center gap-3">
          {userRole ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700">
                {userRole === 'ADMIN' ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                ) : (
                  <GraduationCap className="w-4 h-4 text-indigo-500" />
                )}
                <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {userName || (userRole === 'ADMIN' ? 'Admin' : 'Student')}
                </span>
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                  userRole === 'ADMIN' 
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
                    : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                }`}>
                  {userRole}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Student Login
              </Link>
              <Link
                href="/admin/login"
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
              >
                Admin Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
