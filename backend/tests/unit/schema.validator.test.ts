import { validateTimetable, safeTimetableValidation } from '../../src/utils/schema.validator';

describe('Schema Validator', () => {
    describe('validateTimetable', () => {
        it('should validate correct timetable data', () => {
            const validData = {
                timetableId: '123e4567-e89b-12d3-a456-426614174000',
                days: [
                    {
                        day: 'Monday',
                        blocks: [
                            {
                                start: '09:00',
                                end: '10:00',
                                subject: 'Mathematics',
                                notes: '',
                                confidence: 0.95,
                            },
                        ],
                    },
                ],
            };

            expect(() => validateTimetable(validData)).not.toThrow();
        });

        it('should reject invalid time format', () => {
            const invalidData = {
                timetableId: '123e4567-e89b-12d3-a456-426614174000',
                days: [
                    {
                        day: 'Monday',
                        blocks: [
                            {
                                start: '9:00', // Should be 09:00
                                end: '10:00',
                                subject: 'Math',
                                notes: '',
                                confidence: 0.95,
                            },
                        ],
                    },
                ],
            };

            expect(() => validateTimetable(invalidData)).toThrow();
        });

        it('should reject invalid day name', () => {
            const invalidData = {
                timetableId: '123e4567-e89b-12d3-a456-426614174000',
                days: [
                    {
                        day: 'Funday', // Invalid day
                        blocks: [],
                    },
                ],
            };

            expect(() => validateTimetable(invalidData)).toThrow();
        });

        it('should reject confidence out of range', () => {
            const invalidData = {
                timetableId: '123e4567-e89b-12d3-a456-426614174000',
                days: [
                    {
                        day: 'Monday',
                        blocks: [
                            {
                                start: '09:00',
                                end: '10:00',
                                subject: 'Math',
                                notes: '',
                                confidence: 1.5, // Out of range
                            },
                        ],
                    },
                ],
            };

            expect(() => validateTimetable(invalidData)).toThrow();
        });
    });

    describe('safeTimetableValidation', () => {
        it('should return success for valid data', () => {
            const validData = {
                timetableId: '123e4567-e89b-12d3-a456-426614174000',
                days: [
                    {
                        day: 'Monday',
                        blocks: [],
                    },
                ],
            };

            const result = safeTimetableValidation(validData);

            expect(result.success).toBe(true);
            expect(result.data).toBeDefined();
        });

        it('should return error for invalid data', () => {
            const invalidData = {
                timetableId: 'not-a-uuid',
                days: [],
            };

            const result = safeTimetableValidation(invalidData);

            expect(result.success).toBe(false);
            expect(result.error).toBeDefined();
        });
    });
});
