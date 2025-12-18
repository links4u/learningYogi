import React from 'react';
import { Timetable, DaySchedule, TimeBlock } from '../types';
import { ConfidenceBadge } from './ConfidenceBadge';

interface TimetableGridProps {
    timetable: Timetable;
}

export const TimetableGrid: React.FC<TimetableGridProps> = ({ timetable }) => {
    // Get all unique time slots across all days
    const getAllTimeSlots = (): string[] => {
        const times = new Set<string>();
        timetable.days.forEach(day => {
            day.blocks.forEach(block => {
                times.add(block.start);
            });
        });
        return Array.from(times).sort();
    };

    const timeSlots = getAllTimeSlots();

    // Subject colors for visual distinction
    const subjectColors: Record<string, string> = {};
    const colorPalette = [
        'bg-blue-100 border-blue-300 text-blue-900',
        'bg-purple-100 border-purple-300 text-purple-900',
        'bg-pink-100 border-pink-300 text-pink-900',
        'bg-green-100 border-green-300 text-green-900',
        'bg-yellow-100 border-yellow-300 text-yellow-900',
        'bg-indigo-100 border-indigo-300 text-indigo-900',
        'bg-red-100 border-red-300 text-red-900',
        'bg-teal-100 border-teal-300 text-teal-900',
    ];

    const getSubjectColor = (subject: string): string => {
        if (!subjectColors[subject]) {
            const colorIndex = Object.keys(subjectColors).length % colorPalette.length;
            subjectColors[subject] = colorPalette[colorIndex];
        }
        return subjectColors[subject];
    };

    const findBlockAtTime = (day: DaySchedule, time: string): TimeBlock | null => {
        return day.blocks.find(block => block.start === time) || null;
    };

    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-max bg-white rounded-3xl shadow-soft p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <span>📅</span>
                    <span>Your Timetable</span>
                </h2>

                {/* Grid Container */}
                <div className="grid gap-4" style={{ gridTemplateColumns: `120px repeat(${timetable.days.length}, minmax(150px, 1fr))` }}>
                    {/* Header Row */}
                    <div className="font-bold text-gray-700 flex items-center justify-center">
                        Time
                    </div>
                    {timetable.days.map(day => (
                        <div
                            key={day.day}
                            className="font-bold text-center py-3 px-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl shadow-card"
                        >
                            {day.day}
                        </div>
                    ))}

                    {/* Time Rows */}
                    {timeSlots.map(time => (
                        <React.Fragment key={time}>
                            {/* Time Label */}
                            <div className="font-semibold text-gray-600 flex items-center justify-center bg-gray-50 rounded-xl px-2">
                                {time}
                            </div>

                            {/* Day Cells */}
                            {timetable.days.map(day => {
                                const block = findBlockAtTime(day, time);

                                return (
                                    <div
                                        key={`${day.day}-${time}`}
                                        className={`
                      min-h-[100px] rounded-xl border-2 p-3 transition-all duration-200
                      ${block ? `${getSubjectColor(block.subject)} hover:scale-105 cursor-pointer` : 'bg-gray-50 border-gray-200'}
                    `}
                                    >
                                        {block && (
                                            <div className="h-full flex flex-col justify-between">
                                                <div>
                                                    <p className="font-bold text-sm mb-1">{block.subject}</p>
                                                    <p className="text-xs opacity-75">
                                                        {block.start} - {block.end}
                                                    </p>
                                                    {block.notes && (
                                                        <p className="text-xs mt-2 italic">{block.notes}</p>
                                                    )}
                                                </div>
                                                <div className="mt-2">
                                                    <ConfidenceBadge confidence={block.confidence} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>

                {/* Legend */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm font-semibold text-gray-700 mb-2">📊 Confidence Levels:</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                        <div className="flex items-center gap-1">
                            <span>✅</span>
                            <span className="text-gray-600">90%+ High confidence</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>⚠️</span>
                            <span className="text-gray-600">70-89% Medium confidence</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>❌</span>
                            <span className="text-gray-600">&lt;70% Low confidence</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
