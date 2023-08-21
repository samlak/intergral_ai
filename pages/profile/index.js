import Head from "next/head";
import { getSession } from "next-auth/react";
import Layout from "@/components/Layout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Experience, Background, Project } from "@/components/ProfileDashboard";

export default function Profile() {

  return (
    <div>
      <Head>
        <title> Profile Page | Indielance</title>
      </Head>
      <div>
        <Layout activeTab="Profile"> 
          <main className="">
            <h1 className="text-3xl font-semibold text-center mb-7">
              Profile Page
            </h1>

            <section className="container px-0 xs:px-8">
              <Tabs defaultValue="background" className="">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="background">Background</TabsTrigger>
                  <TabsTrigger value="experiences">Experiences</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                </TabsList>
                <TabsContent value="background">
                  <Background />
                </TabsContent>
                <TabsContent value="experiences">
                  <Experience />
                </TabsContent>
                <TabsContent value="projects">
                  <Project />
                </TabsContent>
              </Tabs>  
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
        destination: "/login?redirect_page=/profile",
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
