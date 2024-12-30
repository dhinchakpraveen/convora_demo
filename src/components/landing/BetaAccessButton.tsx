import React from 'react';

interface BetaAccessButtonProps {
  text?: string;
  light?: boolean;
}

export function BetaAccessButton({ text = "Request Beta Access", light = false }: BetaAccessButtonProps) {
  const baseClasses = "px-8 py-3 rounded-full text-lg font-semibold transition-all";
  const colorClasses = light
    ? "bg-white text-blue-600 hover:bg-blue-50"
    : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <button className={`${baseClasses} ${colorClasses}`}>
      {text}
    </button>
  );
}