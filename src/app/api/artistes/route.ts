import { NextRequest, NextResponse } from 'next/server';
import { getArtists, saveArtist } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/server-auth';

export async function GET() {
  try {
    const artists = getArtists();
    return NextResponse.json({ success: true, artists });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (getAuthenticatedUser(request)?.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Accès administrateur requis.' }, { status: 403 });
  }
  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ success: false, error: 'Nom requis' }, { status: 400 });
    }
    const artist = saveArtist(body);
    return NextResponse.json({ success: true, artist });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
