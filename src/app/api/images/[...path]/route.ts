import { NextRequest, NextResponse } from 'next/server';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;

    if (!path || path.length === 0) {
      return new NextResponse('Image path required', { status: 400 });
    }

    const imagePath = path.join('/');
    console.log('Requested image path:', imagePath);

    
    if (path[0] === 'packages') {
      const packageImagePath = join(process.cwd(), 'public', 'images', 'packages', path[path.length - 1]);
      if (existsSync(packageImagePath)) {
        const file = readFileSync(packageImagePath);
        const contentType = getContentType(path[path.length - 1]);
        return new NextResponse(file, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable'
          }
        });
      }
    }

    // Try different possible locations for the image
    const possibleLocations = [
      join(process.cwd(), 'public', 'images', 'gallery', path[path.length - 1]),         // /images/gallery/filename.jpg
      join(process.cwd(), 'public', 'images', 'packages', path[path.length - 1]),         // /images/gallery/jpg
      join(process.cwd(), 'public', imagePath),                                          // /uploads/path/to/image.jpg
      join(process.cwd(), 'public', 'images', imagePath),                                // /images/path/to/image.jpg
      join(process.cwd(), 'public', 'uploads', imagePath),                               // /uploads/path/to/image.jpg
    ];

    // Find the first location that exists
    let foundPath = null;
    for (const location of possibleLocations) {
      if (existsSync(location)) {
        foundPath = location;
        console.log('Found image at:', foundPath);
        break;
      }
    }

    if (!foundPath) {
      console.error('Image not found:', imagePath);
      return new NextResponse('Image not found', { status: 404 });
    }

    // Read the file and determine content type
    const file = readFileSync(foundPath);
    const filename = path[path.length - 1];
    const contentType = getContentType(filename);

    // Return the image with proper content type
    return new NextResponse(file, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Error serving image', { status: 500 });
  }
}

// Helper to determine MIME type
function getContentType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    case 'svg':
      return 'image/svg+xml';
    default:
      return 'application/octet-stream';
  }
} 