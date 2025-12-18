import { Timetable, DaySchedule } from '../utils/schema.validator';
import logger from '../utils/logger';

/**
 * Service to parse extracted text into timetable structure
 * Used when OCR or PDF text extraction is the primary method
 */
export class TextParserService {
    /**
     * Attempts to parse raw text into timetable structure
     * Uses pattern matching to identify days, times, and subjects
     * @param text - Raw extracted text
     * @returns Partial timetable data
     */
    parseText(text: string): Partial<Timetable> {
        logger.info('Parsing text into timetable structure...');
        logger.debug(`Text to parse (${text.length} chars): ${text.substring(0, 200)}...`);

        const days: DaySchedule[] = [];
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        // If text is too short or empty, return demo data for testing
        if (!text || text.trim().length < 20) {
            logger.warn('Text too short, returning demo timetable');
            return this.getDemoTimetable();
        }

        // Common subject names to look for
        const subjects = [
            'Maths', 'Math', 'Mathematics',
            'English', 'Literacy',
            'Science', 'Physics', 'Chemistry', 'Biology',
            'History', 'Geography',
            'Art', 'Music', 'PE', 'Physical Education', 'PHSE',
            'Computing', 'ICT',
            'RWI', 'Reading'
        ];

        // Split text into lines
        const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        logger.debug(`Processing ${lines.length} lines of text`);

        // Try to find days and their associated subjects
        for (const dayName of dayNames) {
            // Find lines that contain the day name
            const dayLineIndex = lines.findIndex(line =>
                line.toLowerCase().includes(dayName.toLowerCase())
            );

            if (dayLineIndex === -1) {
                logger.debug(`Day ${dayName} not found`);
                continue;
            }

            const dayLine = lines[dayLineIndex];
            logger.info(`Found day line for ${dayName}: ${dayLine}`);

            // Look for subjects in the same line or nearby lines
            const daySchedule: DaySchedule = {
                day: dayName as DaySchedule['day'],
                blocks: [],
            };

            // Extract subjects from the day line and next few lines
            const relevantLines = [
                dayLine,
                ...lines.slice(dayLineIndex + 1, Math.min(dayLineIndex + 5, lines.length))
            ];

            const foundSubjects = new Set<string>();
            const timeSlots: Array<{ start: string, end: string }> = [];

            // Extract time patterns from relevant lines
            for (const line of relevantLines) {
                // Look for time patterns like "1:30-2:30" or "10:35" or "9.30"
                const timeMatches = line.matchAll(/(\d{1,2})[:.](\d{2})\s*[-–]\s*(\d{1,2})[:.](\d{2})/g);
                for (const match of timeMatches) {
                    const startHour = match[1].padStart(2, '0');
                    const startMin = match[2];
                    const endHour = match[3].padStart(2, '0');
                    const endMin = match[4];
                    timeSlots.push({
                        start: `${startHour}:${startMin}`,
                        end: `${endHour}:${endMin}`
                    });
                    logger.debug(`Found time slot: ${startHour}:${startMin} - ${endHour}:${endMin}`);
                }

                // Look for subjects
                for (const subject of subjects) {
                    if (line.toLowerCase().includes(subject.toLowerCase()) && !foundSubjects.has(subject)) {
                        foundSubjects.add(subject);
                        logger.debug(`Found subject: ${subject}`);
                    }
                }
            }

            // Create blocks from found subjects
            const subjectArray = Array.from(foundSubjects);
            logger.info(`Found ${subjectArray.length} subjects for ${dayName}: ${subjectArray.join(', ')}`);

            if (subjectArray.length > 0) {
                // If we have time slots, use them
                if (timeSlots.length > 0) {
                    subjectArray.forEach((subject, index) => {
                        const timeSlot = timeSlots[index] || timeSlots[0];
                        daySchedule.blocks.push({
                            start: timeSlot.start,
                            end: timeSlot.end,
                            subject: subject,
                            notes: 'Extracted from OCR',
                            confidence: 0.6
                        });
                    });
                } else {
                    // No time slots found, use default times
                    const startHour = 9;
                    subjectArray.forEach((subject, index) => {
                        const start = `${(startHour + index).toString().padStart(2, '0')}:00`;
                        const end = `${(startHour + index + 1).toString().padStart(2, '0')}:00`;
                        daySchedule.blocks.push({
                            start,
                            end,
                            subject,
                            notes: 'Time estimated',
                            confidence: 0.5
                        });
                    });
                }

                days.push(daySchedule);
                logger.info(`Added ${daySchedule.blocks.length} blocks for ${dayName}`);
            }
        }

        logger.info(`Parsed ${days.length} days with ${days.reduce((sum, d) => sum + d.blocks.length, 0)} total blocks`);

        // If no days were parsed, return demo data
        if (days.length === 0) {
            logger.warn('No days parsed from text, returning demo timetable');
            return this.getDemoTimetable();
        }

        return { days };
    }

    /**
     * Returns a demo timetable for testing purposes
     */
    private getDemoTimetable(): Partial<Timetable> {
        return {
            days: [
                {
                    day: 'Monday',
                    blocks: [
                        { start: '09:00', end: '10:00', subject: 'Mathematics', notes: 'Demo data', confidence: 0.5 },
                        { start: '10:15', end: '11:15', subject: 'English', notes: 'Demo data', confidence: 0.5 },
                        { start: '11:30', end: '12:30', subject: 'Science', notes: 'Demo data', confidence: 0.5 },
                    ],
                },
                {
                    day: 'Tuesday',
                    blocks: [
                        { start: '09:00', end: '10:00', subject: 'History', notes: 'Demo data', confidence: 0.5 },
                        { start: '10:15', end: '11:15', subject: 'Geography', notes: 'Demo data', confidence: 0.5 },
                        { start: '11:30', end: '12:30', subject: 'Physical Education', notes: 'Demo data', confidence: 0.5 },
                    ],
                },
                {
                    day: 'Wednesday',
                    blocks: [
                        { start: '09:00', end: '10:00', subject: 'Chemistry', notes: 'Demo data', confidence: 0.5 },
                        { start: '10:15', end: '11:15', subject: 'Physics', notes: 'Demo data', confidence: 0.5 },
                        { start: '11:30', end: '12:30', subject: 'Biology', notes: 'Demo data', confidence: 0.5 },
                    ],
                },
            ],
        };
    }
}

export default new TextParserService();
