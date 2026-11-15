import React from 'react';
import { notFound } from 'next/navigation';
import { getArticleById } from '@/lib/db';
import ArticleEditor from '@/components/studio/ArticleEditor';

interface EditArticlePageProps {
  params: {
    id: string;
  };
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  const article = getArticleById(params.id);

  if (!article) {
    notFound();
  }

  return <ArticleEditor initialArticle={article} isEditing={true} />;
}
