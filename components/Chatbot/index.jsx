import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { QuestionInput } from "./QuestionInput";
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

export default function Chatbot({ isChatbotOpen, setIsChatbotOpen }) {
  const ref = useRef(null);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen)
  }
  
  function scrollDown() {
    const lastChildElement = ref.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: 'smooth' });
  }

  const [messages, setMessages] = useState([])


  const answerInitialQuestions = async (client, chatbot) => {
    await setMessages((state) => ([
      ...state, 
      {
        role: "client",
        content: client,
      },
      {
        role: "chatbot",
        content: chatbot,
      },
    ]))
    scrollDown();
  }

  const initialQuestions = [
    {
      text: "Tell me about yourself",
      action: () => answerInitialQuestions(
        "Tell me about yourself",
        "I am an accomplished software developer with a proven track record of over 5 years in the industry. My expertise spans a wide spectrum of programming languages, technologies, and development methodologies, enabling me to create robust and efficient software solutions that meet the most demanding requirements."
      )
    },
    {
      text: "What is your service offering",
      action: () => answerInitialQuestions(
        "What is your service offering",
        "I offer a comprehensive range of software development services tailored to meet your specific needs. With expertise in JavaScript, Python, Java, C#, C++, Ruby, PHP, Swift, SQL, HTML/CSS, React, and Node.js, I can design and deliver cutting-edge applications and solutions that drive innovation and efficiency. Whether you require robust web and mobile app development, efficient database management, or seamless front-end and back-end integration, my skillset enables me to craft solutions that not only meet your technical requirements but also enhance user experiences and contribute to your business success."
      )
    },
    {
      text: "Tell me about your previous project",
      action: () => answerInitialQuestions(
        "Tell me about your previous project",
        "In my previous project, I played a pivotal role in the development of a vibrant social networking platform aimed at fostering seamless connections among users. Within the timeframe of March 2017 to August 2018, I led the design and implementation efforts that resulted in an engaging user experience. Notably, I crafted interactive user profiles, integrated real-time chat functionalities, and seamlessly integrated content sharing capabilities. As a result of these endeavors, the platform garnered significant popularity, emerging as a central hub where users could effortlessly connect, collaborate, and engage. It was truly fulfilling to witness the platform flourish and contribute positively to user interactions and relationships."
      )
    },
    {
      text: "I want to make a project request",
      action: () => answerInitialQuestions(
        "I want to make a project request",
        "Absolutely, I'm well-equipped to handle your project request. With 5+ years of experience, I've delivered successful solutions across various domains, including social networking platforms, e-commerce systems, and educational apps. Let's connect to discuss your project specifics and collaborate on creating a tailored solution that meets your goals effectively. Looking forward to the opportunity to contribute to your project's success!"
      )
    },
    {
      text: "I want to book a call with you",
      action: () => answerInitialQuestions(
        "I want to make a project request",
        "Absolutely, I would be delighted to connect with you further. To schedule a call at your convenience, please use my Calendly link: https://calendly.com/samlak. This will allow you to choose a suitable time slot that works best for you, and we can have a productive conversation about how I can contribute to your projects and goals. Looking forward to our discussion!"
      )
    }
  ]

  
  return (
    <section className="fixed bottom-5 right-5 flex flex-col z-50">
      {isChatbotOpen &&
        <div className="ml-5 xs:ml-0">
          <Card className="w-full xs:w-[400px] h-[450px] xs:h-[400px] max-h-full mb-3 border-primary">
            <CardHeader className="bg-blue-500 rounded-t-md py-2 px-4 flex flex-row items-center">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/profile.jpeg" alt="devsamlak" />
                  <AvatarFallback>PP</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-semibold leading-none">Haruna Salami</p>
                  <p className="text-sm font-medium text-gray-800">Software Developer</p>
                </div>
              </div>
            </CardHeader>
            <ScrollArea className="h-[344px] xs:h-[290px] text-sm px-3">
              {/* INITIAL QUESTIONS */}
              <div className="mt-2 mb-3 bg-muted rounded-lg p-2">
                <p className=" text-sm mb-2">
                  Hello samlak! What would you like to disscuss with me?
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
                      message.role === "client"
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
              <QuestionInput setMessages={setMessages} scrollDown={scrollDown} />
            </div>
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
