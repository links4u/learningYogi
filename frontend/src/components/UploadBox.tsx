import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadTimetable } from '../utils/api';
import { Timetable } from '../types';

interface UploadBoxProps {
    onUploadSuccess: (timetable: Timetable) => void;
}

export const UploadBox: React.FC<UploadBoxProps> = ({ onUploadSuccess }) => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            if (acceptedFiles.length === 0) return;

            const file = acceptedFiles[0];
            setUploading(true);
            setError(null);
            setProgress(0);

            try {
                const response = await uploadTimetable(file, setProgress);

                if (response.status === 'success' && response.data) {
                    onUploadSuccess(response.data);
                } else {
                    setError(response.message || 'Upload failed');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Upload failed');
            } finally {
                setUploading(false);
                setProgress(0);
            }
        },
        [onUploadSuccess]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        },
        maxFiles: 1,
        disabled: uploading,
    });

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div
                {...getRootProps()}
                className={`
          relative border-4 border-dashed rounded-3xl p-12 text-center cursor-pointer
          transition-all duration-300 ease-in-out
          ${isDragActive
                        ? 'border-primary-500 bg-primary-50 scale-105'
                        : 'border-gray-300 bg-white hover:border-primary-400 hover:bg-primary-50'
                    }
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
          shadow-card hover:shadow-soft
        `}
            >
                <input {...getInputProps()} />

                {uploading ? (
                    <div className="space-y-4">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 mx-auto"></div>
                        <p className="text-lg font-semibold text-gray-700">Processing your timetable...</p>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-primary-500 to-accent-400 h-full transition-all duration-300 rounded-full"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-500">{Math.round(progress)}% complete</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="text-6xl">📚</div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800 mb-2">
                                {isDragActive ? 'Drop your timetable here!' : 'Upload Your Timetable'}
                            </p>
                            <p className="text-gray-600">
                                Drag & drop or click to select
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Supports PDF, JPG, PNG, DOCX
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {error && (
                <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl">
                    <div className="flex items-center">
                        <span className="text-2xl mr-3">⚠️</span>
                        <div>
                            <p className="font-semibold text-red-800">Upload Failed</p>
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
