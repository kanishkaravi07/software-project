import { NextResponse } from 'next/server';
import { MockStore } from '@/lib/supabase/mockStore';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get('student_id');

  if (studentId) {
    const requests = MockStore.getStudentRequests(studentId);
    return NextResponse.json({ requests });
  }

  const requests = MockStore.getRequests();
  return NextResponse.json({ requests });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { student_id, item_id, expected_return_date } = body;

    if (!student_id || !item_id) {
      return NextResponse.json({ error: 'Student ID and Item ID are required.' }, { status: 400 });
    }

    const newRequest = MockStore.createBorrowRequest(student_id, item_id, expected_return_date);
    return NextResponse.json({ success: true, request: newRequest });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to submit borrow request.' }, { status: 400 });
  }
}
