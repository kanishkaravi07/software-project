import { NextResponse } from 'next/server';
import { MockStore } from '@/lib/supabase/mockStore';

export async function GET() {
  const students = MockStore.getStudents();
  return NextResponse.json({ students });
}
