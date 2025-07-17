import React from 'react';
import { CheckCircle } from 'lucide-react';

export function VerificationBadge() {
  return (
    <div className="flex items-center justify-center w-full py-4 bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-gray-50 border border-gray-200">
        <CheckCircle className="h-6 w-6 text-emerald-600" strokeWidth={2} />
        <div>
          <span className="text-lg font-semibold text-gray-900">Verified by</span>
          <span className="text-lg font-semibold text-emerald-600 ml-2">localrank.so</span>
        </div>
      </div>
    </div>
  );
}      