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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";

const CreatePermission = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg p-6">
        <DialogHeader>
          <DialogTitle>Create Permission Group</DialogTitle>
          <DialogDescription>
            Define a new role with specific permissions.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="role-name">Role Name</Label>
            <Input id="role-name" placeholder="Role name" />
          </div>
          <div>
            <Label htmlFor="role-description">Description</Label>
            <Textarea id="role-description" placeholder="Role description" />
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-medium">Permissions</Label>
            <div className="space-y-2">
              {[
                "Dashboard Access",
                "Project Management",
                "Financial Management",
                "Reports & Analytics",
                "User Management",
              ].map((perm) => (
                <div key={perm} className="flex items-center space-x-2">
                  <Checkbox id={perm} />
                  <Label htmlFor={perm} className="text-sm">
                    {perm}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline">Cancel</Button>
          <Button>Create Role</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePermission;
