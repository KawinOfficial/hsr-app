import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, Edit } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const documents = [
  {
    name: "Project Charter",
    type: "PDF",
    size: "2.4 MB",
    uploadDate: "2023-01-15",
    category: "Planning",
  },
  {
    name: "Environmental Report",
    type: "PDF",
    size: "15.2 MB",
    uploadDate: "2023-04-01",
    category: "Compliance",
  },
  {
    name: "Technical Drawings",
    type: "DWG",
    size: "45.8 MB",
    uploadDate: "2023-06-15",
    category: "Engineering",
  },
];

const Document = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Project Documents</CardTitle>
            <CardDescription>
              Files and documents related to this project
            </CardDescription>
          </div>
          <Button size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{doc.name}</TableCell>
                <TableCell>{doc.type}</TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell>
                  <Badge variant="outline">{doc.category}</Badge>
                </TableCell>
                <TableCell>{doc.uploadDate}</TableCell>
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
  );
};

export default Document;
