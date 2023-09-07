import {
  Card
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import moment from "moment";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from 'react-markdown'

export default function ChatSession({ conversations }) {
  const readableDate = (timestamp) => moment(timestamp).format("MMMM Do [at] h:mm a");

  return (
    <>
      { conversations.length ?
        <div className="flex flex-wrap justify-between">
          {conversations.map((conversation, index) => (
            <Card className="w-full sm:w-[calc(50%-10px)] mb-4" key={index}>
              <p className="px-4 py-4"> 
                <span className="underline font-bold">{conversation.client_name}</span> 
                {" "} started a conversation on {" "}
                <span className="underline font-bold">{readableDate(conversation.createdAt)}</span>
                {" "} and ended the conversation on {" "}
                <span className="underline font-bold">{readableDate(conversation.updatedAt)}</span>
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
                        {conversation.messages.map((message, id) => (
                          <div
                            key={id}
                            className={cn(
                              "flex w-fit max-w-[75%] flex-col rounded-lg px-3 py-2 text-sm mb-3",
                              message.role === "user"
                                ? "ml-auto bg-primary text-primary-foreground"
                                : "bg-muted"
                            )}
                          >
                            <ReactMarkdown>
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </Card>
                </DialogContent>
              </Dialog>
            </Card>
          ))}
        </div>
      :
        <p className="text-center font-semibold"> Nobody have interacted with your chatbot yet. </p>
      }
    </>
  );
}
  