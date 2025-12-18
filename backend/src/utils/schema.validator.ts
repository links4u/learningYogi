import { z } from 'zod';

/**
 * Zod schema for a single time block in the timetable
 */
export const TimeBlockSchema = z.object({
    start: z.string().regex(/^\d{2}:\d{2}$/, 'Start time must be in HH:MM format'),
    end: z.string().regex(/^\d{2}:\d{2}$/, 'End time must be in HH:MM format'),
    subject: z.string().min(1, 'Subject cannot be empty'),
    notes: z.string().default(''),
    confidence: z.number().min(0).max(1).default(0.5),
});

/**
 * Zod schema for a day's schedule
 */
export const DayScheduleSchema = z.object({
    day: z.enum([
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ]),
    blocks: z.array(TimeBlockSchema),
});

/**
 * Zod schema for the complete timetable
 */
export const TimetableSchema = z.object({
    timetableId: z.string().uuid(),
    days: z.array(DayScheduleSchema),
});

/**
 * TypeScript types derived from Zod schemas
 */
export type TimeBlock = z.infer<typeof TimeBlockSchema>;
export type DaySchedule = z.infer<typeof DayScheduleSchema>;
export type Timetable = z.infer<typeof TimetableSchema>;

/**
 * Validates timetable data against the schema
 * @param data - Data to validate
 * @returns Validated and typed timetable data
 * @throws ZodError if validation fails
 */
export function validateTimetable(data: unknown): Timetable {
    return TimetableSchema.parse(data);
}

/**
 * Safe validation that returns success/error result
 * @param data - Data to validate
 * @returns Validation result with success flag and data or error
 */
export function safeTimetableValidation(data: unknown): {
    success: boolean;
    data?: Timetable;
    error?: z.ZodError;
} {
    const result = TimetableSchema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return { success: false, error: result.error };
}
