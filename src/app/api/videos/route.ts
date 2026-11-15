import { NextRequest, NextResponse } from 'next/server';
import { getVideos, saveVideo } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/server-auth';

export async function GET() {
  try {
    const videos = getVideos();
    return NextResponse.json({ success: true, videos });
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
    if (!body.title || (!body.youtubeUrl && !body.localVideoUrl)) {
      return NextResponse.json({ success: false, error: 'Titre et source vidéo (fichier téléversé ou lien) requis' }, { status: 400 });
    }
    const video = saveVideo(body);
    return NextResponse.json({ success: true, video });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
