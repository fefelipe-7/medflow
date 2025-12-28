import React, { ReactNode } from 'react';

interface OverviewLayoutProps {
    header: ReactNode;
    status: ReactNode;
    capacity: ReactNode;
    flow: ReactNode;
    queue: ReactNode;
    alerts: ReactNode;
    kpis: ReactNode;
    timeline: ReactNode;
}

export const OverviewLayout: React.FC<OverviewLayoutProps> = ({
    header,
    status,
    capacity,
    flow,
    queue,
    alerts,
    kpis,
    timeline,
}) => {
    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 pb-8 px-2 md:px-0">
            {/* Header - Full Width */}
            <div className="w-full">
                {header}
            </div>

            {/* Operational Status - Full Width */}
            <div className="w-full">
                {status}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Left Column (Capacity & Flow) - Takes 8 cols on large screens */}
                <div className="lg:col-span-8 flex flex-col gap-4">
                    {/* Capacity & Occupancy */}
                    <div className="h-auto md:h-[300px]">
                        {capacity}
                    </div>

                    {/* Work Queue */}
                    <div className="h-[400px]">
                        {queue}
                    </div>

                    {/* Flow - Full width of left col */}
                    <div>
                        {flow}
                    </div>
                </div>

                {/* Right Column (Alerts, KPIs, Timeline) - Takes 4 cols on large screens */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    {/* KPIs */}
                    <div>
                        {kpis}
                    </div>

                    {/* Alerts */}
                    <div className="min-h-[250px]">
                        {alerts}
                    </div>

                    {/* Timeline */}
                    <div className="min-h-[300px]">
                        {timeline}
                    </div>
                </div>
            </div>
        </div>
    );
};
