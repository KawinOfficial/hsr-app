"use client";

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormLabel,
  FormItem,
} from "@/components/ui/form";
import { usePaymentForm, UsePaymentForm } from "./PaymentForm.hook";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PRIORITY_OPTIONS } from "@/features/financial/constants/options";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import { formatCurrency } from "@/lib/format";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentHistory } from "@/features/financial/components/payment-history";

const PaymentForm = ({ onClose }: UsePaymentForm) => {
  const {
    methods,
    onSubmit,
    onReset,
    projectOptions,
    documentTypes,
    vatAmount,
    taxAmount,
    netAmount,
    selectedId,
  } = usePaymentForm({
    onClose,
  });

  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} onReset={onReset}>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-3 grid grid-cols-3 gap-4">
          <Card className="col-span-2 m-0">
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <FormField
                control={methods.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        if (!value) return;
                        field.onChange(value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {projectOptions?.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value ?? ""}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="documentTypesId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Type</FormLabel>
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        if (!value) return;
                        field.onChange(value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {documentTypes?.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value ?? ""}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-2">
                <FormField
                  control={methods.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter payment name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={methods.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={methods.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        if (!value) return;
                        field.onChange(value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(PRIORITY_OPTIONS).map((priority) => (
                          <SelectItem key={priority} value={priority}>
                            {priority}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="vendor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter vendor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="m-0">
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3">
              <FormField
                control={methods.control}
                name="paymentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Date</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter payment date"
                        {...field}
                        type="date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (THB)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter amount"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="vat"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>
                      VAT (%){" "}
                      <span className="text-xs text-muted-foreground">
                        (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter vat" {...field} />
                    </FormControl>
                    <FormMessage />
                    {!!methods.watch("vat") && (
                      <p className="text-xs text-destructive absolute right-0 top-0">
                        {formatCurrency(vatAmount)} THB
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="tax"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>
                      Withholding Tax (%){" "}
                      <span className="text-xs text-muted-foreground">
                        (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter withholding tax" {...field} />
                    </FormControl>
                    <FormMessage />
                    {!!methods.watch("tax") && (
                      <p className="text-xs text-destructive absolute right-0 top-0">
                        -{formatCurrency(taxAmount)} THB
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <div className="flex justify-between items-center border-t pt-2">
                <p className="text-sm">Net Amount </p>
                <p className="text-md font-bold">{formatCurrency(netAmount)}</p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="attachments" className="w-full col-span-3">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="attachments">Attachments</TabsTrigger>
              <TabsTrigger value="history" disabled={!selectedId}>
                History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="attachments">
              {/* TODO: Attachments */}{" "}
              <FileUpload
                files={[]}
                onFilesChange={() => {}}
                maxFiles={10}
                accept={{
                  "image/*": [".png", ".jpg", ".jpeg", ".pdf"],
                }}
              />
            </TabsContent>
            <TabsContent value="history">
              {" "}
              <Card>
                <CardHeader>
                  <CardTitle>Activity History</CardTitle>
                </CardHeader>
                <CardContent>
                  <PaymentHistory paymentId={selectedId} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex gap-2 justify-end px-6 py-4 sticky bottom-0 bg-background border-t">
          <Button variant="outline" type="reset" onClick={onReset}>
            Cancel
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            {selectedId ? "Update Payment" : "Create Payment"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaymentForm;
