import {
  Card,
  CardTitle,
} from "@/components/ui/card"
import {
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatSession() {
  const messages = [
    {
      role: "client",
      content: "Tell me about yourself",
    },
    {
      role: "chatbot",
      content: "I am an accomplished software developer with a proven track record of over 5 years in the industry. My expertise spans a wide spectrum of programming languages, technologies, and development methodologies, enabling me to create robust and efficient software solutions that meet the most demanding requirements.",
    },
    {
      role: "client",
      content: "What is your service offering",
    },
    {
      role: "chatbot",
      content: "I offer a comprehensive range of software development services tailored to meet your specific needs. With expertise in JavaScript, Python, Java, C#, C++, Ruby, PHP, Swift, SQL, HTML/CSS, React, and Node.js, I can design and deliver cutting-edge applications and solutions that drive innovation and efficiency. Whether you require robust web and mobile app development, efficient database management, or seamless front-end and back-end integration, my skillset enables me to craft solutions that not only meet your technical requirements but also enhance user experiences and contribute to your business success.",
    },
    {
      role: "client",
      content: "Tell me about your previous project",
    },
    {
      role: "chatbot",
      content: "In my previous project, I played a pivotal role in the development of a vibrant social networking platform aimed at fostering seamless connections among users. Within the timeframe of March 2017 to August 2018, I led the design and implementation efforts that resulted in an engaging user experience. Notably, I crafted interactive user profiles, integrated real-time chat functionalities, and seamlessly integrated content sharing capabilities. As a result of these endeavors, the platform garnered significant popularity, emerging as a central hub where users could effortlessly connect, collaborate, and engage. It was truly fulfilling to witness the platform flourish and contribute positively to user interactions and relationships.",
    },
    {
      role: "client",
      content: "I want to make a project request",
    },
    {
      role: "chatbot",
      content: "Absolutely, I'm well-equipped to handle your project request. With 5+ years of experience, I've delivered successful solutions across various domains, including social networking platforms, e-commerce systems, and educational apps. Let's connect to discuss your project specifics and collaborate on creating a tailored solution that meets your goals effectively. Looking forward to the opportunity to contribute to your project's success!",
    },
  ]

  return (
    <div className="flex flex-wrap justify-between">
      <Card className="w-full sm:w-[calc(50%-10px)] mb-4">
        <p className="px-4 py-4"> 
          <span className="underline font-bold">Adegoke</span> 
          {" "} started a conversation on {" "}
          <span className="underline font-bold">August 14 at 12:00pm</span>
          {" "} and ended the conversation on {" "}
          <span className="underline font-bold">August 14 at 1:00pm.</span>
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full bg-transparent text-foreground hover:bg-muted rounded-t-none  border-t text-center px-2 py-2">
              View Conversation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>Conversation with Adegoke</DialogTitle>
            </DialogHeader>

            <Card className="w-full h-[400px] mb-3">
              <ScrollArea className="h-full text-sm px-3">
                <div>
                  <div className="mt-3">{""}</div>
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
            </Card>
          </DialogContent>
        </Dialog>

      </Card>
    </div>
  );
}
  