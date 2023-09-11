import Head from "next/head";
import { getSession } from "next-auth/react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button"
import { ClientsData, Analytics, ChatSession } from "@/components/UserDashboard"
import { customUrl } from "@/lib/url";
import { useEffect, useState } from "react";

export default function Dashboard({ conversationData }) {
  const [ clients, setClients ] = useState([]);
  const [ conversations, setConversations ] = useState([]);
  const [ username, setUsername ] = useState("");

  useEffect(() => {
    if(conversationData.conversation.length){
      const clientsData =  conversationData.conversation.map((data) => ({
        name: data.client_name,
        email: data.client_email,
      }))

      const uniqueClients = clientsData.filter((client, index, self) =>
        index === self.findIndex(data => data.email === client.email)
      );

      setConversations(conversationData.conversation)
      setClients(uniqueClients)
      setUsername(conversationData.username)
    }
  }, [])
  
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

              <Analytics 
                clientsLength={clients.length}
                conversationsLength={conversations.length}
                username={username}
              />
            </section>

            <section className="mb-10" id="client-data">
              <div className="mb-2">
                <h2 className="text-lg font-bold">
                  Client
                </h2>
              </div>

              <ClientsData clients={clients} />
            </section>

            <section className="mb-10" id="conversation">
              <div className="mb-2">
                <h2 className="text-lg font-bold">
                  Chat Session
                </h2>
              </div>

              <ChatSession conversations={conversations} />
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

  let conversationData;
  
  await fetch(customUrl("/api/conversation/get"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      email: session.user.email 
    })
  })
  .then(response => response.json())
  .then(data => {
    conversationData = data.data;
  });

  return {
    props: { 
      session,
      conversationData
    },
  };
}
