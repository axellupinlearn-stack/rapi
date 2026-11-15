import { NextResponse } from 'next/server';
import { getSiteStats } from '@/lib/db';

export async function GET() {
  try {
    const stats = getSiteStats();
    return NextResponse.json({ success: true, stats });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
