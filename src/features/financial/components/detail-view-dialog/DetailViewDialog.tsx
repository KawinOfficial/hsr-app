"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Edit, Save } from "lucide-react";
import { useDetailViewDialog } from "./DetailViewDialog.hook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/features/financial/utils/color";
import { formatCurrency } from "@/lib/format";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { DetailViewTab } from "@/features/financial/components/detail-view-tab";
import {
  ASSET_STATUS,
  LIABILITY_STATUS,
  PAYMENT_STATUS,
} from "../../constants/options";

const DetailViewDialog = () => {
  const {
    isOpen,
    selectedItem,
    setIsOpen,
    editMode,
    handleEdit,
    handleCancel,
    handleSave,
    handleClose,
    typeTitle,
    enhancedDetails,
  } = useDetailViewDialog();

  if (!isOpen || !selectedItem) return null;

  const { item, type } = selectedItem;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-background border-b py-4 px-6">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl">{typeTitle}</DialogTitle>
              <DialogDescription>
                ID: {item.id} • {type === "asset" ? item.category : type}
              </DialogDescription>
            </div>
            <div className="flex items-center space-x-2">
              {editMode ? (
                <>
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2 capitalize" />
                  Edit {type}
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 p-6 pt-4">
          {/* Main Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  {type === "payment"
                    ? "Payment Information"
                    : type === "asset"
                    ? "Asset Information"
                    : "Liability Information"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      {type === "payment"
                        ? "Vendor/Contractor"
                        : type === "asset"
                        ? "Asset Name"
                        : "Creditor"}
                    </Label>
                    {editMode ? (
                      <Input className="mt-1" />
                    ) : (
                      <p className="mt-1 font-medium">
                        {type === "payment"
                          ? item.vendor
                          : type === "asset"
                          ? item.name
                          : item.creditor}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Status
                    </Label>
                    {editMode ? (
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(
                            type === "payment"
                              ? PAYMENT_STATUS
                              : type === "asset"
                              ? ASSET_STATUS
                              : LIABILITY_STATUS
                          ).map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="mt-1">
                        {type === "payment" && (
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Description
                  </Label>
                  {editMode ? (
                    <Textarea className="mt-1" rows={3} />
                  ) : (
                    <p className="mt-1 text-sm">{item.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Amount/Value
                    </Label>
                    {editMode ? (
                      <Input type="number" className="mt-1" />
                    ) : (
                      <p className="mt-1 text-lg font-bold text-primary">
                        {formatCurrency(
                          type === "asset" ? item.value : item.amount
                        )}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      {type === "payment"
                        ? "Payment Date"
                        : type === "liability"
                        ? "Due Date"
                        : "Purchase Date"}
                    </Label>
                    {editMode ? (
                      <Input type="date" className="mt-1" />
                    ) : (
                      <p className="mt-1 text-sm">
                        {type === "payment"
                          ? item.date
                          : type === "liability"
                          ? item.dueDate
                          : "-"}
                      </p>
                    )}
                  </div>
                </div>

                {type === "asset" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Location
                      </Label>
                      {editMode ? (
                        <Input className="mt-1" />
                      ) : (
                        <p className="mt-1 text-sm">{item.location}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Current Value
                      </Label>
                      <p className="mt-1 text-sm font-medium text-success-green">
                        {formatCurrency(item.currentValue || item.value)}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {type === "payment"
                    ? "Payment Summary"
                    : type === "asset"
                    ? "Asset Summary"
                    : "Liability Summary"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {type === "payment" && enhancedDetails?.taxInfo && (
                  <>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Gross Amount
                      </p>
                      <p className="text-xl font-bold">
                        {formatCurrency(item.amount)}
                      </p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>VAT (7%)</span>
                        <span>
                          {formatCurrency(enhancedDetails.taxInfo.vatAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Withholding Tax (3%)</span>
                        <span className="text-destructive">
                          -
                          {formatCurrency(
                            enhancedDetails.taxInfo.withholdingTax
                          )}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium">
                        <span>Net Amount</span>
                        <span>
                          {formatCurrency(enhancedDetails.taxInfo.netAmount)}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {type === "asset" && (
                  <>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Current Value
                      </p>
                      <p className="text-xl font-bold text-success-green">
                        {formatCurrency(item.currentValue || item.value)}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Depreciation</span>
                        <span>{item.depreciation || 0}%</span>
                      </div>
                      <Progress
                        value={item.depreciation || 0}
                        className="h-2"
                      />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Next Maintenance</span>
                        <span>{item.nextMaintenance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Warranty Until</span>
                        <span>{item.warrantyUntil}</span>
                      </div>
                    </div>
                  </>
                )}

                {type === "liability" && (
                  <>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Total Amount
                      </p>
                      <p className="text-xl font-bold text-construction-orange">
                        {formatCurrency(item.amount)}
                      </p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Due Date</span>
                        <span>{item.dueDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Terms</span>
                        <span>{item.terms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Priority</span>
                        <span
                          className={
                            item.priority === "Critical"
                              ? "text-destructive"
                              : item.priority === "High"
                              ? "text-construction-orange"
                              : "text-success-green"
                          }
                        >
                          {item.priority}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <DetailViewTab {...selectedItem} enhancedDetails={enhancedDetails} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailViewDialog;
