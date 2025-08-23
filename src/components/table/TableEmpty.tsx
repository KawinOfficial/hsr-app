import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const TableEmpty = ({
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
            "h-40 py-10 flex items-center justify-center text-muted-foreground",
            className
          )}
        >
          No data found
        </div>
      </TableCell>
    </TableRow>
  );
};
