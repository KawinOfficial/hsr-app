import { PropsWithChildren } from "react";

interface PageHeaderProps extends PropsWithChildren {
  title: string;
  subTitle?: string;
}
const PageHeader = ({ title, subTitle, children }: PageHeaderProps) => {
  return (
    <div className="border-b bg-card">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground">{subTitle}</p>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
