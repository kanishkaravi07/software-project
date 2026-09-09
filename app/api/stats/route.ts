import { NextResponse } from 'next/server';
import { MockStore } from '@/lib/supabase/mockStore';

export async function GET() {
  const stats = MockStore.getStats();
  return NextResponse.json({ stats });
}
