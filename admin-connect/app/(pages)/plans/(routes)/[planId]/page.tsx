import prismadb from "@/lib/prismadb";
import { PlanForm } from "../components/plan-form";


const PlanPage = async ({
  params,
}: {
  params: { planId: string };
}) => {
  const plan = await prismadb.plan.findUnique({where: {id: params.planId}})
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PlanForm initialData={plan}/>
      </div>
    </div>
  );
};
export default PlanPage;
