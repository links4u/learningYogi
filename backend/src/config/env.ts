import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

/**
 * Environment configuration for the application
 * Centralizes all environment variable access with type safety
 */
export const config = {
    // Server configuration
    port: parseInt(process.env.PORT || '3001', 10),
    nodeEnv: process.env.NODE_ENV || 'development',

    // OpenAI configuration
    openai: {
        apiKey: process.env.OPENAI_API_KEY || '',
        model: process.env.OPENAI_MODEL || 'gpt-4o',
    },

    // File upload configuration
    upload: {
        maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10), // 10MB default
        uploadDir: path.resolve(process.env.UPLOAD_DIR || './uploads'),
        allowedMimeTypes: [
            'application/pdf',
            'image/jpeg',
            'image/png',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
    },

    // Logging configuration
    logging: {
        level: process.env.LOG_LEVEL || 'info',
    },
} as const;

/**
 * Validates that all required environment variables are set
 * @throws Error if required variables are missing
 */
export function validateConfig(): void {
    // OpenAI API key is optional - system will fall back to OCR if not provided
    const requiredVars: string[] = [];
    const missing = requiredVars.filter(varName => !process.env[varName]);

    if (missing.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missing.join(', ')}\n` +
            'Please check your .env file.'
        );
    }
}
