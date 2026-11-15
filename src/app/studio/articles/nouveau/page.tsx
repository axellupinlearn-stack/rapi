import React from 'react';
import ArticleEditor from '@/components/studio/ArticleEditor';

export const metadata = {
  title: 'Rédiger un Article — Studio RAP IVOIRE',
};

export default function NouveauArticlePage() {
  return <ArticleEditor isEditing={false} />;
}
