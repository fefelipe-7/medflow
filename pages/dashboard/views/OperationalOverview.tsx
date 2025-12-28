import React from 'react';
import { OverviewLayout } from './overview/OverviewLayout';
import { SummaryHeader } from './overview/SummaryHeader';
import { OperationalStatus } from './overview/OperationalStatus';
import { CapacityView } from './overview/CapacityView';
import { FlowMap } from './overview/FlowMap';
import { WorkQueue } from './overview/WorkQueue';
import { AlertsPanel } from './overview/AlertsPanel';
import { KPIPanel } from './overview/KPIPanel';
import { Timeline } from './overview/Timeline';

// Mock Data Imports
import {
    MOCK_HEADER_DATA,
    MOCK_RECEIVING_METRICS,
    MOCK_STOCK_METRICS,
    MOCK_QUARANTINE_METRICS,
    MOCK_CAPACITY_DATA,
    MOCK_FLOW_STAGES,
    MOCK_WORK_QUEUE,
    MOCK_ALERTS,
    MOCK_KPIs,
    MOCK_TIMELINE_EVENTS
} from './overview/constants';

export const OperationalOverview = () => {
    return (
        <OverviewLayout
            header={<SummaryHeader data={MOCK_HEADER_DATA} />}
            status={
                <OperationalStatus
                    receiving={MOCK_RECEIVING_METRICS}
                    stock={MOCK_STOCK_METRICS}
                    quarantine={MOCK_QUARANTINE_METRICS}
                />
            }
            capacity={<CapacityView data={MOCK_CAPACITY_DATA} />}
            flow={<FlowMap stages={MOCK_FLOW_STAGES} />}
            queue={<WorkQueue items={MOCK_WORK_QUEUE} />}
            alerts={<AlertsPanel alerts={MOCK_ALERTS} />}
            kpis={<KPIPanel kpis={MOCK_KPIs} />}
            timeline={<Timeline events={MOCK_TIMELINE_EVENTS} />}
        />
    );
};
