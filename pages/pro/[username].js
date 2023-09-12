import { useState } from "react";
import Head from "next/head";
import Layout from "@/components/HomePage/layout";
import Chatbot from "@/components/Chatbot";
import { About, Experience, Info, Project, Footer } from "@/components/Profile";
import { Separator } from "@/components/ui/separator";
import { customUrl } from "@/lib/url";
import Link from "next/link"

export default function ProfilePage({ profileData }) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  return (
    <>
      <Head>
        <title>
          { profileData ? 
            `${profileData.name} | Indielance` : 
            "Profile | Indielance" 
          }
        </title>
      </Head>
      <Layout showFooter={false}>
        {profileData ? 
          <>
            <Info profileData={profileData} setIsChatbotOpen={setIsChatbotOpen} />
            <Separator />

            <About profileData={profileData} />
            <Separator />

            <Experience profileData={profileData} />
            <Separator />

            <Project profileData={profileData} />

            <Footer />

            {profileData.trained_data &&
              <Chatbot
                profileData={profileData}
                isChatbotOpen={isChatbotOpen}
                setIsChatbotOpen={setIsChatbotOpen}
              />
            }
          </>
          : 
          <p className="my-10 text-center">
            Profile can not be found. You can create your own {" "}
            <Link href="/" className="text-blue-500 font-bold underline">
              profile here
            </Link>
          </p>
        }

      </Layout>
    </>
  );
};



export async function getServerSideProps({ req, params }) {
  const { username } = params;

  let profileData;
  
  await fetch(customUrl("/api/profile/get"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      search: { username }
    })
  })
  .then(response => response.json())
  .then(data => {
    profileData = data.data;
  });

  return {
    props: { 
      profileData
    },
  };
}
