import { NextRequest, NextResponse } from 'next/server';
import { getArticles, saveArticle } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/server-auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const user = getAuthenticatedUser(request);
    if (status && status !== 'published' && !user) {
      return NextResponse.json({ success: false, error: 'Authentification requise.' }, { status: 401 });
    }
    const category = searchParams.get('category') || undefined;
    const tag = searchParams.get('tag') || undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const featured = searchParams.get('featured') === 'true';

    const articles = getArticles({
      status: status || (user ? undefined : 'published'),
      category,
      tag,
      limit,
      featuredOnly: featured,
    });

    return NextResponse.json({ success: true, articles });
  } catch (error: any) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = getAuthenticatedUser(request);
  if (!user) {
    return NextResponse.json({ success: false, error: 'Authentification requise.' }, { status: 401 });
  }
  try {
    const body = await request.json();
    if (!body.title || !body.summary) {
      return NextResponse.json(
        { success: false, error: 'Le titre et le résumé sont obligatoires.' },
        { status: 400 }
      );
    }

    const saved = saveArticle({
      ...body,
      status: user.role === 'admin' ? body.status : body.status === 'draft' ? 'draft' : 'pending',
    });
    return NextResponse.json({ success: true, article: saved });
  } catch (error: any) {
    console.error('Error saving article:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
