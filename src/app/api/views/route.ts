import { NextRequest, NextResponse } from 'next/server';
import { incrementArticleViews } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.slug && !body.id) {
      return NextResponse.json({ success: false, error: 'Slug ou ID requis' }, { status: 400 });
    }
    incrementArticleViews(body.slug || body.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
