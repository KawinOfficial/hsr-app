import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
}
const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const getPageItems = () => {
    if (totalPages <= 0) return [] as (number | "dots")[];

    // Small totals: show all pages without dots
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // When on the first page: show 1 2 3 ...
    if (currentPage === 1) {
      const items: (number | "dots")[] = [1, 2, 3];
      if (totalPages > 3) items.push("dots");
      return items;
    }

    // When on the last page: show ... last-2 last-1 last
    if (currentPage === totalPages) {
      const start = Math.max(1, totalPages - 2);
      const items: (number | "dots")[] = [];
      if (start > 1) items.push("dots");
      for (let p = start; p <= totalPages; p++) {
        items.push(p);
      }
      return items;
    }

    // Determine a middle window excluding first and last
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    const items: (number | "dots")[] = [];

    // Leading ellipsis (always when there are pages hidden before start)
    if (totalPages > 3 && start >= 2) {
      items.push("dots");
    }

    // Middle page numbers
    for (let p = start; p <= end; p++) {
      if (p >= 2 && p <= totalPages - 1) {
        items.push(p);
      }
    }

    // Trailing ellipsis (always when there are pages hidden after end)
    if (totalPages > 3 && end <= totalPages - 1) {
      items.push("dots");
    }

    return items;
  };

  const pageItems = getPageItems();
  let dotsKeyCounter = 0;

  return (
    <div className="flex items-center justify-between mt-6">
      <div />
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange?.(1)}
          disabled={currentPage === 1 || totalPages === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {pageItems.map((item) => {
          if (item === "dots") {
            return (
              <Button
                key={`dots-${++dotsKeyCounter}`}
                variant="outline"
                size="sm"
                disabled
                className="w-8"
              >
                ...
              </Button>
            );
          }
          const page = item;
          return (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange?.(page)}
              className="w-8"
            >
              {page}
            </Button>
          );
        })}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange?.(totalPages)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
