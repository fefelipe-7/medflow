import React, { useState } from 'react';
import { MOCK_INVENTORY } from '../../../constants';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { ArrowRightLeft } from 'lucide-react';

export const Movements = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex justify-between items-end border-b border-slate-900 pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100">Movimentações</h1>
                    <p className="text-slate-500 mt-1">Transferências internas. Origem → Destino com justificativa.</p>
                </div>
                <Button icon={ArrowRightLeft} onClick={() => setIsModalOpen(true)}>Nova Movimentação</Button>
            </div>

            <div className="border border-slate-800 rounded-lg bg-slate-900/20">
                <table className="min-w-full divide-y divide-slate-800">
                    <thead className="bg-slate-900">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">Item</th>
                            <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">De</th>
                            <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">Para</th>
                            <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">Responsável</th>
                            <th className="px-6 py-3 text-right text-xs text-slate-400 uppercase">Data</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {/* Mock movements based on inventory items for demo */}
                        {MOCK_INVENTORY.slice(0, 3).map((item, idx) => (
                            <tr key={idx}>
                                <td className="px-6 py-4 text-sm text-slate-200">{item.sku}</td>
                                <td className="px-6 py-4 text-sm text-slate-400 font-mono">RECEBIMENTO</td>
                                <td className="px-6 py-4 text-sm text-slate-200 font-mono">{item.location}</td>
                                <td className="px-6 py-4 text-sm text-slate-400">Sistema</td>
                                <td className="px-6 py-4 text-sm text-slate-500 text-right">Hoje, 10:00</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nova Movimentação">
                <div className="p-4 text-slate-400">Formulário: Seleção de Lote, Origem e Destino...</div>
                <div className="flex justify-end p-4"><Button onClick={() => setIsModalOpen(false)}>Confirmar</Button></div>
            </Modal>
        </div>
    );
};
