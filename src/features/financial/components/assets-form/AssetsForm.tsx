"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { UseAssetsForm, useAssetsForm } from "./AssetsForm.hook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { locations } from "@/constants/options";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, formatPercent } from "@/lib/format";
import { Loading } from "@/components/loading";

const AssetsForm = ({ onClose }: UseAssetsForm) => {
  const {
    methods,
    onSubmit,
    onReset,
    projectOptions,
    documentTypes,
    selectedId,
    onAddMaintenance,
    onRemoveMaintenance,
    fields,
    getCurrentValue,
    getDepreciation,
    isLoading,
    canEdit,
    isRejected,
    assetDetail,
  } = useAssetsForm({ onClose });

  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} onReset={onReset}>
        {isLoading && <Loading />}
        <div className="px-4 lg:px-6 py-3 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2 m-0">
            <CardHeader>
              <CardTitle>Asset Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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

              <div className="sm:col-span-2">
                <FormField
                  control={methods.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Asset Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter asset name"
                          {...field}
                          disabled={!canEdit}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="sm:col-span-2">
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
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Location</FormLabel>
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
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locations?.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
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
            <CardContent className="space-y-5 flex flex-col">
              <div className="space-y-5">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Current Value</p>
                  <p className="text-xl font-bold text-success-green">
                    {formatCurrency(getCurrentValue)}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Depreciation</span>
                    <span>{formatPercent(getDepreciation)}</span>
                  </div>
                  <Progress value={getDepreciation} className="h-2" />
                </div>
              </div>

              <div className="space-y-2">
                <FormField
                  control={methods.control}
                  name="purchaseDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Purchase Date</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter purchase date"
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
                  name="warrantyDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Warranty Until</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter warranty"
                          {...field}
                          value={field.value ?? ""}
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
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="maintances" className="w-full lg:col-span-3">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="maintances">Maintances</TabsTrigger>
              <TabsTrigger value="attachments">Attachments</TabsTrigger>
              <TabsTrigger value="history" disabled={!selectedId}>
                History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="maintances">
              <Card>
                <CardHeader className="px-4">
                  <CardTitle>Maintances History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 px-4">
                  {!fields.length && !canEdit && (
                    <div className="text-center text-sm text-muted-foreground py-3">
                      No maintances found
                    </div>
                  )}
                  {fields.map((field, index) => (
                    <div
                      key={`${field.id}-${index}`}
                      className="border border-dashed p-3 rounded-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 relative"
                    >
                      <div className="sm:col-span-2 lg:col-span-1">
                        <FormField
                          control={methods.control}
                          name={`maintances.${index}.name`}
                          render={({ field }) => (
                            <FormItem className="space-y-1">
                              <FormLabel className="text-xs">Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter name"
                                  className="h-auto py-1"
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
                        name={`maintances.${index}.date`}
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-xs">Date</FormLabel>
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

                      <div className="sm:col-span-2 lg:col-span-1">
                        <FormField
                          control={methods.control}
                          name={`maintances.${index}.description`}
                          render={({ field }) => (
                            <FormItem className="space-y-1">
                              <FormLabel className="text-xs">
                                Description
                              </FormLabel>
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
                      </div>

                      <FormField
                        control={methods.control}
                        name={`maintances.${index}.cost`}
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-xs">
                              Cost (THB)
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                placeholder="Enter cost"
                                className="h-auto py-1"
                                disabled={!canEdit}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="sm:col-span-2 lg:col-span-1">
                        <FormField
                          control={methods.control}
                          name={`maintances.${index}.maintenanceBy`}
                          render={({ field }) => (
                            <FormItem className="space-y-1">
                              <FormLabel className="text-xs">
                                Maintenance By
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter maintenance by"
                                  className="h-auto py-1"
                                  disabled={!canEdit}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {canEdit && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onRemoveMaintenance(index)}
                          className="sm:col-span-2 lg:col-span-1 text-xs text-destructive"
                        >
                          <Trash className="h-2 w-2 mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}

                  {canEdit && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onAddMaintenance}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Maintenance
                    </Button>
                  )}
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
                disabled={!canEdit}
              />
            </TabsContent>
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Activity History</CardTitle>
                </CardHeader>
                <CardContent>
                  <PaymentHistory assetId={selectedId} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {canEdit && (
          <div className="flex flex-col sm:flex-row gap-2 justify-end px-6 py-4 sticky bottom-0 bg-background border-t">
            <Button
              variant="outline"
              type="reset"
              onClick={onReset}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              <Save className="h-4 w-4 mr-2" />
              {selectedId ? "Update Asset" : "Create Asset"}
            </Button>
          </div>
        )}
        {isRejected && (
          <div className="flex gap-2 justify-end px-6 py-4 sticky bottom-0 bg-background border-t">
            <p className="text-destructive text-sm">
              Rejected Reason: {assetDetail?.remark}
            </p>
          </div>
        )}
      </form>
    </Form>
  );
};

export default AssetsForm;
