import React from "react";

export const adminInputClass =
  "w-full min-h-[44px] rounded-xl bg-white/[0.07] px-3.5 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/30";

export const adminSelectClass =
  "w-full min-h-[44px] rounded-xl bg-[#1c1c20] px-3.5 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30";

export const adminTextareaClass =
  "w-full rounded-xl bg-white/[0.07] px-3.5 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/30";

export function AdminField({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs text-zinc-400 uppercase font-medium tracking-wider mb-1.5"
      >
        {label}
      </label>
      {children}
      {hint && <span className="text-xs text-zinc-400 mt-1.5 block">{hint}</span>}
    </div>
  );
}

export function AdminPanel({
  title,
  icon,
  children,
  className = "",
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`p-6 rounded-2xl bg-[#121215] h-fit ${className}`}>
      <h3 className="text-base font-bold uppercase tracking-wide mb-4 flex items-center gap-2 text-white">
        {icon}
        <span>{title}</span>
      </h3>
      {children}
    </div>
  );
}
