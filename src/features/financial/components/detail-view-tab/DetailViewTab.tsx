import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { Upload, Download, Edit } from "lucide-react";
import { EnhancedDetails } from "@/features/financial/schemas/Detail.schema";
import { FinancialItem } from "../financial-provider/FinancialProvider.hook";

type DetailViewTabProps = FinancialItem & {
  enhancedDetails: EnhancedDetails;
};

const DetailViewTab = ({ type, item, enhancedDetails }: DetailViewTabProps) => {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
        <TabsTrigger value="attachments">Attachments</TabsTrigger>
        <TabsTrigger value="additional">
          {type === "payment"
            ? "Banking"
            : type === "asset"
            ? "Maintenance"
            : "Schedule"}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>
              {type === "payment"
                ? "Payment Details"
                : type === "asset"
                ? "Asset Specifications"
                : "Contract Terms"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {type === "payment" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium">Payment Method</Label>
                  <p className="text-sm">{item.paymentMethod}</p>
                </div>
                <div>
                  <Label className="font-medium">Reference</Label>
                  <p className="text-sm font-mono">{item.reference}</p>
                </div>
                <div>
                  <Label className="font-medium">Approved By</Label>
                  <p className="text-sm">{item.approvedBy}</p>
                </div>
                <div>
                  <Label className="font-medium">Project</Label>
                  <p className="text-sm">{item.project}</p>
                </div>
              </div>
            )}

            {type === "asset" && enhancedDetails.specifications && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium">Manufacturer</Label>
                  <p className="text-sm">
                    {enhancedDetails.specifications.manufacturer}
                  </p>
                </div>
                <div>
                  <Label className="font-medium">Model</Label>
                  <p className="text-sm">
                    {enhancedDetails.specifications.model}
                  </p>
                </div>
                <div>
                  <Label className="font-medium">Serial Number</Label>
                  <p className="text-sm font-mono">
                    {enhancedDetails.specifications.serialNumber}
                  </p>
                </div>
                <div>
                  <Label className="font-medium">Capacity</Label>
                  <p className="text-sm">
                    {enhancedDetails.specifications.capacity}
                  </p>
                </div>
              </div>
            )}

            {type === "liability" && enhancedDetails.contractTerms && (
              <div className="space-y-3">
                <div>
                  <Label className="font-medium">Interest Rate</Label>
                  <p className="text-sm">
                    {enhancedDetails.contractTerms.interestRate}
                  </p>
                </div>
                <div>
                  <Label className="font-medium">Penalty Rate</Label>
                  <p className="text-sm">
                    {enhancedDetails.contractTerms.penaltyRate}
                  </p>
                </div>
                <div>
                  <Label className="font-medium">Collateral</Label>
                  <p className="text-sm">
                    {enhancedDetails.contractTerms.collateral}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="history" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>
              {type === "asset" ? "Activity History" : "Approval History"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {enhancedDetails.approvalHistory.map((entry, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{entry.action}</p>
                      <p className="text-sm text-muted-foreground">
                        {entry.date}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {entry.user} • {entry.role}
                    </p>
                    {entry.comment && (
                      <p className="text-sm mt-1">{entry.comment}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="attachments" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Attachments</CardTitle>
              <Button size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enhancedDetails.attachments.map((file, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{file.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{file.type}</Badge>
                    </TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell>{file.uploadDate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="additional" className="space-y-4">
        {type === "payment" && enhancedDetails.bankDetails && (
          <Card>
            <CardHeader>
              <CardTitle>Banking Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium">Bank Name</Label>
                  <p className="text-sm">
                    {enhancedDetails.bankDetails.bankName}
                  </p>
                </div>
                <div>
                  <Label className="font-medium">Account Number</Label>
                  <p className="text-sm font-mono">
                    {enhancedDetails.bankDetails.accountNumber}
                  </p>
                </div>
                <div>
                  <Label className="font-medium">SWIFT Code</Label>
                  <p className="text-sm font-mono">
                    {enhancedDetails.bankDetails.swiftCode}
                  </p>
                </div>
                <div>
                  <Label className="font-medium">Beneficiary</Label>
                  <p className="text-sm">
                    {enhancedDetails.bankDetails.beneficiary}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {type === "asset" && enhancedDetails.maintenanceHistory && (
          <Card>
            <CardHeader>
              <CardTitle>Maintenance History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enhancedDetails.maintenanceHistory.map(
                  (maintenance, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{maintenance.type}</h4>
                        <span className="text-sm text-muted-foreground">
                          {maintenance.date}
                        </span>
                      </div>
                      <p className="text-sm mb-2">{maintenance.description}</p>
                      <div className="flex justify-between text-sm">
                        <span>Technician: {maintenance.technician}</span>
                        <span>Cost: {formatCurrency(maintenance.cost)}</span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {type === "liability" && enhancedDetails.paymentSchedule && (
          <Card>
            <CardHeader>
              <CardTitle>Payment Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enhancedDetails.paymentSchedule.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{formatCurrency(payment.amount)}</TableCell>
                      <TableCell>{payment.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{payment.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default DetailViewTab;
