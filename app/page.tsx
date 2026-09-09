'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Box, GraduationCap, ShieldCheck, Search, Clock, RotateCcw, ArrowRight, Shield } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-bold tracking-wide uppercase">
            <Box className="w-3.5 h-3.5" />
            Campus Item Borrowing System
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Borrow Campus Items <br />
            <span className="bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
              Effortlessly & Transparently
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            The unified resource sharing portal for college students and faculty. Access scientific calculators, textbooks, lab equipment, and sports gear in just a few clicks.
          </p>

          {/* Quick Role Gateway Cards */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Student Gateway */}
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl hover:border-indigo-500/50 transition-all text-left group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  Student Portal
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                  Browse available items, submit borrow requests, track approval status, and manage your current borrowings.
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Link
                  href="/login"
                  className="flex-1 text-center px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-1"
                >
                  <span>Student Login</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            </div>

            {/* Admin Gateway */}
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl hover:border-emerald-500/50 transition-all text-left group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  Admin Console
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                  Manage campus inventory, approve or reject borrow requests, verify returned equipment, and monitor students.
                </p>
              </div>

              <div className="mt-6">
                <Link
                  href="/admin/login"
                  className="w-full text-center px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1"
                >
                  <span>Administrator Login</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm">
            <Search className="w-6 h-6 text-indigo-500 mb-3" />
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Instant Search & Filter</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Locate calculators, textbooks, lab equipment, and sports gear by category or search term instantly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm">
            <Clock className="w-6 h-6 text-amber-500 mb-3" />
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Real-Time Request Approval</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Submit requests seamlessly. Admins receive instant notifications to approve or decline requests with remarks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm">
            <RotateCcw className="w-6 h-6 text-emerald-500 mb-3" />
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Verified Return Process</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Students trigger return requests; admins verify equipment condition and restore inventory levels cleanly.
            </p>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-500 dark:text-zinc-400">
        CampusShare &copy; 2026 - College Mini/Major Project System. Built for Students and Admins.
      </footer>
    </div>
  );
}
