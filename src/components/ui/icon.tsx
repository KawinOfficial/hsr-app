import {
  Home,
  Building2,
  DollarSign,
  BarChart3,
  Users,
  LucideIcon,
} from "lucide-react";

const LucideIconMap: Record<string, LucideIcon> = {
  Home: Home,
  Building2: Building2,
  DollarSign: DollarSign,
  BarChart3: BarChart3,
  Users: Users,
};

const Icon = ({ name, className }: { name: string; className?: string }) => {
  const Comp = LucideIconMap[name as keyof typeof LucideIconMap];
  return <Comp className={className} />;
};

export default Icon;
