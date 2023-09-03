import Head from "next/head";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import Layout from "@/components/Layout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Experience, Background, Project } from "@/components/ProfileDashboard";
import { customUrl } from "@/lib/url";

export default function Profile({profileData}) {
  const [ isNewProfile, setIsNewProfile ] = useState(true)

  useEffect(() => {
    if (profileData && profileData._id) {
      setIsNewProfile(false);
    }
  }, [])
  
  return (
    <div>
      <Head>
        <title> Profile Page | Indielance</title>
      </Head>
      <div>
        <Layout activeTab="Profile"> 
          <main className="">
            <h1 className="text-3xl font-semibold text-center mb-7">
              Create Profile 
            </h1>

            <section className="container px-0 xs:px-8">
              <Tabs defaultValue="background" className="">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="background">
                    Background
                  </TabsTrigger>
                  <TabsTrigger value="experiences" disabled={isNewProfile}>
                    Experiences
                  </TabsTrigger>
                  <TabsTrigger value="projects" disabled={isNewProfile}>
                    Projects
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="background">
                  <Background 
                    profileData={profileData} 
                    setIsNewProfile={setIsNewProfile}
                  />
                </TabsContent>
                <TabsContent value="experiences">
                  <Experience profileData={profileData} />
                </TabsContent>
                <TabsContent value="projects">
                  <Project profileData={profileData} />
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


  let profileData;
  
  await fetch(customUrl("/api/profile/get"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      search: { email: session.user.email }
    })
  })
  .then(response => response.json())
  .then(data => {
    profileData = data.data;
  });

  return {
    props: { 
      session,
      profileData
    },
  };
}
