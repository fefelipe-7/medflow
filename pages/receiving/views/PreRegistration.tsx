import React, { useState } from 'react';
import { MOCK_SHIPMENTS } from '../../../constants';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { Plus } from 'lucide-react';
import { ReceivingStatus } from '../../../types';

export const PreRegistration = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const items = MOCK_SHIPMENTS.filter(s => s.status === ReceivingStatus.PRE_REGISTERED);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex justify-between items-end border-b border-slate-900 pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100">Pré-registro</h1>
                    <p className="text-slate-500 mt-1">Materiais esperados. Validação de origem e documentação.</p>
                </div>
                <Button icon={Plus} onClick={() => setIsModalOpen(true)}>Novo Aviso de Chegada</Button>
            </div>

            <div className="border border-slate-800 rounded-lg bg-slate-900/20">
                <table className="min-w-full divide-y divide-slate-800">
                    <thead className="bg-slate-900">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">Documento</th>
                            <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">Origem</th>
                            <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">Previsão</th>
                            <th className="px-6 py-3 text-right text-xs text-slate-400 uppercase">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {items.map(item => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 text-sm text-slate-200">{item.invoiceNumber}</td>
                                <td className="px-6 py-4 text-sm text-slate-400">{item.provider}</td>
                                <td className="px-6 py-4 text-sm text-slate-400">{item.expectedDate}</td>
                                <td className="px-6 py-4 text-right">
                                    <Button size="sm" variant="secondary">Editar</Button>
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-slate-500">Nenhum pré-registro ativo.</td></tr>}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Novo Pré-registro">
                <div className="p-4 text-slate-400">Formulário de cadastro de NF e Fornecedor...</div>
                <div className="flex justify-end p-4"><Button onClick={() => setIsModalOpen(false)}>Salvar</Button></div>
            </Modal>
        </div>
    );
};
