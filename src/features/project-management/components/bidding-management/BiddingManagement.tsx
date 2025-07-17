import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Search,
  MapPin,
  Building2,
  Users,
  Eye,
  Edit,
  Calendar,
  CheckCircle,
  DollarSign,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/features/project-management/utills/badgeColor";
import { formatCurrency } from "@/lib/format";
import { Separator } from "@/components/ui/separator";

const biddingProjects = [
  {
    id: "BID-2024-001",
    title: "Station Construction - Phase 3A",
    description:
      "Construction of 8 elevated stations along the Bangkok-Ayutthaya corridor",
    estimatedValue: 1200000000,
    bidSubmissionDeadline: "2024-02-15",
    technicalEvaluation: "2024-02-20",
    financialEvaluation: "2024-02-25",
    status: "Open",
    bidders: 12,
    qs_officer: "Siriporn Wattana",
    engineer: "Thanakit Srisuwan",
    category: "Infrastructure",
    location: "Bangkok-Ayutthaya",
  },
  {
    id: "BID-2024-002",
    title: "Electrical Systems Installation",
    description:
      "Installation of power distribution and signaling systems for sections 15-22",
    estimatedValue: 850000000,
    bidSubmissionDeadline: "2024-02-10",
    technicalEvaluation: "2024-02-15",
    financialEvaluation: "2024-02-18",
    status: "Evaluation",
    bidders: 8,
    qs_officer: "Pranee Chotirat",
    engineer: "Anupong Thavorn",
    category: "Electrical",
    location: "Nakhon Ratchasima",
  },
  {
    id: "BID-2024-003",
    title: "Track Laying Equipment Procurement",
    description:
      "Procurement of specialized track laying and maintenance equipment",
    estimatedValue: 650000000,
    bidSubmissionDeadline: "2024-01-30",
    technicalEvaluation: "2024-02-05",
    financialEvaluation: "2024-02-08",
    status: "Awarded",
    bidders: 6,
    qs_officer: "Malee Jitpakdee",
    engineer: "Somsak Bunnag",
    category: "Equipment",
    location: "Multiple Sections",
  },
];

const BiddingManagement = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Active Bidding Processes</CardTitle>
            <CardDescription>
              Manage project bidding from opening to award
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search projects..." className="pl-10 w-64" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {biddingProjects.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
                  <div className="lg:col-span-2 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          ID: {project.id}
                        </p>
                      </div>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                        {project.location}
                      </div>
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 mr-1 text-muted-foreground" />
                        {project.category}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Estimated Value
                      </p>
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(project.estimatedValue)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Bidders Registered
                      </p>
                      <p className="text-sm font-semibold">
                        {project.bidders} companies
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Key Personnel
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Users className="h-3 w-3 mr-2 text-muted-foreground" />
                          QS: {project.qs_officer}
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="h-3 w-3 mr-2 text-muted-foreground" />
                          Engineer: {project.engineer}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        // onClick={() => handleViewProject(project)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        // onClick={() => handleEditProject(project)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">
                        Submission Deadline
                      </p>
                      <p className="font-medium">
                        {project.bidSubmissionDeadline}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">
                        Technical Evaluation
                      </p>
                      <p className="font-medium">
                        {project.technicalEvaluation}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">
                        Financial Evaluation
                      </p>
                      <p className="font-medium">
                        {project.financialEvaluation}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BiddingManagement;
