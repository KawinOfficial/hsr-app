import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";

const monthlyData = [
  {
    month: "Jan 2024",
    revenue: 245000000,
    expenses: 128000000,
    profit: 117000000,
  },
  {
    month: "Feb 2024",
    revenue: 278000000,
    expenses: 142000000,
    profit: 136000000,
  },
  {
    month: "Mar 2024",
    revenue: 312000000,
    expenses: 165000000,
    profit: 147000000,
  },
  {
    month: "Apr 2024",
    revenue: 289000000,
    expenses: 158000000,
    profit: 131000000,
  },
  {
    month: "May 2024",
    revenue: 325000000,
    expenses: 172000000,
    profit: 153000000,
  },
  {
    month: "Jun 2024",
    revenue: 298000000,
    expenses: 149000000,
    profit: 149000000,
  },
];

const MonthlyPerformance = () => {
  return (
    <div>
      {" "}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Financial Performance</CardTitle>
          <CardDescription>
            Revenue vs expenses trend over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 h-[30vh] overflow-y-auto">
            {monthlyData.map((data, index) => (
              <div key={`${data.month}-${index}`} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{data.month}</span>
                  <span className="text-sm text-muted-foreground">
                    Profit: {formatCurrency(data.profit)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-2 bg-rail-blue/10 rounded">
                    <p className="text-xs text-muted-foreground">Revenue</p>
                    <p className="text-sm font-semibold text-rail-blue">
                      {formatCurrency(data.revenue)}
                    </p>
                  </div>
                  <div className="text-center p-2 bg-construction-orange/10 rounded">
                    <p className="text-xs text-muted-foreground">Expenses</p>
                    <p className="text-sm font-semibold text-construction-orange">
                      {formatCurrency(data.expenses)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyPerformance;
