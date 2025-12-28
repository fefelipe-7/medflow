import React, { useState } from 'react';
import { AlertsHeader } from './AlertsHeader';
import { SeverityOverview } from './SeverityOverview';
import { ActiveAlertsList } from './ActiveAlertsList';
import { AlertDetail } from './AlertDetail';
import { AlertAudit } from './AlertAudit';
import { AlertItem } from './types';

import {
    MOCK_ALERTS_HEADER,
    MOCK_ACTIVE_ALERTS,
    MOCK_ALERT_DETAIL,
    MOCK_AUDIT_LOGS
} from './constants';

export const GlobalAlertsCenter = () => {
    const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);

    const handleSelectAlert = (alert: AlertItem) => {
        setSelectedAlert(alert);
    };

    return (
        // Added padding bottom for scrolling content
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 pb-6 px-2 md:px-0 h-[calc(100vh-100px)] md:h-[calc(100vh-120px)] flex flex-col">
            <AlertsHeader data={MOCK_ALERTS_HEADER} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
                {/* Left Column: Severity & List */}
                <div className="lg:col-span-4 flex flex-col gap-6 min-h-0 h-auto lg:h-full shrink-0">
                    <div className="shrink-0">
                        <SeverityOverview alerts={MOCK_ACTIVE_ALERTS} />
                    </div>
                    <div className="h-[500px] lg:flex-1 lg:min-h-0">
                        <ActiveAlertsList
                            alerts={MOCK_ACTIVE_ALERTS}
                            onSelectAlert={handleSelectAlert}
                            selectedAlertId={selectedAlert?.alertId}
                        />
                    </div>
                </div>

                {/* Right Column: Detail & Audit */}
                <div className="lg:col-span-8 flex flex-col gap-6 min-h-0 h-auto lg:h-full shrink-0">
                    <div className="lg:flex-1 lg:min-h-0 overflow-y-auto min-h-[500px]">
                        <AlertDetail alert={selectedAlert ? { ...MOCK_ALERT_DETAIL, ...selectedAlert } : null} />
                    </div>
                    {selectedAlert && (
                        <div className="h-auto lg:h-[250px] shrink-0">
                            <AlertAudit logs={MOCK_AUDIT_LOGS} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
