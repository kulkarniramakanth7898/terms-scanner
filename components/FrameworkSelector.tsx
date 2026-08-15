'use client';

import React from 'react';
import { Shield, Check } from 'lucide-react';

export const FRAMEWORK_OPTIONS = [
  { id: 'All', label: 'All Frameworks' },
  { id: 'GDPR', label: 'GDPR' },
  { id: 'HIPAA', label: 'HIPAA' },
  { id: 'CCPA', label: 'CCPA' },
  { id: 'SOC2', label: 'SOC 2' },
  { id: 'PCIDSS', label: 'PCI-DSS' }
];

interface FrameworkSelectorProps {
  selectedFrameworks: string[];
  onChange: (frameworks: string[]) => void;
}

export const FrameworkSelector: React.FC<FrameworkSelectorProps> = ({
  selectedFrameworks,
  onChange
}) => {
  const handleToggle = (id: string) => {
    if (id === 'All') {
      onChange(['All']);
      return;
    }

    let next = selectedFrameworks.filter(f => f !== 'All');
    if (next.includes(id)) {
      next = next.filter(f => f !== id);
    } else {
      next.push(id);
    }

    if (next.length === 0 || next.length === FRAMEWORK_OPTIONS.length - 1) {
      onChange(['All']);
    } else {
      onChange(next);
    }
  };

  return (
    <div className="w-full my-3">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
          <Shield className="w-3.5 h-3.5 text-blue-400" />
          <span>Audit Compliance Frameworks:</span>
        </label>
        <span className="text-[11px] text-slate-500 font-mono">
          {selectedFrameworks.includes('All') ? '5 Frameworks Active' : `${selectedFrameworks.length} Selected`}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {FRAMEWORK_OPTIONS.map((fw) => {
          const isSelected = selectedFrameworks.includes('All')
            ? fw.id === 'All'
            : selectedFrameworks.includes(fw.id);

          return (
            <button
              key={fw.id}
              type="button"
              onClick={() => handleToggle(fw.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border ${
                isSelected
                  ? 'bg-blue-900/60 text-blue-200 border-blue-600 shadow-sm shadow-blue-500/20'
                  : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {isSelected && <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
              <span>{fw.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
