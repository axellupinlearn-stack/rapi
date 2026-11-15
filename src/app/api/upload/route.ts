import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { addMediaFile } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/server-auth';

const UPLOAD_IMAGE_DIR = path.join(process.cwd(), 'public', 'uploads', 'images');
const UPLOAD_VIDEO_DIR = path.join(process.cwd(), 'public', 'uploads', 'videos');

// Permitted mime types and extensions for images and videos
const ALLOWED_MIME_TYPES: Record<string, { ext: string; isVideo: boolean }> = {
  // Images
  'image/jpeg': { ext: '.jpg', isVideo: false },
  'image/png': { ext: '.png', isVideo: false },
  'image/webp': { ext: '.webp', isVideo: false },
  'image/gif': { ext: '.gif', isVideo: false },
  'image/avif': { ext: '.avif', isVideo: false },
  // Videos
  'video/mp4': { ext: '.mp4', isVideo: true },
  'video/webm': { ext: '.webm', isVideo: true },
  'video/quicktime': { ext: '.mov', isVideo: true },
  'video/ogg': { ext: '.ogv', isVideo: true },
};

const MAX_IMAGE_SIZE = 15 * 1024 * 1024; // 15MB for images
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB for video files

export async function POST(request: NextRequest) {
  if (!getAuthenticatedUser(request)) {
    return NextResponse.json({ success: false, error: 'Authentification requise.' }, { status: 401 });
  }
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'Aucun fichier fourni' }, { status: 400 });
    }

    const mime = file.type || '';
    const fileInfo = ALLOWED_MIME_TYPES[mime];

    if (!fileInfo) {
      return NextResponse.json(
        {
          success: false,
          error: 'Format non supporté. Formats acceptés : Images (JPEG, PNG, WebP, GIF, AVIF) et Vidéos (MP4, WebM, MOV, OGG).',
        },
        { status: 400 }
      );
    }

    const maxSize = fileInfo.isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
    if (file.size > maxSize) {
      const maxMb = maxSize / (1024 * 1024);
      return NextResponse.json(
        {
          success: false,
          error: `Le fichier dépasse la taille maximale autorisée (${maxMb} Mo).`,
        },
        { status: 400 }
      );
    }

    const targetDir = fileInfo.isVideo ? UPLOAD_VIDEO_DIR : UPLOAD_IMAGE_DIR;
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const cleanName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/\.[^/.]+$/, '');
    const filename = `${cleanName}-${Date.now()}${fileInfo.ext}`;
    const filePath = path.join(targetDir, filename);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = fileInfo.isVideo
      ? `/uploads/videos/${filename}`
      : `/uploads/images/${filename}`;

    const mediaItem = {
      id: `med-${Date.now()}`,
      name: file.name,
      url: publicUrl,
      size: file.size,
      type: mime,
      isVideo: fileInfo.isVideo,
      createdAt: new Date().toISOString(),
    };

    addMediaFile(mediaItem);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      isVideo: fileInfo.isVideo,
      media: mediaItem,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
