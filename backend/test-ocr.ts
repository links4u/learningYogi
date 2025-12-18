import ocrService from './src/services/ocr.service';
import preprocessingService from './src/services/preprocessing.service';
import fs from 'fs/promises';
import path from 'path';

async function testOCR() {
    const imagePath = process.argv[2];

    if (!imagePath) {
        console.log('Usage: tsx test-ocr.ts <image-path>');
        process.exit(1);
    }

    console.log(`Testing OCR on: ${imagePath}\n`);

    try {
        // Preprocess image
        const preprocessedPath = path.join(
            path.dirname(imagePath),
            `test_preprocessed_${path.basename(imagePath)}`
        );

        console.log('Preprocessing image...');
        await preprocessingService.preprocessImage(imagePath, preprocessedPath);

        // Run OCR
        console.log('Running OCR...\n');
        const result = await ocrService.extractText(preprocessedPath);

        console.log('='.repeat(80));
        console.log('OCR RESULT');
        console.log('='.repeat(80));
        console.log(`Confidence: ${result.confidence}`);
        console.log(`Text length: ${result.text.length} characters`);
        console.log('='.repeat(80));
        console.log('EXTRACTED TEXT:');
        console.log('='.repeat(80));
        console.log(result.text);
        console.log('='.repeat(80));

        // Save to file
        const outputPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '_ocr_output.txt');
        await fs.writeFile(outputPath, result.text);
        console.log(`\nSaved OCR output to: ${outputPath}`);

        // Cleanup
        await fs.unlink(preprocessedPath);

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

testOCR();
