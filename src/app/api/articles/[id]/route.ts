import { NextRequest, NextResponse } from 'next/server';
import { getArticleById, saveArticle, deleteArticle, updateArticleStatus } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/server-auth';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const article = getArticleById(params.id);
    if (!article) {
      return NextResponse.json({ success: false, error: 'Article non trouvé' }, { status: 404 });
    }
    if (article.status !== 'published' && !getAuthenticatedUser(request)) {
      return NextResponse.json({ success: false, error: 'Authentification requise.' }, { status: 401 });
    }
    return NextResponse.json({ success: true, article });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const user = getAuthenticatedUser(request);
  if (!user) {
    return NextResponse.json({ success: false, error: 'Authentification requise.' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const article = getArticleById(params.id);
    if (
      user.role !== 'admin' &&
      (body.status === 'published' || article?.status === 'published')
    ) {
      return NextResponse.json({ success: false, error: 'Accès administrateur requis pour publier.' }, { status: 403 });
    }
    const updated = saveArticle({ ...body, id: params.id });
    return NextResponse.json({ success: true, article: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  if (getAuthenticatedUser(request)?.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Accès administrateur requis.' }, { status: 403 });
  }
  try {
    const body = await request.json();
    if (!body.status) {
      return NextResponse.json({ success: false, error: 'Statut manquant' }, { status: 400 });
    }
    const success = updateArticleStatus(params.id, body.status);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (getAuthenticatedUser(request)?.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Accès administrateur requis.' }, { status: 403 });
  }
  try {
    const success = deleteArticle(params.id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
