import { ValueTag } from "@/types/user";
import { cn } from "@/lib/utils";

interface Props {
  tags: ValueTag[];
  max?: number;
  size?: "sm" | "md";
  className?: string;
}

export function ValueTagList({ tags, max = 10, size = "md", className }: Props) {
  const displayed = tags.slice(0, max);
  const remaining = tags.length - max;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {displayed.map((tag) => (
        <span
          key={tag}
          className={cn(
            "rounded-full bg-kyomei-sage/10 text-kyomei-sage font-medium border border-kyomei-sage/20",
            size === "sm" ? "text-[11px] px-2.5 py-0.5" : "text-xs px-3 py-1"
          )}
        >
          {tag}
        </span>
      ))}
      {remaining > 0 && (
        <span
          className={cn(
            "rounded-full bg-kyomei-border text-kyomei-muted",
            size === "sm" ? "text-[11px] px-2.5 py-0.5" : "text-xs px-3 py-1"
          )}
        >
          +{remaining}
        </span>
      )}
    </div>
  );
}
