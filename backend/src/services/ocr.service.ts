import Tesseract from 'tesseract.js';
import logger from '../utils/logger';

/**
 * OCR service using Tesseract.js
 * Fallback extraction method for scanned images and PDFs
 */
export class OCRService {
    private worker: Tesseract.Worker | null = null;

    /**
     * Initializes the Tesseract worker
     */
    async initialize(): Promise<void> {
        if (this.worker) {
            return; // Already initialized
        }

        try {
            logger.info('Initializing Tesseract OCR worker...');
            this.worker = await Tesseract.createWorker('eng');
            logger.info('Tesseract OCR worker initialized successfully');
        } catch (error) {
            logger.error('Failed to initialize Tesseract worker:', error);
            throw new Error('OCR initialization failed');
        }
    }

    /**
     * Extracts text from an image using OCR
     * @param imagePath - Path to the image file
     * @returns Extracted text and confidence score
     */
    async extractText(imagePath: string): Promise<{ text: string; confidence: number }> {
        await this.initialize();

        if (!this.worker) {
            throw new Error('OCR worker not initialized');
        }

        try {
            logger.info(`Running OCR on image: ${imagePath}`);

            const result = await this.worker.recognize(imagePath);

            const text = result.data.text;
            const confidence = result.data.confidence / 100; // Convert to 0-1 scale

            logger.info(`OCR completed. Confidence: ${confidence.toFixed(2)}, Text length: ${text.length}`);

            return { text, confidence };
        } catch (error) {
            logger.error('OCR extraction failed:', error);
            throw new Error(`OCR extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Cleans up the Tesseract worker
     */
    async cleanup(): Promise<void> {
        if (this.worker) {
            logger.info('Terminating Tesseract worker...');
            await this.worker.terminate();
            this.worker = null;
        }
    }
}

export default new OCRService();
