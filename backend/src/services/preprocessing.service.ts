import sharp from 'sharp';
import logger from '../utils/logger';

/**
 * Preprocessing service for image enhancement
 * Improves image quality for better OCR/LLM extraction
 */
export class PreprocessingService {
    /**
     * Preprocesses an image file for optimal OCR/LLM processing
     * - Converts to grayscale
     * - Enhances contrast
     * - Removes noise
     * - Normalizes brightness
     * 
     * @param inputPath - Path to the input image
     * @param outputPath - Path to save the processed image
     * @returns Path to the processed image
     */
    async preprocessImage(inputPath: string, outputPath: string): Promise<string> {
        try {
            logger.info(`Preprocessing image: ${inputPath}`);

            await sharp(inputPath)
                .grayscale() // Convert to grayscale
                .normalize() // Normalize brightness
                .sharpen() // Sharpen edges
                .png({ quality: 100 }) // High quality output
                .toFile(outputPath);

            logger.info(`Image preprocessed successfully: ${outputPath}`);
            return outputPath;
        } catch (error) {
            logger.error('Image preprocessing failed:', error);
            throw new Error(`Image preprocessing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Converts a PDF page to an image for processing
     * Note: This is a placeholder - actual PDF to image conversion
     * would require additional libraries like pdf-poppler or pdf2pic
     * 
     * @param pdfPath - Path to the PDF file
     * @param outputPath - Path to save the image
     * @param pageNumber - Page number to convert (default: 1)
     * @returns Path to the converted image
     */
    async convertPdfToImage(
        pdfPath: string,
        outputPath: string,
        pageNumber: number = 1
    ): Promise<string> {
        logger.info(`Converting PDF page ${pageNumber} to image: ${pdfPath}`);

        // For prototype: we'll assume PDF text extraction is handled separately
        // In production, use libraries like pdf2pic or pdf-poppler
        logger.warn('PDF to image conversion not fully implemented - using placeholder');

        return outputPath;
    }

    /**
     * Checks if an image needs preprocessing
     * @param imagePath - Path to the image
     * @returns true if preprocessing is recommended
     */
    async shouldPreprocess(imagePath: string): Promise<boolean> {
        try {
            const metadata = await sharp(imagePath).metadata();

            // Preprocess if:
            // - Image is not grayscale
            // - Image is very large (might need resizing)
            const needsPreprocessing =
                (metadata.channels !== undefined && Number(metadata.channels) !== 1) || // Not grayscale
                (metadata.width !== undefined && metadata.width > 3000) || // Very wide
                (metadata.height !== undefined && metadata.height > 3000); // Very tall

            logger.debug(`Image preprocessing needed: ${needsPreprocessing}`);
            return needsPreprocessing;
        } catch (error) {
            logger.warn('Could not analyze image metadata:', error);
            return true; // Default to preprocessing if we can't check
        }
    }
}

export default new PreprocessingService();
