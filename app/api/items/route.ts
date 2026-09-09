import { NextResponse } from 'next/server';
import { MockStore } from '@/lib/supabase/mockStore';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || undefined;
  const category = searchParams.get('category') || undefined;

  const items = MockStore.searchItems(q, category);
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { item_name, category, description, image_url, quantity, location, condition } = body;

    if (!item_name || !category || !description || !location || !quantity) {
      return NextResponse.json({ error: 'All required item fields must be provided.' }, { status: 400 });
    }

    if (Number(quantity) < 1) {
      return NextResponse.json({ error: 'Quantity must be at least 1.' }, { status: 400 });
    }

    const newItem = MockStore.addItem({
      item_name,
      category,
      description,
      image_url: image_url || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
      quantity: Number(quantity),
      location,
      condition: condition || 'GOOD'
    });

    return NextResponse.json({ success: true, item: newItem });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to add item.' }, { status: 400 });
  }
}
