
import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="mx-auto max-w-sm min-h-screen bg-slate-900/50 backdrop-blur-sm border-x border-purple-500/20">
        {children}
      </div>
    </div>
  );
};
