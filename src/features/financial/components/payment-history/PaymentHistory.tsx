"use client";

import { Pagination } from "@/components/pagination";
import { usePaymentHistory, UsePaymentHistory } from "./PaymentHistory.hook";
import { formatDateWithTime } from "@/lib/format";

const PaymentHistory = (props: UsePaymentHistory) => {
  const { list, pagination, handlePageChange } = usePaymentHistory(props);

  return (
    <div className="space-y-4">
      {!list?.length ? (
        <div className="text-center text-muted-foreground py-[10vh]">
          No history found
        </div>
      ) : (
        list.map((entry, index) => (
          <div
            key={`${entry.createdBy}-${index}`}
            className="flex items-start space-x-4"
          >
            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">{entry.action}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDateWithTime(entry.createdAt)}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {entry.createdBy} • {entry.email}
              </p>
              {entry.description && (
                <p className="text-sm mt-1">{entry.description}</p>
              )}
            </div>
          </div>
        ))
      )}

      <Pagination
        totalPages={pagination?.totalPages ?? 0}
        currentPage={pagination?.currentPage ?? 0}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PaymentHistory;
