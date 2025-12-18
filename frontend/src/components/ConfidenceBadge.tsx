import React from 'react';

interface ConfidenceBadgeProps {
    confidence: number;
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ confidence }) => {
    const percentage = Math.round(confidence * 100);

    const getColor = () => {
        if (confidence >= 0.9) return 'bg-green-100 text-green-800 border-green-300';
        if (confidence >= 0.7) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        return 'bg-red-100 text-red-800 border-red-300';
    };

    const getEmoji = () => {
        if (confidence >= 0.9) return '✅';
        if (confidence >= 0.7) return '⚠️';
        return '❌';
    };

    return (
        <div
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${getColor()}`}
            title={`Confidence: ${percentage}%`}
        >
            <span>{getEmoji()}</span>
            <span>{percentage}%</span>
        </div>
    );
};
