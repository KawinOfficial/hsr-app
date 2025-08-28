"use client";

import { Pagination } from "@/components/pagination";
import { usePaymentHistory, UsePaymentHistory } from "./PaymentHistory.hook";
import { formatDateWithTime } from "@/lib/format";
import {
  CheckCircle2,
  CircleCheckBig,
  Pencil,
  PlusCircle,
  XCircle,
  FileWarning,
} from "lucide-react";

function getIcon(action: string) {
  switch (action) {
    case "create":
      return (
        <PlusCircle size={15} strokeWidth={2} className="text-green-500" />
      );
    case "update":
      return <Pencil size={15} strokeWidth={2} className="text-blue-500" />;
    case "approve":
      return (
        <CheckCircle2 size={15} strokeWidth={2} className="text-emerald-500" />
      );
    case "reject":
      return <XCircle size={15} strokeWidth={2} className="text-red-500" />;
    case "completed":
      return (
        <CircleCheckBig size={15} strokeWidth={2} className="text-gray-500" />
      );
    default:
      return (
        <FileWarning size={15} strokeWidth={2} className="text-yellow-500" />
      );
  }
}

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
            className="flex items-center space-x-4 border-b pb-2"
          >
            <span>{getIcon(entry.action.toLowerCase())}</span>
            <div className="flex-1 space-y-0.5">
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
                <p className="text-sm">{entry.description}</p>
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
