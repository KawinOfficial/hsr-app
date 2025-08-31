"use client";

import { Loading } from "@/components/loading";
import { useApprovalList } from "./ApprovalList.hook";
import { Button } from "@/components/ui/button";
import { CheckCircle, Eye, RotateCcw } from "lucide-react";
import { ApproveItem } from "@/features/approvals/components/approval-item";

const ApprovalList = () => {
  const { approvals, isLoading, getProject, getDocumentType } =
    useApprovalList();

  return (
    <div className="space-y-3">
      {isLoading ? (
        <Loading />
      ) : !approvals?.length ? (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">No approvals</p>
        </div>
      ) : (
        approvals?.map((approval, index) => (
          <div
            key={`${approval.id}-${index}`}
            className="border rounded-md p-3 flex flex-row space-x-5"
          >
            <div className="flex-1">
              <ApproveItem
                {...approval.approveItems}
                getProject={getProject}
                getDocumentType={getDocumentType}
              />
            </div>
            <div className="w-[1px] bg-border"></div>
            <div className="space-y-3 max-w-[250px] flex flex-col justify-center items-center">
              <p className="text-center font-medium">Quick Actions</p>
              <div className="flex space-x-2">
                <Button variant="success" size="sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button variant="destructive" size="sm">
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ApprovalList;
