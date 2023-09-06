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

export default function Chatbot({ profileData, isChatbotOpen, setIsChatbotOpen }) {
  const ref = useRef(null);
  const [clientId, setClientId] = useState("");
  const [isOpenNewClient, setIsOpenNewClient] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState("");

  const { messages, append } = useChat({api: "/api/ai/profile-chat"});


  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen)
  }
  
  function scrollDown() {
    const lastChildElement = ref.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: 'smooth' });
  }

  const answerQuestion = async (question) => {    
    append({
      role: "user",
      content: question,
    })
    
    scrollDown();
  }

  const answerInitialQuestion = async (question) => {
    if(!messages.length && !clientId) {
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
    const clientInfo = JSON.parse(localStorage.getItem('clientInfo'));
    if (clientInfo) {
      setClientId(clientInfo);
    }
  }, [])
  

  return (
    <section className="fixed bottom-5 right-5 flex flex-col z-50">
      {isChatbotOpen &&
        <div className="ml-5 xs:ml-0">
          <Card className="w-full xs:w-[400px] h-[450px] xs:h-[400px] max-h-full mb-3 border-primary relative">
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
              <ScrollArea className="h-[344px] xs:h-[290px] text-sm px-3">
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
                      {message.content}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div>
                <QuestionInput 
                  messages={messages}
                  clientId={clientId}
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
