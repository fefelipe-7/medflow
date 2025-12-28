import { useState } from 'react';
import { QuarantineItem } from '../../../../types';

export type Step = 'context' | 'inspection' | 'analysis' | 'decision';

interface FormData {
    pkgIntegrity: string;
    labelingOk: boolean;
    visualContamination: boolean;
    inspectionNotes: string;
    invoiceOk: boolean;
    certificateOk: boolean;
    recommendation: string;
    finalDecision: string;
}

export const useQuarantineWorkflow = (item: QuarantineItem, onComplete: () => void) => {
    const [currentStep, setCurrentStep] = useState<Step>('context');
    const [formData, setFormData] = useState<FormData>({
        pkgIntegrity: 'intact',
        labelingOk: true,
        visualContamination: false,
        inspectionNotes: '',
        invoiceOk: true,
        certificateOk: false,
        recommendation: '',
        finalDecision: ''
    });

    const calculateRisk = () => {
        let score = item.riskScore; // Base score
        if (formData.visualContamination) score += 40;
        if (!formData.invoiceOk) score += 30;
        if (formData.pkgIntegrity === 'damaged') score += 20;
        return Math.min(score, 100);
    };

    const stepsArray = [
        { id: 'context', label: 'Contexto' },
        { id: 'inspection', label: 'Inspeção' },
        { id: 'analysis', label: 'Análise & Risco' },
        { id: 'decision', label: 'Decisão' },
    ];

    const handleNext = () => {
        const currentIndex = stepsArray.findIndex(s => s.id === currentStep);
        if (currentIndex < stepsArray.length - 1) {
            setCurrentStep(stepsArray[currentIndex + 1].id as Step);
        } else {
            onComplete();
        }
    };

    return {
        currentStep,
        setCurrentStep,
        formData,
        setFormData,
        calculateRisk,
        handleNext,
        stepsArray
    };
};
