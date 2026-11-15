import { NextRequest, NextResponse } from 'next/server';
import { getCommentsForArticle, getAllComments, addComment, updateCommentStatus } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/server-auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get('articleId');
    const all = searchParams.get('all') === 'true';

    if (all) {
      if (!getAuthenticatedUser(request)) {
        return NextResponse.json({ success: false, error: 'Authentification requise.' }, { status: 401 });
      }
      const comments = getAllComments();
      return NextResponse.json({ success: true, comments });
    }

    if (!articleId) {
      return NextResponse.json({ success: false, error: 'articleId requis' }, { status: 400 });
    }

    const comments = getCommentsForArticle(articleId);
    return NextResponse.json({ success: true, comments });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.articleId || !body.authorName || !body.content) {
      return NextResponse.json({ success: false, error: 'Champs obligatoires manquants' }, { status: 400 });
    }

    const comment = addComment(body);
    return NextResponse.json({ success: true, comment });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (getAuthenticatedUser(request)?.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Accès administrateur requis.' }, { status: 403 });
  }
  try {
    const body = await request.json();
    if (!body.id || !body.status) {
      return NextResponse.json({ success: false, error: 'id et statut requis' }, { status: 400 });
    }

    const success = updateCommentStatus(body.id, body.status);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
