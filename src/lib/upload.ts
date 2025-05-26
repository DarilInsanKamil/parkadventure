import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

// Default upload directory
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Make sure upload directory exists
export function ensureUploadDir(dir = UPLOAD_DIR) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}

// Save file from buffer
export async function saveFile(
  buffer: Buffer,
  filename: string,
  directory = UPLOAD_DIR
): Promise<string> {
  ensureUploadDir(directory);
  
  // Generate unique filename to prevent overwriting
  const ext = path.extname(filename);
  const uuid = randomUUID();
  const newFilename = `${uuid}${ext}`;
  const filePath = path.join(directory, newFilename);
  
  // Write file to disk
  await fs.promises.writeFile(filePath, buffer);
  
  // Return the relative path for database storage
  return `/uploads/${newFilename}`;
}

// Delete file
export async function deleteFile(filePath: string): Promise<boolean> {
  try {
    // Extract filename from database path
    const filename = path.basename(filePath);
    const fullPath = path.join(UPLOAD_DIR, filename);
    
    // Check if file exists
    if (fs.existsSync(fullPath)) {
      await fs.promises.unlink(fullPath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
} 