import { NextResponse } from 'next/server';
import { MockStore } from '@/lib/supabase/mockStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, password, name, department, role } = body;

    if (action === 'register') {
      if (!name || !email || !department) {
        return NextResponse.json({ error: 'Name, email, and department are required.' }, { status: 400 });
      }

      if (!email.includes('@')) {
        return NextResponse.json({ error: 'Please enter a valid student email address.' }, { status: 400 });
      }

      const user = MockStore.registerStudent(name, email, department);
      return NextResponse.json({ success: true, user });
    }

    if (action === 'login') {
      if (!email) {
        return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
      }

      const targetRole = role === 'ADMIN' ? 'ADMIN' : 'STUDENT';
      const user = MockStore.login(email, targetRole);
      return NextResponse.json({ success: true, user });
    }

    if (action === 'logout') {
      MockStore.logout();
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Authentication error.' }, { status: 400 });
  }
}
