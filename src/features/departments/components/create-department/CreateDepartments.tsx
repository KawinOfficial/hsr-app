import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const CreateDepartments = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Department
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle>Create New Department</DialogTitle>
          <DialogDescription>
            Add a new department to the organization.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="dept-name">Department Name</Label>
            <Input id="dept-name" placeholder="Department name" />
          </div>
          <div>
            <Label htmlFor="dept-description">Description</Label>
            <Textarea
              id="dept-description"
              placeholder="Department description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dept-head">Department Head</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select head" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="somchai">Somchai Tanakorn</SelectItem>
                  <SelectItem value="pranee">Pranee Chotirat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dept-budget">Budget (THB)</Label>
              <Input id="dept-budget" type="number" placeholder="0" />
            </div>
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline">Cancel</Button>
          <Button>Create Department</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDepartments;
