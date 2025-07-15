import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-background">
      {/* Page Header */}
      <div className="border-b bg-card">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Project Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Overview of Thai-Chinese High-Speed Rail construction progress
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              <Button size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
