export interface TimeBlock {
    start: string;
    end: string;
    subject: string;
    notes: string;
    confidence: number;
}

export interface DaySchedule {
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    blocks: TimeBlock[];
}

export interface Timetable {
    timetableId: string;
    days: DaySchedule[];
}

export interface UploadResponse {
    status: 'success' | 'error';
    data?: Timetable;
    message?: string;
    metadata?: {
        extractionMethod: string;
        processingTime: number;
        originalFilename?: string;
        repaired?: boolean;
    };
}
