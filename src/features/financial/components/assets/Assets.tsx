import { useAssets } from "./Assets.hook";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Filter, Plus, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/format";
import { getStatusColor } from "@/features/financial/utils/color";
import { Input } from "@/components/ui/input";

const Assets = () => {
  const { assetsData } = useAssets();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Asset Management</CardTitle>
            <CardDescription>
              Register and manage project assets, equipment, and infrastructure
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search payments..." className="pl-10 w-64" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>{" "}
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Register Asset
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Original Value</TableHead>
              <TableHead>Current Value</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Next Maintenance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assetsData.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell className="font-medium">{asset.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{asset.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {asset.project}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{asset.category}</TableCell>
                <TableCell className="font-semibold">
                  {formatCurrency(asset.value)}
                </TableCell>
                <TableCell className="font-semibold text-success-green">
                  {formatCurrency(asset.currentValue)}
                  <div className="text-xs text-muted-foreground">
                    -{asset.depreciation}% depreciation
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(asset.condition)}>
                    {asset.condition}
                  </Badge>
                </TableCell>
                <TableCell>{asset.location}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    {asset.nextMaintenance}
                    <div className="text-xs text-muted-foreground">
                      Last: {asset.lastMaintenance}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      //   onClick={() => handleViewItem(asset, "asset")}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      //   onClick={() => handleEditItem(asset, "asset")}
                    >
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

export default Assets;
