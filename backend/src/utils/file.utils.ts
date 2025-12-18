import fs from 'fs/promises';
import path from 'path';
import { config } from '../config/env';
import logger from './logger';

/**
 * Supported file types for timetable extraction
 */
export enum FileType {
    PDF = 'pdf',
    IMAGE = 'image',
    DOCX = 'docx',
    UNKNOWN = 'unknown',
}

/**
 * Determines the file type based on MIME type
 * @param mimeType - The MIME type of the uploaded file
 * @returns FileType enum value
 */
export function getFileType(mimeType: string): FileType {
    if (mimeType === 'application/pdf') {
        return FileType.PDF;
    }
    if (mimeType.startsWith('image/')) {
        return FileType.IMAGE;
    }
    if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        return FileType.DOCX;
    }
    return FileType.UNKNOWN;
}

/**
 * Validates if the file type is supported
 * @param mimeType - The MIME type to validate
 * @returns true if supported, false otherwise
 */
export function isValidFileType(mimeType: string): boolean {
    return (config.upload.allowedMimeTypes as readonly string[]).includes(mimeType);
}

/**
 * Ensures the upload directory exists
 * Creates it if it doesn't exist
 */
export async function ensureUploadDir(): Promise<void> {
    try {
        await fs.access(config.upload.uploadDir);
    } catch {
        logger.info(`Creating upload directory: ${config.upload.uploadDir}`);
        await fs.mkdir(config.upload.uploadDir, { recursive: true });
    }
}

/**
 * Cleans up a temporary file
 * @param filePath - Path to the file to delete
 */
export async function cleanupFile(filePath: string): Promise<void> {
    try {
        await fs.unlink(filePath);
        logger.debug(`Cleaned up file: ${filePath}`);
    } catch (error) {
        logger.warn(`Failed to cleanup file ${filePath}:`, error);
    }
}

/**
 * Gets the file extension from a filename
 * @param filename - The filename to extract extension from
 * @returns The file extension (without dot)
 */
export function getFileExtension(filename: string): string {
    return path.extname(filename).slice(1).toLowerCase();
}

/**
 * Generates a safe filename with timestamp
 * @param originalName - Original filename
 * @returns Safe filename with timestamp
 */
export function generateSafeFilename(originalName: string): string {
    const timestamp = Date.now();
    const safeName = originalName
        .replace(/[^a-zA-Z0-9.-]/g, '_')
        .substring(0, 50);
    return `${timestamp}_${safeName}`;
}
