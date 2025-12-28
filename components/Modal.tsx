import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-slate-950/80 backdrop-blur-sm p-4 md:inset-0 md:h-full">
      <div className="relative w-full max-w-lg h-auto rounded-lg bg-slate-900 border border-slate-800 shadow-2xl ring-1 ring-black/5">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t border-b border-slate-800 p-5">
          <h3 className="text-lg font-semibold text-slate-100 lg:text-xl">
            {title}
          </h3>
          <button
            onClick={onClose}
            type="button"
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Fechar modal</span>
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 space-y-6 text-slate-300">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end space-x-2 rounded-b border-t border-slate-800 p-6 bg-slate-900/50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};