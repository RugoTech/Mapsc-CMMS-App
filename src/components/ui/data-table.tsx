import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DataTableProps {
  children: ReactNode;
  className?: string;
}

export function DataTable({ children, className }: DataTableProps) {
  return (
    <div className={cn("overflow-x-auto rounded-lg border bg-card", className)}>
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}

export function DataTableHeader({ children }: { children: ReactNode }) {
  return (
    <thead className="border-b bg-muted/50">
      <tr>{children}</tr>
    </thead>
  );
}

export function DataTableHead({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <th className={cn("px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground", className)}>
      {children}
    </th>
  );
}

export function DataTableBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-border">{children}</tbody>;
}

export function DataTableRow({ children, className, onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <tr
      className={cn("transition-colors hover:bg-muted/30", onClick && "cursor-pointer", className)}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

export function DataTableCell({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={cn("px-4 py-3 text-foreground", className)}>{children}</td>;
}

export function DataTableEmpty({ message = "No records found.", colSpan = 6 }: { message?: string; colSpan?: number }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-12 text-center text-muted-foreground">
        {message}
      </td>
    </tr>
  );
}
