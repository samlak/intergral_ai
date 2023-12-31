import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { QuestionInput } from "./question-input";
import { NewClient } from "./new-client";
import { 
  MessagesSquare,
  X,
} from "lucide-react";
import {
  Card,
  CardHeader,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useChat } from 'ai/react';
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton"
import ReactMarkdown from 'react-markdown'

export default function Chatbot({ profileData, isChatbotOpen, setIsChatbotOpen }) {
  const ref = useRef(null);
  const [clientInfo, setClientInfo] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [isOpenNewClient, setIsOpenNewClient] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");

  const onFinishGeneration =  async (data) => {
    const clientData = JSON.parse(localStorage.getItem('clientInfo'));
  
    if (clientData && clientData.email) {
      const formData = {
        user: profileData.user,
        conversation_id: conversationId,
        client_name: clientData.name,
        client_email: clientData.email,
        messages
      }

      await fetch("/api/conversation/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: formData
        }),
      })
      .then((res) => res.json())
      .then(async (response) => {
        if (response.status) {
          setConversationId(response.data)
        } else {
          toast({
            title: "Unable to save your chat. Please try again!",
          })
        }
      })
      .catch((error) => {
        toast({
          title: "Unable to save your chat. Please try again!",
        })
      });
    }
  }

  const { messages, append, isLoading: isGenerating } = useChat({
    api: "/api/ai/profile-chat",
    onResponse: () => setIsWaitingForResponse(false),
    body: { 
      trainedData: profileData.trained_data,
      profession: profileData.title
    }
  });

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen)
  }
  
  function scrollDown() {
    const lastChildElement = ref.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: 'smooth' });
  }

  const answerQuestion = async (question) => {   
    await setCurrentQuestion(question)
    setIsWaitingForResponse(true)
    await append({
      role: "user",
      content: question,
    })

    scrollDown();
  }

  const answerInitialQuestion = async (question) => {
    if(!messages.length && !clientInfo) {
      setPendingQuestion(question);
      setIsOpenNewClient(true);
      return ;
    }

    answerQuestion(question);
  }

  const initialQuestions = [
    {
      text: "Tell me about yourself",
      action: () => answerInitialQuestion("Tell me about yourself")
    },
    {
      text: "What is your service offering",
      action: () => answerInitialQuestion("What is your service offering")
    },
    {
      text: "Tell me about your previous project",
      action: () => answerInitialQuestion("Tell me about your previous project")
    },
    {
      text: "I want to make a project request",
      action: () => answerInitialQuestion("I want to make a project request")
    },
    {
      text: "I want to book a call with you",
      action: () => answerInitialQuestion("I want to book a call with you")
    }
  ]

  useEffect(() => {
    const clientData = JSON.parse(localStorage.getItem('clientInfo'));
    if (clientData && clientData.email) {
      setClientInfo(clientData);
    }
  }, [])
  
  useEffect(() => {
    if(!isGenerating && messages.length){
      onFinishGeneration();
    }
  }, [isGenerating])

  return (
    <section className="fixed bottom-5 right-5 flex flex-col z-50">
      {isChatbotOpen &&
        <div className="ml-5 xs:ml-0">
          <Card className="w-full xs:w-[400px] h-[450px] xs:h-[430px] max-h-full mb-3 border-primary relative">
            <>
              <CardHeader className="bg-blue-500 rounded-t-md py-2 px-4 flex flex-row items-center">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage 
                      src={profileData.image}  
                      alt={profileData.username} 
                    />
                    <AvatarFallback>PP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-base font-semibold leading-none">{profileData.name}</p>
                    <p className="text-sm font-medium text-gray-800">{profileData.title}</p>
                  </div>
                </div>
              </CardHeader>
              <ScrollArea className="h-[344px] xs:h-[320px] text-sm px-3">
                {/* INITIAL QUESTIONS */}
                <div className="mt-2 mb-3 bg-muted rounded-lg p-2">
                  <p className=" text-sm mb-2">
                    Hello there! What would you like to disscuss with me?
                  </p>
                  <div className="flex flex-col items-start">
                    { initialQuestions.map((question, index) => (
                      <Button 
                        key={index}
                        onClick={question.action}
                        variant="outline" 
                        className="rounded-lg mr-2 mb-2 h-6 text-xs px-3 border-white hover:bg-primary"
                      >
                        {question.text}
                      </Button>
                    ))}
                  </div>
                </div>
                {/* OTHER MESSAGES */}
                <div ref={ref}>
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex w-fit max-w-[75%] flex-col rounded-lg px-3 py-2 text-sm mb-3",
                        message.role === "user"
                          ? "ml-auto bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <ReactMarkdown className="markdown_style">
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ))}
                  { isWaitingForResponse && 
                    <Skeleton className="h-10 w-[75%] rounded-lg bg-muted mb-4" />
                  }
                </div>
              </ScrollArea>
              <div>
                <QuestionInput 
                  messages={messages}
                  clientInfo={clientInfo}
                  setPendingQuestion={setPendingQuestion}
                  setIsOpenNewClient={setIsOpenNewClient}
                  answerQuestion={answerQuestion}
                />
              </div>
            </>
            { isOpenNewClient && 
              <NewClient 
                setIsOpenNewClient={setIsOpenNewClient}
                setPendingQuestion={setPendingQuestion}
                pendingQuestion={pendingQuestion}
                answerQuestion={answerQuestion} 
                profileName={profileData.name}
                setClientInfo={setClientInfo}
              /> 
            }
          </Card>
        </div>
      }
      <Button 
        onClick={toggleChatbot}
        className="flex justify-center self-end items-center outline text-black dark:text-white rounded-2xl w-36 h-9 hover:bg-primary outline-primary bg-primary-foreground right-0"
      >
        <p className="mr-2 font-semibold">
          {isChatbotOpen ? "Close Chat" : "Chat Me"}
        </p> 
        { isChatbotOpen ?
          <X className="h-6 w-6" /> :
          <MessagesSquare className="h-7 w-7" />
        }
      </Button>
    </section>
  );
}
