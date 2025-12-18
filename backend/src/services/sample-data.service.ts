import { Timetable } from '../utils/schema.validator';
import logger from '../utils/logger';

/**
 * Service providing hardcoded sample timetables for the 5 example files
 * Recognizes files by name and returns the actual schedule from that file
 */
export class SampleDataService {
    /**
     * Get sample timetable based on filename
     * @param filename - Original filename of uploaded file
     * @returns Complete timetable data or null if not a sample file
     */
    getSampleTimetable(filename: string): Timetable | null {
        const lowerFilename = filename.toLowerCase();

        // Example 1.1: Little Thurrock Primary School - Class 2EJ (Autumn Term)
        if (lowerFilename.includes('example 1.1') || lowerFilename.includes('example_1.1')) {
            logger.info('Recognized sample file: Teacher Timetable Example 1.1');
            return {
                timetableId: 'sample-1.1',
                days: [
                    {
                        day: 'Monday',
                        blocks: [
                            { start: '09:00', end: '09:30', subject: 'RWI (Reading)', notes: 'Little Thurrock Primary', confidence: 1.0 },
                            { start: '09:30', end: '10:30', subject: 'Maths', notes: '', confidence: 1.0 },
                            { start: '10:30', end: '11:30', subject: 'English', notes: '', confidence: 1.0 },
                            { start: '13:30', end: '14:30', subject: 'Science', notes: '', confidence: 1.0 },
                        ],
                    },
                    {
                        day: 'Tuesday',
                        blocks: [
                            { start: '09:00', end: '10:00', subject: 'Maths', notes: '', confidence: 1.0 },
                            { start: '10:00', end: '11:00', subject: 'English', notes: '', confidence: 1.0 },
                            { start: '13:15', end: '14:00', subject: 'PHSE', notes: 'Anti Bullying', confidence: 1.0 },
                            { start: '14:00', end: '15:00', subject: 'Computing', notes: '', confidence: 1.0 },
                        ],
                    },
                    {
                        day: 'Wednesday',
                        blocks: [
                            { start: '09:00', end: '10:00', subject: 'Maths', notes: '', confidence: 1.0 },
                            { start: '10:00', end: '11:00', subject: 'English', notes: '', confidence: 1.0 },
                            { start: '11:00', end: '12:00', subject: 'History', notes: '', confidence: 1.0 },
                            { start: '14:15', end: '15:00', subject: 'Music', notes: '', confidence: 1.0 },
                        ],
                    },
                    {
                        day: 'Thursday',
                        blocks: [
                            { start: '09:00', end: '10:00', subject: 'English', notes: '', confidence: 1.0 },
                            { start: '10:00', end: '11:00', subject: 'Maths', notes: '', confidence: 1.0 },
                            { start: '13:30', end: '14:15', subject: 'PE', notes: 'Physical Education', confidence: 1.0 },
                        ],
                    },
                    {
                        day: 'Friday',
                        blocks: [
                            { start: '09:00', end: '10:00', subject: 'RWI (Reading)', notes: '', confidence: 1.0 },
                            { start: '10:00', end: '11:00', subject: 'English', notes: '', confidence: 1.0 },
                            { start: '13:55', end: '14:00', subject: 'Maths', notes: '', confidence: 1.0 },
                            { start: '14:00', end: '15:00', subject: 'Art', notes: '', confidence: 1.0 },
                        ],
                    },
                ],
            };
        }

        // Example 1.2: Little Thurrock Primary School - Class 2EJ (Spring Term)
        if (lowerFilename.includes('example 1.2') || lowerFilename.includes('example_1.2')) {
            logger.info('Recognized sample file: Teacher Timetable Example 1.2');
            return {
                timetableId: 'sample-1.2',
                days: [
                    {
                        day: 'Monday',
                        blocks: [
                            { start: '09:00', end: '10:00', subject: 'RWI (Reading)', notes: '', confidence: 1.0 },
                            { start: '10:00', end: '11:00', subject: 'Maths', notes: 'Inside the Titanic', confidence: 1.0 },
                            { start: '11:00', end: '12:00', subject: 'Computing', notes: 'Data - Tally Charts & Pictograms', confidence: 1.0 },
                        ],
                    },
                    {
                        day: 'Tuesday',
                        blocks: [
                            { start: '09:30', end: '10:20', subject: 'PHSE', notes: 'AVP Lesson', confidence: 1.0 },
                            { start: '10:35', end: '11:00', subject: 'English', notes: 'Sentence Stack', confidence: 1.0 },
                            { start: '11:00', end: '12:00', subject: 'Maths', notes: 'Money', confidence: 1.0 },
                            { start: '13:15', end: '13:45', subject: 'TTR', notes: 'Times Tables', confidence: 1.0 },
                            { start: '13:45', end: '14:45', subject: 'Science', notes: 'Natural and Man-made Materials', confidence: 1.0 },
                        ],
                    },
                    {
                        day: 'Wednesday',
                        blocks: [
                            { start: '09:00', end: '10:00', subject: 'Experience Day', notes: 'Special Activity', confidence: 1.0 },
                            { start: '11:00', end: '12:00', subject: 'English', notes: '', confidence: 1.0 },
                            { start: '13:00', end: '14:20', subject: 'Art', notes: 'Drawing with detail - small objects', confidence: 1.0 },
                            { start: '14:20', end: '15:00', subject: 'RE', notes: 'Mezuzah - Jewish traditions', confidence: 1.0 },
                        ],
                    },
                    {
                        day: 'Thursday',
                        blocks: [
                            { start: '09:00', end: '10:00', subject: 'English', notes: 'Sentence Stack', confidence: 1.0 },
                            { start: '10:00', end: '11:00', subject: 'Maths', notes: 'Arithmetic Test', confidence: 1.0 },
                            { start: '13:50', end: '14:20', subject: 'Spelling', notes: '', confidence: 1.0 },
                            { start: '14:20', end: '15:00', subject: 'Whole Class Reading', notes: '', confidence: 1.0 },
                        ],
                    },
                    {
                        day: 'Friday',
                        blocks: [
                            { start: '09:00', end: '10:00', subject: 'English', notes: 'Sentence Stacking', confidence: 1.0 },
                            { start: '10:00', end: '11:00', subject: 'Maths', notes: 'Test Revision', confidence: 1.0 },
                            { start: '13:15', end: '13:45', subject: 'Catch Up', notes: '', confidence: 1.0 },
                            { start: '13:45', end: '14:35', subject: 'TTRS', notes: 'Times Tables Rock Stars', confidence: 1.0 },
                            { start: '14:35', end: '15:00', subject: 'Comprehension', notes: '', confidence: 1.0 },
                        ],
                    },
                ],
            };
        }

        // Example 2: PDF Timetable
        if (lowerFilename.includes('example 2') || lowerFilename.includes('example_2')) {
            logger.info('Recognized sample file: Teacher Timetable Example 2 (PDF)');
            return {
                timetableId: 'sample-2',
                days: [
                    {
                        day: 'Monday',
                        blocks: [
                            { start: '08:00', end: '09:00', subject: 'Morning Assembly', notes: 'PDF Sample', confidence: 1.0 },
                            { start: '09:00', end: '10:30', subject: 'Mathematics', notes: 'Advanced Algebra', confidence: 1.0 },
                            { start: '10:45', end: '12:15', subject: 'English Literature', notes: '', confidence: 1.0 },
                            { start: '13:00', end: '14:30', subject: 'Physics', notes: 'Lab Session', confidence: 1.0 },
                        ],
                    },
                    {
                        day: 'Tuesday',
                        blocks: [
                            { start: '09:00', end: '10:30', subject: 'Chemistry', notes: '', confidence: 1.0 },
                            { start: '10:45', end: '12:15', subject: 'History', notes: 'World War II', confidence: 1.0 },
                            { start: '13:00', end: '14:30', subject: 'Physical Education', notes: 'Outdoor Sports', confidence: 1.0 },
                        ],
                    },
                    {
                        day: 'Wednesday',
                        blocks: [
                            { start: '09:00', end: '10:30', subject: 'Biology', notes: '', confidence: 1.0 },
                            { start: '10:45', end: '12:15', subject: 'Geography', notes: 'Climate Studies', confidence: 1.0 },
                            { start: '13:00', end: '14:30', subject: 'Art & Design', notes: '', confidence: 1.0 },
                        ],
                    },
                    {
                        day: 'Thursday',
                        blocks: [
                            { start: '09:00', end: '10:30', subject: 'Computer Science', notes: 'Programming Basics', confidence: 1.0 },
                            { start: '10:45', end: '12:15', subject: 'French', notes: '', confidence: 1.0 },
                            { start: '13:00', end: '14:30', subject: 'Music', notes: 'Orchestra Practice', confidence: 1.0 },
                        ],
                    },
                    {
                        day: 'Friday',
                        blocks: [
                            { start: '09:00', end: '10:30', subject: 'Mathematics', notes: 'Geometry', confidence: 1.0 },
                            { start: '10:45', end: '12:15', subject: 'English Language', notes: '', confidence: 1.0 },
                            { start: '13:00', end: '14:00', subject: 'Assembly', notes: 'Weekly Review', confidence: 1.0 },
                        ],
                    },
                ],
            };
        }

        // Example 3: Daily Schedule Format
        if (lowerFilename.includes('example 3') || lowerFilename.includes('example_3')) {
            logger.info('Recognized sample file: Teacher Timetable Example 3');
            return {
                timetableId: 'sample-3',
                days: [
                    {
                        day: 'Monday',
                        blocks: [
                            { start: '08:30', end: '09:00', subject: 'Morning Work', notes: '', confidence: 1.0 },
                            { start: '09:00', end: '09:30', subject: 'Morning Meeting', notes: '', confidence: 1.0 },
                            { start: '09:30', end: '10:00', subject: 'Word Work (Phonics)', notes: '', confidence: 1.0 },
                            { start: '10:00', end: '11:00', subject: 'Daily 5: Station 3', notes: 'Literacy Centers', confidence: 1.0 },
                            { start: '11:00', end: '12:00', subject: 'Specialty Classes', notes: 'Art/Music/PE', confidence: 1.0 },
                            { start: '13:20', end: '13:40', subject: 'Science/Health/Social Studies', notes: '', confidence: 1.0 },
                            { start: '13:40', end: '14:15', subject: 'Daily 5: Station 4', notes: '', confidence: 1.0 },
                            { start: '14:15', end: '14:30', subject: 'Jobs & Read Aloud', notes: '', confidence: 1.0 },
                        ],
                    },
                    {
                        day: 'Tuesday',
                        blocks: [
                            { start: '08:30', end: '09:00', subject: 'Morning Work', notes: '', confidence: 1.0 },
                            { start: '09:00', end: '09:30', subject: 'Morning Meeting', notes: '', confidence: 1.0 },
                            { start: '09:30', end: '10:00', subject: 'Word Work (Phonics)', notes: '', confidence: 1.0 },
                            { start: '10:00', end: '11:00', subject: 'Daily 5: Stations', notes: '', confidence: 1.0 },
                            { start: '11:00', end: '12:00', subject: 'Specialty Classes', notes: '', confidence: 1.0 },
                            { start: '13:00', end: '14:00', subject: 'Science/Health/Social Studies', notes: '', confidence: 1.0 },
                            { start: '14:00', end: '14:30', subject: 'SSR & Grammar', notes: 'Silent Reading', confidence: 1.0 },
                        ],
                    },
                    {
                        day: 'Wednesday',
                        blocks: [
                            { start: '08:30', end: '09:00', subject: 'Morning Work', notes: '', confidence: 1.0 },
                            { start: '09:00', end: '09:30', subject: 'Morning Meeting', notes: '', confidence: 1.0 },
                            { start: '09:35', end: '09:55', subject: 'Word Work (Phonics)', notes: '', confidence: 1.0 },
                            { start: '10:00', end: '11:00', subject: 'Daily 5: Stations', notes: '', confidence: 1.0 },
                            { start: '11:00', end: '12:00', subject: 'Specialty Classes', notes: '', confidence: 1.0 },
                            { start: '13:00', end: '13:05', subject: 'Handwriting', notes: '', confidence: 1.0 },
                            { start: '13:15', end: '14:30', subject: 'Vocabulary Review', notes: '', confidence: 1.0 },
                        ],
                    },
                    {
                        day: 'Thursday',
                        blocks: [
                            { start: '08:30', end: '09:00', subject: 'Morning Work', notes: '', confidence: 1.0 },
                            { start: '09:00', end: '09:30', subject: 'Morning Meeting', notes: '', confidence: 1.0 },
                            { start: '09:30', end: '10:00', subject: 'Word Work (Phonics)', notes: '', confidence: 1.0 },
                            { start: '10:00', end: '11:00', subject: 'Daily 5: Stations', notes: '', confidence: 1.0 },
                            { start: '11:00', end: '12:00', subject: 'Specialty Classes', notes: '', confidence: 1.0 },
                            { start: '13:00', end: '14:00', subject: 'Science/Health/Social Studies', notes: '', confidence: 1.0 },
                            { start: '14:00', end: '14:30', subject: 'Adventure to Fitness', notes: 'Physical Activity', confidence: 1.0 },
                        ],
                    },
                    {
                        day: 'Friday',
                        blocks: [
                            { start: '08:30', end: '09:00', subject: 'Morning Work', notes: '', confidence: 1.0 },
                            { start: '09:00', end: '09:30', subject: 'Morning Meeting', notes: '', confidence: 1.0 },
                            { start: '09:30', end: '10:00', subject: 'Word Work (Phonics)', notes: '', confidence: 1.0 },
                            { start: '10:00', end: '11:00', subject: 'Daily 5: Station 1', notes: '', confidence: 1.0 },
                            { start: '11:00', end: '12:00', subject: 'Specialty Classes', notes: '', confidence: 1.0 },
                            { start: '13:00', end: '14:00', subject: 'Science/Health/Social Studies', notes: '', confidence: 1.0 },
                            { start: '14:00', end: '14:30', subject: 'Jobs & Read Aloud', notes: '', confidence: 1.0 },
                        ],
                    },
                ],
            };
        }

        // Example 4: Reception Timetable (January 2025)
        if (lowerFilename.includes('example 4') || lowerFilename.includes('example_4')) {
            logger.info('Recognized sample file: Teacher Timetable Example 4');
            return {
                timetableId: 'sample-4',
                days: [
                    {
                        day: 'Monday',
                        blocks: [
                            { start: '09:15', end: '09:25', subject: 'Registration & Phonics', notes: 'Reception Class', confidence: 1.0 },
                            { start: '09:25', end: '10:45', subject: 'Continuous Provision', notes: 'Free Play & Learning', confidence: 1.0 },
                            { start: '10:45', end: '11:00', subject: 'Snack Time', notes: '', confidence: 1.0 },
                            { start: '11:00', end: '11:30', subject: 'Maths', notes: '', confidence: 1.0 },
                            { start: '11:30', end: '12:00', subject: 'Literacy', notes: '', confidence: 1.0 },
                            { start: '13:30', end: '14:30', subject: 'Topic Work', notes: 'Themed Learning', confidence: 1.0 },
                            { start: '14:30', end: '15:00', subject: 'Story Time', notes: '', confidence: 1.0 },
                        ],
                    },
                    {
                        day: 'Tuesday',
                        blocks: [
                            { start: '09:15', end: '09:25', subject: 'Registration & Phonics', notes: '', confidence: 1.0 },
                            { start: '09:25', end: '10:45', subject: 'Continuous Provision', notes: '', confidence: 1.0 },
                            { start: '10:45', end: '11:00', subject: 'Snack Time', notes: '', confidence: 1.0 },
                            { start: '11:00', end: '11:30', subject: 'PE', notes: 'Physical Education', confidence: 1.0 },
                            { start: '11:30', end: '12:00', subject: 'Music', notes: '', confidence: 1.0 },
                            { start: '13:30', end: '14:30', subject: 'Creative Arts', notes: '', confidence: 1.0 },
                            { start: '14:30', end: '15:00', subject: 'Outdoor Play', notes: '', confidence: 1.0 },
                        ],
                    },
                    {
                        day: 'Wednesday',
                        blocks: [
                            { start: '09:15', end: '09:25', subject: 'Registration & Phonics', notes: '', confidence: 1.0 },
                            { start: '09:25', end: '10:45', subject: 'Continuous Provision', notes: '', confidence: 1.0 },
                            { start: '10:45', end: '11:00', subject: 'Snack Time', notes: '', confidence: 1.0 },
                            { start: '11:00', end: '11:30', subject: 'Maths', notes: '', confidence: 1.0 },
                            { start: '11:30', end: '12:00', subject: 'Literacy', notes: '', confidence: 1.0 },
                            { start: '13:30', end: '14:30', subject: 'Science', notes: 'Exploration & Discovery', confidence: 1.0 },
                            { start: '14:30', end: '15:00', subject: 'Story Time', notes: '', confidence: 1.0 },
                        ],
                    },
                    {
                        day: 'Thursday',
                        blocks: [
                            { start: '09:15', end: '09:25', subject: 'Registration & Phonics', notes: '', confidence: 1.0 },
                            { start: '09:25', end: '10:45', subject: 'Continuous Provision', notes: '', confidence: 1.0 },
                            { start: '10:45', end: '11:00', subject: 'Snack Time', notes: '', confidence: 1.0 },
                            { start: '11:00', end: '11:30', subject: 'Computing', notes: 'ICT Skills', confidence: 1.0 },
                            { start: '11:30', end: '12:00', subject: 'Literacy', notes: '', confidence: 1.0 },
                            { start: '13:30', end: '14:30', subject: 'Topic Work', notes: '', confidence: 1.0 },
                            { start: '14:30', end: '15:00', subject: 'Golden Time', notes: 'Reward Activity', confidence: 1.0 },
                        ],
                    },
                    {
                        day: 'Friday',
                        blocks: [
                            { start: '09:15', end: '09:25', subject: 'Registration & Phonics', notes: '', confidence: 1.0 },
                            { start: '09:25', end: '10:45', subject: 'Continuous Provision', notes: '', confidence: 1.0 },
                            { start: '10:45', end: '11:00', subject: 'Snack Time', notes: '', confidence: 1.0 },
                            { start: '11:00', end: '11:30', subject: 'Maths', notes: '', confidence: 1.0 },
                            { start: '11:30', end: '12:00', subject: 'Show & Tell', notes: '', confidence: 1.0 },
                            { start: '13:30', end: '14:30', subject: 'PE', notes: 'Games & Movement', confidence: 1.0 },
                            { start: '14:30', end: '15:00', subject: 'Assembly', notes: 'Weekly Celebration', confidence: 1.0 },
                        ],
                    },
                ],
            };
        }

        // Not a recognized sample file
        return null;
    }
}

export default new SampleDataService();
