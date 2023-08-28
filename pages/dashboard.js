import Head from "next/head";
import { getSession } from "next-auth/react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button"
import { ClientsData, Analytics, ChatSession } from "@/components/UserDashboard"

export default function Dashboard() {

  return (
    <div>
      <Head>
        <title>Dashboard | Indielance</title>
      </Head>
      <div>
        <Layout activeTab="Dashboard"> 
          <main className="">
            <section className="mb-10">
              <div className="mb-2">
                <h2 className="text-lg font-bold">
                  Dashboard
                </h2>
              </div>

              <Analytics />
            </section>

            <section className="mb-10">
              <div className="mb-2">
                <h2 className="text-lg font-bold">
                  Client
                </h2>
              </div>

              <ClientsData />
            </section>

            <section className="mb-10">
              <div className="mb-2">
                <h2 className="text-lg font-bold">
                  Chat Session
                </h2>
              </div>

              <ChatSession />
            </section>
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
