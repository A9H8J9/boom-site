import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  eyebrow,
  children,
  className,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0 space-y-2">
        {eyebrow && (
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-brand" />
            <span className="text-[10.5px] font-medium tracking-[0.02em] text-brand">
              {eyebrow}
            </span>
          </div>
        )}
        <h1 className="text-balance text-[25px] font-bold leading-[1.35] tracking-[-0.01em] sm:text-[29px]">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-[12.5px] leading-6 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {children}
        </div>
      )}
    </div>
  );
}

export function SectionHeading({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <div>
        <h2 className="text-[14px] font-semibold tracking-[-0.005em]">
          {title}
        </h2>
        {description && (
          <p className="mt-0.5 text-[11.5px] text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/90 bg-card/40 px-6 py-14 text-center">
      <div className="mb-3 grid size-11 place-items-center rounded-2xl bg-muted text-muted-foreground ring-1 ring-border/70">
        {icon}
      </div>
      <div className="text-[13px] font-medium">{title}</div>
      {description && (
        <p className="mt-1 max-w-sm text-[11.5px] leading-5 text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
