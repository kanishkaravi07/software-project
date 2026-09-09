import { NextResponse } from 'next/server';
import { MockStore } from '@/lib/supabase/mockStore';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const req = MockStore.rejectRequest(id, body.remark);
    return NextResponse.json({ success: true, request: req });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to reject request.' }, { status: 400 });
  }
}
