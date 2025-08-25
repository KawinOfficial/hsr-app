import PageHeader from "@/components/layout/page-haeder/PageHeader";
import { CategoryList } from "@/features/category/components/category-list";
import { CreateCategoryDialog } from "@/features/category/components/create-category-dialog";
import { EditCategoryDialog } from "@/features/category/components/edit-category-dialog";

export default function CategoryPage() {
  return (
    <div>
      <PageHeader
        title="Cost Category Management"
        subTitle="Manage project cost categories"
      />
      <div className="px-4 sm:px-6 py-8">
        <CategoryList />
      </div>

      <CreateCategoryDialog />
      <EditCategoryDialog />
    </div>
  );
}
