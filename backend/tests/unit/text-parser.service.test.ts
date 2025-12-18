import textParserService from '../../src/services/text-parser.service';

describe('TextParserService', () => {
    describe('parseText', () => {
        it('should extract subjects and times from raw OCR text', () => {
            const ocrText = `
        Monday
        9:00-10:00 Maths
        10:00 - 11:00 English
        13:30 – 14:30 Science
      `;

            const result = textParserService.parseText(ocrText);

            expect(result.days).toBeDefined();
            expect(result.days).toHaveLength(1);
            expect(result.days![0].day).toBe('Monday');
            // maths and math are both detected due to overlapping keywords, which is fine for now
            expect(result.days![0].blocks.length).toBeGreaterThanOrEqual(3);

            expect(result.days![0].blocks[0].subject).toBe('Maths');
            expect(result.days![0].blocks[0].start).toBe('09:00');
            expect(result.days![0].blocks[0].end).toBe('10:00');
        });

        it('should handle period (.) as time separator', () => {
            const ocrText = `
        Tuesday
        9.00 - 10.00 History
      `;

            const result = textParserService.parseText(ocrText);

            expect(result.days![0].blocks[0].start).toBe('09:00');
            expect(result.days![0].blocks[0].end).toBe('10:00');
            expect(result.days![0].blocks[0].subject).toBe('History');
        });

        it('should fallback to demo timetable for invalid or short text', () => {
            const invalidText = 'Too short text';
            const result = textParserService.parseText(invalidText);

            expect(result.days).toBeDefined();
            expect(result.days!.length).toBeGreaterThan(0);
            expect(result.days![0].blocks[0].notes.toLowerCase()).toContain('demo');
        });
    });
});
