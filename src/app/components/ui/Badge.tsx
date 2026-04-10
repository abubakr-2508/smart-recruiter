import { cn } from "../../lib/utils";

type BadgeVariant =
  | "active"
  | "closed"
  | "draft"
  | "connected"
  | "pending"
  | "failed"
  | "review"
  | "shortlisted"
  | "high"
  | "medium"
  | "low"
  | "default";

const variants: Record<BadgeVariant, string> = {
  active: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  closed: "bg-slate-100 text-slate-500 border border-slate-200",
  draft: "bg-amber-50 text-amber-700 border border-amber-200",
  connected: "bg-teal-50 text-teal-700 border border-teal-200",
  pending: "bg-amber-50 text-amber-700 border border-amber-200",
  failed: "bg-red-50 text-red-600 border border-red-200",
  review: "bg-orange-50 text-orange-700 border border-orange-200",
  shortlisted: "bg-blue-50 text-blue-700 border border-blue-200",
  high: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  medium: "bg-amber-50 text-amber-700 border border-amber-200",
  low: "bg-red-50 text-red-600 border border-red-200",
  default: "bg-slate-100 text-slate-600 border border-slate-200",
};

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function ScoreBadge({ score }: { score: number }) {
  const variant = score >= 85 ? "high" : score >= 70 ? "medium" : "low";
  const label = score >= 85 ? "High Match" : score >= 70 ? "Moderate Match" : "Low Match";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold",
        variants[variant]
      )}
    >
      <span>{score}%</span>
      <span className="font-normal opacity-80">· {label}</span>
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, BadgeVariant> = {
    Active: "active",
    Closed: "closed",
    Draft: "draft",
    Connected: "connected",
    "Not Connected": "closed",
    Pending: "pending",
    Failed: "failed",
    "Review Needed": "review",
    Shortlisted: "shortlisted",
    "Under Review": "medium",
    Posted: "active",
    Rejected: "low",
  };
  return <Badge variant={map[status] || "default"}>{status}</Badge>;
}
