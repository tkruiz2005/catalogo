
import React from 'react';

const SkeletonCard: React.FC = () => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <div className="p-6 animate-pulse">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="h-6 bg-gray-200 rounded w-40 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            </div>
            <div className="space-y-3">
                <div className="flex items-center">
                    <div className="h-4 bg-gray-200 rounded w-12 mr-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-32"></div>
                </div>
            </div>
        </div>
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-end items-center">
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        </div>
    </div>
);


export const LoadingSkeleton: React.FC = () => {
    return (
        <div className="w-full">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        </div>
    );
};