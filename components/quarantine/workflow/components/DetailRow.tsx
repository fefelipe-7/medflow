import React from 'react';

interface DetailRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

export const DetailRow: React.FC<DetailRowProps> = ({ label, value, highlight }) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-900 last:border-0">
    <span className="text-sm text-slate-500">{label}</span>
    <span className={`text-sm font-medium ${highlight ? 'text-amber-400' : 'text-slate-200'}`}>{value}</span>
  </div>
);
