import { useState } from "react";
import Head from "next/head";
import Layout from "@/components/HomePage/layout";
import Chatbot from "@/components/Chatbot";
import { About, Experience, Info, Project, Footer } from "@/components/Profile";
import { Separator } from "@/components/ui/separator"


const Home = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  return (
    <>
      <Head>
        <title>Profile | Indielance</title>
      </Head>
      <Layout showFooter={false}>
        <Info setIsChatbotOpen={setIsChatbotOpen} />
        <Separator />

        <About />
        <Separator />

        <Experience />
        <Separator />

        <Project />

        <Footer />

        <Chatbot
          isChatbotOpen={isChatbotOpen}
          setIsChatbotOpen={setIsChatbotOpen}
        />

      </Layout>
    </>
  );
};

export default Home;
