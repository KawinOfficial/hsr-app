import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useKeyMetrics } from "./KeyMetrics.hook";

const KeyMetrics = () => {
  const { keyMetrics } = useKeyMetrics();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {keyMetrics.map((metric, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <metric.icon className={`h-5 w-5 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {metric.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-success-green mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-success-green mr-1" />
              )}
              {metric.change} from last month
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default KeyMetrics;
