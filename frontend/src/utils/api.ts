import axios from 'axios';
import { UploadResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Uploads a timetable file for extraction
 * @param file - File to upload
 * @param onProgress - Optional progress callback
 * @returns Upload response with extracted timetable data
 */
export async function uploadTimetable(
    file: File,
    onProgress?: (progress: number) => void
): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post<UploadResponse>(
        `${API_BASE_URL}/timetable/upload`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (onProgress && progressEvent.total) {
                    const progress = (progressEvent.loaded / progressEvent.total) * 100;
                    onProgress(progress);
                }
            },
        }
    );

    return response.data;
}
