// Pill.tsx
import type { ComponentProps, ReactNode } from "react";

type PillProps = ComponentProps<"div"> & {
  children: ReactNode;
};

export const Pill = ({ children, className = "", ...props }: PillProps) => (
  <div
    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

type PillIndicatorProps = {
  variant?: "success" | "error" | "warning" | "info";
  pulse?: boolean;
};

export const PillIndicator = ({
  variant = "success",
  pulse = false,
}: PillIndicatorProps) => (
  <span className="relative flex size-2">
    {pulse && (
      <span
        className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75
          ${variant === "success" ? "bg-emerald-400" : ""}
          ${variant === "error" ? "bg-rose-400" : ""}
          ${variant === "warning" ? "bg-amber-400" : ""}
          ${variant === "info" ? "bg-sky-400" : ""}
        `}
      />
    )}
    <span
      className={`relative inline-flex size-2 rounded-full
        ${variant === "success" ? "bg-emerald-500" : ""}
        ${variant === "error" ? "bg-rose-500" : ""}
        ${variant === "warning" ? "bg-amber-500" : ""}
        ${variant === "info" ? "bg-sky-500" : ""}
      `}
    />
  </span>
);

type PillIconProps = {
  icon: React.ElementType;
  className?: string;
};

export const PillIcon = ({
  icon: Icon,
  className = "",
  ...props
}: PillIconProps) => (
  <Icon className={`size-3 text-muted-foreground ${className}`} {...props} />
);
