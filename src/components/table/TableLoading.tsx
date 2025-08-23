import { Loader2 } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const TableLoading = ({
  colSpan,
  className,
}: {
  colSpan: number;
  className?: string;
}) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <div
          className={cn(
            "py-10 flex items-center justify-center text-muted-foreground",
            className
          )}
        >
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          Loading...
        </div>
      </TableCell>
    </TableRow>
  );
};
