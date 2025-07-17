import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock } from "lucide-react";

const recentActivities = [
  {
    type: "payment",
    description: "Payment processed for concrete supplier - Section A",
    amount: "฿12.5M",
    time: "2 hours ago",
    user: "Finance Dept.",
  },
  {
    type: "contract",
    description: "New contract signed for electrical systems installation",
    amount: "฿85.2M",
    time: "4 hours ago",
    user: "Procurement Dept.",
  },
  {
    type: "progress",
    description: "Progress report submitted for Track Section 12-15",
    amount: "85% Complete",
    time: "6 hours ago",
    user: "QS Engineer",
  },
  {
    type: "approval",
    description: "Budget variation approved for additional safety measures",
    amount: "฿3.2M",
    time: "1 day ago",
    user: "Project Manager",
  },
];

const RecentActivities = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-primary" />
          Recent Activities
        </CardTitle>
        <CardDescription>
          Latest transactions and project updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 pb-3 border-b border-border last:border-0"
            >
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {activity.description}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">
                    {activity.user}
                  </p>
                  <p className="text-xs font-medium text-primary">
                    {activity.amount}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
