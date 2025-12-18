import sampleDataService from '../../src/services/sample-data.service';

describe('SampleDataService', () => {
    describe('getSampleTimetable', () => {
        it('should recognize "Example 1.1" and return correct data', () => {
            const filename = 'Teacher Timetable Example 1.1.png';
            const result = sampleDataService.getSampleTimetable(filename);

            expect(result).not.toBeNull();
            expect(result?.timetableId).toBe('sample-1.1');
            expect(result?.days).toHaveLength(5);
            expect(result?.days[0].day).toBe('Monday');
        });

        it('should recognize PDF example', () => {
            const filename = 'Teacher Timetable Example 2.pdf';
            const result = sampleDataService.getSampleTimetable(filename);

            expect(result).not.toBeNull();
            expect(result?.timetableId).toBe('sample-2');
        });

        it('should return null for unrecognized files', () => {
            const filename = 'random_file.png';
            const result = sampleDataService.getSampleTimetable(filename);

            expect(result).toBeNull();
        });
    });
});
