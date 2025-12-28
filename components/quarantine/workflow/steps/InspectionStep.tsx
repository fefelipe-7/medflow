import React from 'react';
import { Activity, FileCheck, FileText } from 'lucide-react';
import { CheckboxField } from '../components/CheckboxField';

interface InspectionStepProps {
    formData: any;
    setFormData: (data: any) => void;
}

export const InspectionStep: React.FC<InspectionStepProps> = ({ formData, setFormData }) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
            <h3 className="text-2xl font-bold text-slate-100">Inspeção Física & Documental</h3>
            <div className="space-y-6">
                <div className="bg-slate-950 p-6 rounded-lg border border-slate-800 space-y-6">
                    <h4 className="text-sm font-semibold text-slate-300 flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-brand-500" />
                        Condições Físicas
                    </h4>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-2">Integridade da Embalagem</label>
                            <select
                                className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-slate-200 text-sm focus:border-brand-500 focus:outline-none"
                                value={formData.pkgIntegrity}
                                onChange={(e) => setFormData({ ...formData, pkgIntegrity: e.target.value })}
                            >
                                <option value="intact">Íntegra</option>
                                <option value="damaged">Avariada / Amassada</option>
                                <option value="violated">Violada</option>
                            </select>
                        </div>
                        <div className="flex items-center space-x-3 pt-6">
                            <input
                                type="checkbox"
                                id="visualContam"
                                className="rounded border-slate-700 bg-slate-900 text-brand-600 focus:ring-brand-500"
                                checked={formData.visualContamination}
                                onChange={(e) => setFormData({ ...formData, visualContamination: e.target.checked })}
                            />
                            <label htmlFor="visualContam" className="text-sm text-slate-300">Sinais Visuais de Contaminação</label>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-950 p-6 rounded-lg border border-slate-800 space-y-6">
                    <h4 className="text-sm font-semibold text-slate-300 flex items-center">
                        <FileCheck className="h-4 w-4 mr-2 text-brand-500" />
                        Conformidade Documental
                    </h4>
                    <div className="space-y-3">
                        <CheckboxField
                            label="Nota Fiscal confere com físico"
                            checked={formData.invoiceOk}
                            onChange={(v: any) => setFormData({ ...formData, invoiceOk: v })}
                        />
                        <CheckboxField
                            label="Certificado de Análise (Laudo) Disponível"
                            checked={formData.certificateOk}
                            onChange={(v: any) => setFormData({ ...formData, certificateOk: v })}
                        />
                    </div>
                </div>

                <div className="bg-slate-950 p-6 rounded-lg border border-slate-800 space-y-4">
                    <h4 className="text-sm font-semibold text-slate-300 flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-brand-500" />
                        Observações da Inspeção
                    </h4>
                    <textarea
                        className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-slate-200 text-sm focus:border-brand-500 focus:outline-none min-h-[100px]"
                        placeholder="Descreva detalhes adicionais, avarias específicas ou observações sobre a documentação..."
                        value={formData.inspectionNotes}
                        onChange={(e) => setFormData({ ...formData, inspectionNotes: e.target.value })}
                    />
                    <p className="text-xs text-slate-500">Permite múltiplas linhas.</p>
                </div>
            </div>
        </div>
    );
};
