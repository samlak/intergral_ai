import Head from "next/head";
import { getSession } from "next-auth/react";
import Layout from "@/components/Layout";

export default function Dashboard() {

  return (
    <div>
      <Head>
        <title>Dashboard | Indielance</title>
      </Head>
      <div>
        <Layout activeTab="Dashboard"> 
          <main className="text-center">
            <h1 className="text-3xl font-semibold">
              Connect with Investor
            </h1>
            <p className="mt-1">
              You can raise money easily using Startup Assistant. You will be connected to investor that invest in your industry.
            </p>

            <p className="text-center mt-10 font-medium text-2xl">Coming Soon</p>

            {/* <div className="mt-5 mb-7 py-8 max-w-xl mx-auto rounded-lg border bg-card text-card-foreground shadow-sm">
   
            </div> */}
          </main>
        </Layout>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login?redirect_page=/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: { 
      session,
    },
  };
}
