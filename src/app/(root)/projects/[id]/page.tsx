import PageHeader from "@/components/layout/page-haeder/PageHeader";

export default function ProjectDetail({ params }: { params: { id: string } }) {
  return (
    <div className="bg-background">
      <PageHeader title="Project Detail" subTitle={params.id} />
    </div>
  );
}
