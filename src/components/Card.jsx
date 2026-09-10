import React from "react";

export function Card({ title, value, accent = "orange" }) {
  const accentMap = {
    orange: "text-brand-orange",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
  };
  return (
    <div className="bg-bg-card border border-bg-border rounded-lg p-4 flex flex-col gap-1">
      <span className="text-muted text-sm">{title}</span>
      <span className={`text-2xl font-bold ${accentMap[accent] || accentMap.orange}`}>{value}</span>
    </div>
  );
}

export function Badge({ children, color = "muted" }) {
  const colorMap = {
    success: "bg-success/20 text-success border-success/40",
    warning: "bg-warning/20 text-warning border-warning/40",
    danger: "bg-danger/20 text-danger border-danger/40",
    orange: "bg-brand-orange/20 text-brand-orange border-brand-orange/40",
    muted: "bg-bg-border text-muted border-bg-border",
  };
  return (
    <span className={`text-xs px-2 py-1 rounded border ${colorMap[color] || colorMap.muted}`}>
      {children}
    </span>
  );
}
