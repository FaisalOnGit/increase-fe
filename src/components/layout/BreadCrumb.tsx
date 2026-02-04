import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
  pages: Array<{ name: string; href: string }>;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ pages, className }) => {
  return (
    <nav className={cn("flex items-center text-sm text-muted-foreground", className)}>
      <ol className="flex items-center gap-1.5">
        {pages.map((page, index) => (
          <li key={page.href} className="flex items-center gap-1.5">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            )}
            <a
              href={page.href}
              className={cn(
                "hover:text-foreground transition-colors",
                index === pages.length - 1
                  ? "font-semibold text-foreground"
                  : "font-medium"
              )}
            >
              {page.name}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};
