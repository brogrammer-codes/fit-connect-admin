import type { NextPage, GetStaticProps } from "next";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";
import Head from "next/head";
import { ActivityDisplay } from "../../components/activity-display";
import { Heading } from "~/components/ui/heading";

const ClientPlanPage: NextPage<{ clientId: string; planId: string }> = ({
  clientId,
  planId,
}) => {
  const { data } = api.client.getClientPlan.useQuery({ clientId, planId });
  if (!data) return <div>No Plan Found</div>;
  const { plan } = data;

  return (
    <>
      <Head>
        <title>{plan.name}</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
        <div className="flex flex-col space-y-3">
          <Heading title={plan.name} description={plan.description}/>
          <ActivityDisplay plan={plan}/>
        </div>
      </main>
    </>
  );
};
export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();
  const clientId = context.params?.clientId;
  const planId = context.params?.planId;
  if (typeof clientId !== "string") throw new Error("no client id");
  if (typeof planId !== "string") throw new Error("no plan id");
  await ssg.client.getClientPlan.prefetch({clientId, planId})
  return {
    props: {
      trpcState: ssg.dehydrate(),
      clientId,
      planId,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
export default ClientPlanPage;
