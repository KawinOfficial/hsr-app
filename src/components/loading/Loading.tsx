import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background/50 fixed inset-0 z-50">
      <Loader2 className="h-16 w-16 animate-spin" />
    </div>
  );
};

export default Loading;
