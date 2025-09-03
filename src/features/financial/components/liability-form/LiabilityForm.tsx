"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { UseLiabilityForm, useLiabilityForm } from "./LiabilityForm.hook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Save, Trash } from "lucide-react";
import { FileUpload } from "@/components/ui/file-upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentHistory } from "@/features/financial/components/payment-history";
import { PRIORITY_OPTIONS } from "@/features/financial/constants/options";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Loading } from "@/components/loading";

const LiabilityForm = ({ onClose }: UseLiabilityForm) => {
  const {
    methods,
    onSubmit,
    onReset,
    projectOptions,
    documentTypes,
    selectedId,
    onAddPaymentSchedule,
    onRemovePaymentSchedule,
    fields,
    calcPaymentScheduleStatus,
    totalAmount,
    isExceedTotalAmount,
    isLoading,
    canEdit,
    isRejected,
    liabilityDetail,
  } = useLiabilityForm({ onClose });

  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} onReset={onReset}>
        {isLoading && <Loading />}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-3 grid grid-cols-3 gap-4">
          <Card className="col-span-2 m-0">
            <CardHeader>
              <CardTitle>Liability Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              <FormField
                control={methods.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Project</FormLabel>
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        if (!value) return;
                        field.onChange(value);
                      }}
                      value={field.value}
                      disabled={!canEdit}
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
                            {option.labelWithId}
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
                    <FormLabel className="text-xs">Document Type</FormLabel>
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        if (!value) return;
                        field.onChange(value);
                      }}
                      value={field.value}
                      disabled={!canEdit}
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
                      <FormLabel className="text-xs">Liability Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter liability name"
                          {...field}
                          disabled={!canEdit}
                        />
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
                      <FormLabel className="text-xs">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter description"
                          {...field}
                          disabled={!canEdit}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={methods.control}
                name="creditor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Creditor</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter creditor"
                        {...field}
                        disabled={!canEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Priority</FormLabel>
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        if (!value) return;
                        field.onChange(value);
                      }}
                      value={field.value}
                      disabled={!canEdit}
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
            </CardContent>
          </Card>

          <Card className="m-0">
            <CardHeader>
              <CardTitle>Asset Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 flex flex-col">
              <FormField
                control={methods.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">
                      Amount/Value (THB)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter amount"
                        {...field}
                        type="number"
                        disabled={!canEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Due Date</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter due date"
                        {...field}
                        type="date"
                        disabled={!canEdit}
                        onClick={(e) => {
                          e.currentTarget.showPicker();
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Terms</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter terms"
                        {...field}
                        disabled={!canEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="interestRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">
                      Interest Rate (%) Per Year
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter interest rate"
                        {...field}
                        type="number"
                        disabled={!canEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Tabs defaultValue="paymentSchedules" className="w-full col-span-3">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="paymentSchedules">Schedules</TabsTrigger>
              <TabsTrigger value="attachments">Attachments</TabsTrigger>
              <TabsTrigger value="history" disabled={!selectedId}>
                History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="paymentSchedules">
              <Card>
                <CardHeader className="px-4">
                  <CardTitle>Payment Schedules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 px-4">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted">
                        <TableHead className="p-2">Due Date</TableHead>
                        <TableHead className="text-right p-2">Amount</TableHead>
                        <TableHead className="p-2">Description</TableHead>
                        <TableHead className="text-center p-2">
                          Status
                        </TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fields.map((payment, index) => (
                        <TableRow key={`${payment.id}-${index}`}>
                          <TableCell className="w-[150px] p-2">
                            <FormField
                              control={methods.control}
                              name={`paymentSchedules.${index}.dueDate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="date"
                                      className="h-auto py-1"
                                      disabled={!canEdit}
                                      onClick={(e) => {
                                        e.currentTarget.showPicker();
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="text-right w-[180px] p-2">
                            <FormField
                              control={methods.control}
                              name={`paymentSchedules.${index}.amount`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Enter amount"
                                      className="h-auto py-1 text-right"
                                      type="number"
                                      disabled={!canEdit}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="p-2">
                            <FormField
                              control={methods.control}
                              name={`paymentSchedules.${index}.description`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Enter description"
                                      className="h-auto py-1"
                                      disabled={!canEdit}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="text-center w-[100px] p-2">
                            {!methods.watch(
                              `paymentSchedules.${index}.dueDate`
                            ) ? (
                              "-"
                            ) : (
                              <Badge variant="outline">
                                {calcPaymentScheduleStatus(
                                  methods.watch(
                                    `paymentSchedules.${index}.dueDate`
                                  )
                                )}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-center w-[50px] p-2">
                            {canEdit && (
                              <button
                                className="text-destructive disabled:text-muted-foreground disabled:cursor-not-allowed"
                                disabled={fields.length === 1}
                                onClick={() => onRemovePaymentSchedule(index)}
                              >
                                <Trash className="h-4 w-4 mr-2" />
                              </button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell className="text-right p-2">Total:</TableCell>
                        <TableCell className="text-right p-2">
                          <Input
                            value={formatCurrency(totalAmount)}
                            className={cn("h-auto py-1 text-right text-black", {
                              "border-red-500 border-2": isExceedTotalAmount,
                            })}
                            readOnly
                          />
                        </TableCell>
                        <TableCell className="text-right p-2">
                          {canEdit && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={onAddPaymentSchedule}
                              className="w-full"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Schedule
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
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
              <Card>
                <CardHeader>
                  <CardTitle>Activity History</CardTitle>
                </CardHeader>
                <CardContent>
                  <PaymentHistory liabilityId={selectedId} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        {canEdit && (
          <div className="flex gap-2 justify-end px-6 py-4 sticky bottom-0 bg-background border-t">
            <Button variant="outline" type="reset" onClick={onReset}>
              Cancel
            </Button>
            <Button type="submit" disabled={isExceedTotalAmount || isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {selectedId ? "Update Asset" : "Create Asset"}
            </Button>
          </div>
        )}
        {isRejected && (
          <div className="flex gap-2 justify-end px-6 py-4 sticky bottom-0 bg-background border-t">
            <p className="text-destructive">
              Rejected Reason: {liabilityDetail?.remark}
            </p>
          </div>
        )}
      </form>
    </Form>
  );
};

export default LiabilityForm;
