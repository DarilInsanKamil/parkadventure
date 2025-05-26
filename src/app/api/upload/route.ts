import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'gallery';

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create the directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'images', folder);
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Generate a unique filename with timestamp
    const timestamp = Date.now();
    const filename = file.name.replace(/\s+/g, '-').toLowerCase();
    const finalFilename = `${timestamp}-${filename}`;
    const filePath = join(uploadDir, finalFilename);

    // Write the file to disk
    await writeFile(filePath, buffer);

    // Return the path that will be accessible from the frontend
    // Always include leading slash for consistency
    const publicPath = `/images/${folder}/${finalFilename}`;

    // Log path for debugging
    console.log('Image saved successfully:', publicPath);

    return NextResponse.json({ 
      success: true, 
      path: publicPath 
    });
    
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
} 