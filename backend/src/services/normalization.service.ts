import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger';
import { Timetable, DaySchedule, TimeBlock } from '../utils/schema.validator';

/**
 * Normalization service for cleaning and standardizing timetable data
 * Applies business rules and data quality improvements
 */
export class NormalizationService {
    /**
     * Normalizes raw timetable data from LLM/OCR extraction
     * @param rawData - Raw timetable data
     * @returns Normalized and validated timetable
     */
    normalize(rawData: Partial<Timetable>): Timetable {
        logger.info('Starting timetable normalization...');

        // Ensure timetableId exists
        const timetableId = rawData.timetableId || uuidv4();

        // Normalize each day
        const days = (rawData.days || []).map(day => this.normalizeDay(day));

        // Sort days in week order
        const sortedDays = this.sortDaysByWeek(days);

        logger.info(`Normalization complete. Processed ${sortedDays.length} days`);

        return {
            timetableId,
            days: sortedDays,
        };
    }

    /**
     * Normalizes a single day's schedule
     * @param day - Raw day schedule
     * @returns Normalized day schedule
     */
    private normalizeDay(day: DaySchedule): DaySchedule {
        const blocks = (day.blocks || [])
            .map(block => this.normalizeTimeBlock(block))
            .filter(block => block !== null) as TimeBlock[];

        // Sort blocks by start time
        const sortedBlocks = this.sortBlocksByTime(blocks);

        // Fill missing end times
        const filledBlocks = this.fillMissingEndTimes(sortedBlocks);

        // Remove duplicates
        const deduplicatedBlocks = this.deduplicateBlocks(filledBlocks);

        return {
            day: this.normalizeDayName(day.day),
            blocks: deduplicatedBlocks,
        };
    }

    /**
     * Normalizes a single time block
     * @param block - Raw time block
     * @returns Normalized time block or null if invalid
     */
    private normalizeTimeBlock(block: TimeBlock): TimeBlock | null {
        try {
            // Normalize times to HH:MM format
            const start = this.normalizeTime(block.start);
            const end = this.normalizeTime(block.end);

            // Clean subject name
            const subject = this.normalizeSubject(block.subject);

            // Ensure confidence is in valid range
            const confidence = Math.max(0, Math.min(1, block.confidence || 0.5));

            return {
                start,
                end,
                subject,
                notes: block.notes || '',
                confidence,
            };
        } catch (error) {
            logger.warn('Invalid time block, skipping:', error);
            return null;
        }
    }

    /**
     * Normalizes time string to HH:MM format
     * @param time - Time string in various formats
     * @returns Normalized time in HH:MM format
     */
    private normalizeTime(time: string): string {
        // Remove whitespace
        time = time.trim();

        // Handle various formats
        // 9:00 -> 09:00
        // 9.00 -> 09:00
        // 900 -> 09:00
        // 9:00 AM -> 09:00
        // 1:00 PM -> 13:00

        // Remove AM/PM and convert to 24-hour
        let isPM = false;
        if (time.toLowerCase().includes('pm')) {
            isPM = true;
            time = time.toLowerCase().replace('pm', '').trim();
        } else if (time.toLowerCase().includes('am')) {
            time = time.toLowerCase().replace('am', '').trim();
        }

        // Replace dots with colons
        time = time.replace('.', ':');

        // Parse hours and minutes
        let hours: number;
        let minutes: number;

        if (time.includes(':')) {
            const parts = time.split(':');
            hours = parseInt(parts[0], 10);
            minutes = parseInt(parts[1], 10);
        } else if (time.length === 3 || time.length === 4) {
            // Format: 900 or 1430
            hours = parseInt(time.slice(0, -2), 10);
            minutes = parseInt(time.slice(-2), 10);
        } else {
            throw new Error(`Invalid time format: ${time}`);
        }

        // Convert PM to 24-hour
        if (isPM && hours < 12) {
            hours += 12;
        }
        // Convert 12 AM to 00
        if (!isPM && hours === 12) {
            hours = 0;
        }

        // Validate
        if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
            throw new Error(`Invalid time values: ${hours}:${minutes}`);
        }

        // Format as HH:MM
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }

    /**
     * Normalizes subject name
     * @param subject - Raw subject name
     * @returns Cleaned subject name
     */
    private normalizeSubject(subject: string): string {
        // Trim whitespace
        subject = subject.trim();

        // Merge multi-line subjects
        subject = subject.replace(/\s+/g, ' ');

        // Capitalize first letter of each word
        subject = subject
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');

        return subject;
    }

    /**
     * Normalizes day name to standard format
     * @param day - Raw day name
     * @returns Normalized day name
     */
    private normalizeDayName(day: string): DaySchedule['day'] {
        const dayMap: Record<string, DaySchedule['day']> = {
            mon: 'Monday',
            tue: 'Tuesday',
            wed: 'Wednesday',
            thu: 'Thursday',
            fri: 'Friday',
            sat: 'Saturday',
            sun: 'Sunday',
        };

        const normalized = day.toLowerCase().slice(0, 3);
        return dayMap[normalized] || (day as DaySchedule['day']);
    }

    /**
     * Sorts days in week order
     * @param days - Array of day schedules
     * @returns Sorted array
     */
    private sortDaysByWeek(days: DaySchedule[]): DaySchedule[] {
        const order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return days.sort((a, b) => order.indexOf(a.day) - order.indexOf(b.day));
    }

    /**
     * Sorts time blocks by start time
     * @param blocks - Array of time blocks
     * @returns Sorted array
     */
    private sortBlocksByTime(blocks: TimeBlock[]): TimeBlock[] {
        return blocks.sort((a, b) => {
            const aMinutes = this.timeToMinutes(a.start);
            const bMinutes = this.timeToMinutes(b.start);
            return aMinutes - bMinutes;
        });
    }

    /**
     * Fills missing end times using the next block's start time
     * @param blocks - Array of time blocks
     * @returns Array with filled end times
     */
    private fillMissingEndTimes(blocks: TimeBlock[]): TimeBlock[] {
        return blocks.map((block, index) => {
            if (!block.end || block.end === '00:00') {
                // Use next block's start time if available
                if (index < blocks.length - 1) {
                    return { ...block, end: blocks[index + 1].start };
                }
                // Otherwise, add 1 hour
                const startMinutes = this.timeToMinutes(block.start);
                const endMinutes = startMinutes + 60;
                return { ...block, end: this.minutesToTime(endMinutes) };
            }
            return block;
        });
    }

    /**
     * Removes duplicate blocks
     * @param blocks - Array of time blocks
     * @returns Deduplicated array
     */
    private deduplicateBlocks(blocks: TimeBlock[]): TimeBlock[] {
        const seen = new Set<string>();
        return blocks.filter(block => {
            const key = `${block.start}-${block.end}-${block.subject}`;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    }

    /**
     * Converts time string to minutes since midnight
     * @param time - Time in HH:MM format
     * @returns Minutes since midnight
     */
    private timeToMinutes(time: string): number {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }

    /**
     * Converts minutes since midnight to time string
     * @param minutes - Minutes since midnight
     * @returns Time in HH:MM format
     */
    private minutesToTime(minutes: number): string {
        const hours = Math.floor(minutes / 60) % 24;
        const mins = minutes % 60;
        return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    }
}

export default new NormalizationService();
