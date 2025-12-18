import normalizationService from '../../src/services/normalization.service';

describe('NormalizationService', () => {
    describe('normalize', () => {
        it('should normalize time formats correctly', () => {
            const rawData = {
                days: [
                    {
                        day: 'Monday' as const,
                        blocks: [
                            {
                                start: '9:00 AM',
                                end: '10:00 AM',
                                subject: 'mathematics',
                                notes: '',
                                confidence: 0.95,
                            },
                        ],
                    },
                ],
            };

            const result = normalizationService.normalize(rawData);

            expect(result.days[0].blocks[0].start).toBe('09:00');
            expect(result.days[0].blocks[0].end).toBe('10:00');
            expect(result.days[0].blocks[0].subject).toBe('Mathematics');
        });

        it('should handle PM times correctly', () => {
            const rawData = {
                days: [
                    {
                        day: 'Monday' as const,
                        blocks: [
                            {
                                start: '2:30 PM',
                                end: '3:45 PM',
                                subject: 'science',
                                notes: '',
                                confidence: 0.9,
                            },
                        ],
                    },
                ],
            };

            const result = normalizationService.normalize(rawData);

            expect(result.days[0].blocks[0].start).toBe('14:30');
            expect(result.days[0].blocks[0].end).toBe('15:45');
        });

        it('should deduplicate identical blocks', () => {
            const rawData = {
                days: [
                    {
                        day: 'Monday' as const,
                        blocks: [
                            {
                                start: '09:00',
                                end: '10:00',
                                subject: 'Math',
                                notes: '',
                                confidence: 0.95,
                            },
                            {
                                start: '09:00',
                                end: '10:00',
                                subject: 'Math',
                                notes: '',
                                confidence: 0.95,
                            },
                        ],
                    },
                ],
            };

            const result = normalizationService.normalize(rawData);

            expect(result.days[0].blocks).toHaveLength(1);
        });

        it('should sort blocks by time', () => {
            const rawData = {
                days: [
                    {
                        day: 'Monday' as const,
                        blocks: [
                            {
                                start: '14:00',
                                end: '15:00',
                                subject: 'Science',
                                notes: '',
                                confidence: 0.9,
                            },
                            {
                                start: '09:00',
                                end: '10:00',
                                subject: 'Math',
                                notes: '',
                                confidence: 0.95,
                            },
                        ],
                    },
                ],
            };

            const result = normalizationService.normalize(rawData);

            expect(result.days[0].blocks[0].subject).toBe('Math');
            expect(result.days[0].blocks[1].subject).toBe('Science');
        });

        it('should generate timetableId if missing', () => {
            const rawData = {
                days: [],
            };

            const result = normalizationService.normalize(rawData);

            expect(result.timetableId).toBeDefined();
            expect(result.timetableId).toMatch(
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
            );
        });
    });
});
