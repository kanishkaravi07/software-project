import { NextResponse } from 'next/server';
import { MockStore } from '@/lib/supabase/mockStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { request_id, student_id } = body;

    if (!request_id || !student_id) {
      return NextResponse.json({ error: 'Request ID and Student ID are required.' }, { status: 400 });
    }

    const req = MockStore.requestReturn(request_id, student_id);
    return NextResponse.json({ success: true, request: req });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to submit return request.' }, { status: 400 });
  }
}
