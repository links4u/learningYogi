import React, { useState } from 'react';
import { UploadBox } from '../components/UploadBox';
import { TimetableGrid } from '../components/TimetableGrid';
import { Timetable } from '../types';

export const Home: React.FC = () => {
    const [timetable, setTimetable] = useState<Timetable | null>(null);

    const handleUploadSuccess = (uploadedTimetable: Timetable) => {
        setTimetable(uploadedTimetable);
    };

    const handleReset = () => {
        setTimetable(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
            {/* Header */}
            <header className="bg-white shadow-soft">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-4xl">🎓</span>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                                    Timetable Extractor
                                </h1>
                                <p className="text-sm text-gray-600">AI-powered schedule extraction</p>
                            </div>
                        </div>
                        {timetable && (
                            <button
                                onClick={handleReset}
                                className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
                            >
                                Upload New
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                {!timetable ? (
                    <div className="space-y-8">
                        {/* Hero Section */}
                        <div className="text-center space-y-4 mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                                Extract Your Timetable in Seconds! ⚡
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Upload your timetable image or PDF, and our AI will automatically extract and organize your schedule.
                            </p>
                        </div>

                        {/* Upload Box */}
                        <UploadBox onUploadSuccess={handleUploadSuccess} />

                        {/* Features */}
                        <div className="grid md:grid-cols-3 gap-6 mt-16">
                            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-soft transition-shadow">
                                <div className="text-4xl mb-3">🤖</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">AI-Powered</h3>
                                <p className="text-gray-600">
                                    Uses advanced vision AI to understand your timetable structure
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-soft transition-shadow">
                                <div className="text-4xl mb-3">⚡</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Lightning Fast</h3>
                                <p className="text-gray-600">
                                    Get your organized schedule in seconds, not minutes
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-soft transition-shadow">
                                <div className="text-4xl mb-3">📊</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Confidence Scores</h3>
                                <p className="text-gray-600">
                                    See how confident the AI is about each extracted entry
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Success Message */}
                        <div className="bg-green-50 border-l-4 border-green-500 rounded-xl p-4 shadow-card">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">🎉</span>
                                <div>
                                    <p className="font-bold text-green-800 text-lg">Extraction Complete!</p>
                                    <p className="text-green-700 text-sm">
                                        Your timetable has been successfully extracted and organized.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Timetable Grid */}
                        <TimetableGrid timetable={timetable} />
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="mt-20 py-8 bg-white border-t border-gray-200">
                <div className="container mx-auto px-4 text-center text-gray-600">
                    <p>Built with ❤️ using React, TypeScript, and AI</p>
                </div>
            </footer>
        </div>
    );
};
