import { PropsWithChildren } from "react";

interface PageHeaderProps extends PropsWithChildren {
  title: string;
  subTitle?: string;
}
const PageHeader = ({ title, subTitle, children }: PageHeaderProps) => {
  return (
    <div className="border-b bg-card">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">
              {title}
            </h1>
            {subTitle && (
              <p className="text-sm text-muted-foreground mt-1">{subTitle}</p>
            )}
          </div>
          <div className="w-full sm:w-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
