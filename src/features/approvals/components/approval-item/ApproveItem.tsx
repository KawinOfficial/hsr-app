import { getActionColor } from "@/features/notification/utils/color";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getPriorityColor } from "@/features/financial/utils/color";

interface ApproveItemProps {
  name?: string;
  approveId?: string;
  projectId?: string;
  documentTypesId?: string;
  currentType?: string;
  priority?: string;
  description?: string;
  itemsDetail?: {
    label: string;
    value?: string | number | null;
  }[];
  getProject?: (value: string) => string;
  getDocumentType?: (value: string) => string;
}

const renderData = (label: string, value?: string | number | null) => {
  return (
    <div className="flex items-center space-x-2">
      <p className="text-sm text-muted-foreground">{label}:</p>{" "}
      <p>{value ?? "-"}</p>
    </div>
  );
};

export const ApproveItem = ({
  name,
  approveId,
  projectId,
  documentTypesId,
  currentType,
  priority,
  description,
  itemsDetail,
  getProject,
  getDocumentType,
}: ApproveItemProps) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <div className="space-y-1">
          <p className="font-semibold text-lg">{name}</p>
          <p className="text-muted-foreground">
            {approveId} • {getDocumentType?.(documentTypesId ?? "")}
          </p>
        </div>
        <div className="space-y-1 flex flex-col items-center">
          <Badge
            className={getActionColor(currentType ?? "")}
            variant="secondary"
          >
            {currentType?.replace("_", " ")}
          </Badge>
          {priority && (
            <p className={cn("text-sm", getPriorityColor(priority ?? ""))}>
              {priority}
            </p>
          )}
        </div>
      </div>
      <div>{description}</div>
      <div className="grid grid-cols-2 gap-2">
        {renderData("Project", getProject?.(projectId ?? ""))}
        {itemsDetail?.map((item, index) => (
          <div key={`${item.label}-${index}`}>
            {renderData(item.label, item.value)}
          </div>
        ))}
      </div>
    </div>
  );
};
