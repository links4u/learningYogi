import request from 'supertest';
import app from '../../src/app';
import path from 'path';

describe('End-to-End Timetable Extraction Flow', () => {
    it('should handle the full upload and extraction lifecycle for a known sample', async () => {
        const testFilePath = path.join(__dirname, '../../../Teacher Timetable Example 1.2.png');

        // 1. Upload the file
        const uploadRes = await request(app)
            .post('/api/timetable/upload')
            .attach('file', testFilePath);

        expect(uploadRes.status).toBe(200);
        const timetable = uploadRes.body.data;
        expect(timetable.timetableId).toBeDefined();
        expect(timetable.days.length).toBeGreaterThan(0);

        // 2. We could potentially add storage retrieval tests here if there was a GET endpoint
        // Since we only have POST /upload for now, we verify the response structure is correct
        // and consistent with our schema.

        expect(uploadRes.body.status).toBe('success');
        expect(uploadRes.body.metadata.originalFilename).toBe('Teacher Timetable Example 1.2.png');
    });
});
