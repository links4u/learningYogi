import request from 'supertest';
import app from '../../src/app';
import path from 'path';
import fs from 'fs';

describe('Upload API Integration', () => {
    const testFilePath = path.join(__dirname, '../../../Teacher Timetable Example 1.1.png');

    it('should return 400 if no file is uploaded', async () => {
        const response = await request(app)
            .post('/api/timetable/upload')
            .send();

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
    });

    it('should successfully process a sample file and return hardcoded data', async () => {
        // Ensure test file exists
        if (!fs.existsSync(testFilePath)) {
            console.warn('Test file missing, skipping integration test');
            return;
        }

        const response = await request(app)
            .post('/api/timetable/upload')
            .attach('file', testFilePath);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.metadata.extractionMethod).toBe('sample-data');
        expect(response.body.data.days).toHaveLength(5);
    });
});
