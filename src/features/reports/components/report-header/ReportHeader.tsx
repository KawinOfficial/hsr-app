import PageHeader from "@/components/layout/page-haeder/PageHeader";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";
import { PERIOD_OPTIONS } from "@/features/reports/constants/options";

const ReportHeader = () => {
  return (
    <div>
      {" "}
      <PageHeader
        title="Reports & Analytics"
        subTitle="Financial reports, project summaries, and cost analysis for the
          HSR project"
      >
        {" "}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="date-range" className="text-sm">
              Period:
            </Label>
            <Select defaultValue={PERIOD_OPTIONS.LAST_6_MONTHS}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(PERIOD_OPTIONS).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </PageHeader>{" "}
    </div>
  );
};

export default ReportHeader;
