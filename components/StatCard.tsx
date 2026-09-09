'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  trend?: string;
  colorScheme?: 'indigo' | 'emerald' | 'blue' | 'amber' | 'purple';
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  colorScheme = 'indigo'
}: StatCardProps) {
  const colorMap = {
    indigo: 'from-indigo-500 to-indigo-600 text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
    emerald: 'from-emerald-500 to-emerald-600 text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    blue: 'from-blue-500 to-blue-600 text-blue-500 bg-blue-500/10 border-blue-500/20',
    amber: 'from-amber-500 to-amber-600 text-amber-500 bg-amber-500/10 border-amber-500/20',
    purple: 'from-purple-500 to-purple-600 text-purple-500 bg-purple-500/10 border-purple-500/20'
  };

  const currentColors = colorMap[colorScheme];

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl border ${currentColors}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3">
        <h4 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          {value}
        </h4>
        {description && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
