import fs from 'fs/promises';
import path from 'path';
import logger from '../utils/logger';
import { Timetable } from '../utils/schema.validator';

/**
 * Storage service for persisting timetable data
 * In production, this would connect to a database
 * For prototype, uses JSON file storage
 */
export class StorageService {
    private readonly storageDir = path.join(process.cwd(), 'data');

    /**
     * Initializes storage directory
     */
    async initialize(): Promise<void> {
        try {
            await fs.access(this.storageDir);
        } catch {
            logger.info(`Creating storage directory: ${this.storageDir}`);
            await fs.mkdir(this.storageDir, { recursive: true });
        }
    }

    /**
     * Saves a timetable to storage
     * @param timetable - Timetable data to save
     * @returns Saved timetable with ID
     */
    async saveTimetable(timetable: Timetable): Promise<Timetable> {
        await this.initialize();

        const filePath = path.join(this.storageDir, `${timetable.timetableId}.json`);

        try {
            await fs.writeFile(filePath, JSON.stringify(timetable, null, 2), 'utf-8');
            logger.info(`Timetable saved: ${timetable.timetableId}`);
            return timetable;
        } catch (error) {
            logger.error('Failed to save timetable:', error);
            throw new Error('Failed to save timetable');
        }
    }

    /**
     * Retrieves a timetable by ID
     * @param timetableId - ID of the timetable
     * @returns Timetable data or null if not found
     */
    async getTimetable(timetableId: string): Promise<Timetable | null> {
        const filePath = path.join(this.storageDir, `${timetableId}.json`);

        try {
            const data = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(data) as Timetable;
        } catch (error) {
            logger.warn(`Timetable not found: ${timetableId}`);
            return null;
        }
    }

    /**
     * Lists all stored timetables
     * @returns Array of timetable IDs
     */
    async listTimetables(): Promise<string[]> {
        await this.initialize();

        try {
            const files = await fs.readdir(this.storageDir);
            return files
                .filter(file => file.endsWith('.json'))
                .map(file => file.replace('.json', ''));
        } catch (error) {
            logger.error('Failed to list timetables:', error);
            return [];
        }
    }

    /**
     * Deletes a timetable by ID
     * @param timetableId - ID of the timetable to delete
     * @returns true if deleted, false if not found
     */
    async deleteTimetable(timetableId: string): Promise<boolean> {
        const filePath = path.join(this.storageDir, `${timetableId}.json`);

        try {
            await fs.unlink(filePath);
            logger.info(`Timetable deleted: ${timetableId}`);
            return true;
        } catch (error) {
            logger.warn(`Failed to delete timetable: ${timetableId}`);
            return false;
        }
    }
}

export default new StorageService();
