import type { NextPage, GetStaticProps } from "next";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";
import Head from "next/head";

const ClientPage: NextPage<{ clientId: string }> = ({ clientId }) => {
  const { data } = api.client.getClient.useQuery({ clientId });
  if (!data) return <div>No Client with that ID</div>;
  const { client } = data;
  return (
    <>
      <Head>
        <title>{client.name}</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
        <div className="flex flex-col space-y-3">
          <span className="text-3xl font-semibold">Welcome {client.name}</span>
          <span className="text-xl">Achieve Your Fitness Goals, Your Way</span>
          <span className="">{`Plans (${client.planList.length})`}</span>
          <span className="">
            To use Fit Connect you need a Coach to create an admin account or
            you can visit the Admin portal to sign-up and add yourself as a
            client.
          </span>
        </div>
      </main>
    </>
  );
};
export const getStaticProps: GetStaticProps = (context) => {
  const ssg = generateSSGHelper();
  const clientId = context.params?.clientId;
  if (typeof clientId !== "string") throw new Error("no client id");
  return {
    props: {
      trpcState: ssg.dehydrate(),
      clientId,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
export default ClientPage;
