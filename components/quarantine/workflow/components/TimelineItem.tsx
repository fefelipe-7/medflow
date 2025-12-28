import React from 'react';

interface TimelineItemProps {
    date: string;
    title: string;
    user: string;
    active?: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ date, title, user, active }) => (
    <div className="mb-4 last:mb-0 relative">
        <div className={`absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border-2 ${active ? 'bg-brand-500 border-brand-500' : 'bg-slate-900 border-slate-600'}`}></div>
        <div className={`text-sm font-medium ${active ? 'text-brand-400' : 'text-slate-300'}`}>{title}</div>
        <div className="text-xs text-slate-500 mt-0.5">{date} • {user}</div>
    </div>
);
