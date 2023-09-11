import {
  Card,
  CardTitle,
} from "@/components/ui/card"
import {
  Users,
  MessagesSquare,
  Plus,
  Settings
} from "lucide-react"
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function Analytics({ clientsLength, conversationsLength, username  }) {
    return (
      <div className="flex flex-wrap">
        <Card className="w-[calc(50%-5px)] md:w-[calc(33%-5px)] mr-[5px]  px-4 py-2 flex flex-col justify-between">
          <div className="flex flex-row items-center justify-between space-y-0  pb-2">
            <CardTitle className="text-lg font-medium">
              Client
            </CardTitle>
            <Users className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="flex justify-between items-end">
            <div className="text-2xl font-bold">{clientsLength}</div>
            <Link href={"#client-data"} className="text-sm  text-muted-foreground hover:text-foreground" >View More</Link>
          </div>
        </Card>

        <Card className="w-[calc(50%-5px)] md:w-[calc(33%-5px)] ml-[5px] px-4 py-2 flex flex-col justify-between">
          <div className="flex flex-row items-center justify-between space-y-0  pb-2">
            <CardTitle className="text-lg font-medium">
              Chat Session
            </CardTitle>
            <MessagesSquare className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="flex justify-between items-end">
            <div className="text-2xl font-bold">{conversationsLength}</div>
            <Link href={"#conversation"} className="text-sm  text-muted-foreground hover:text-foreground" >View More</Link>
          </div>
        </Card>

        <Card className="w-full md:w-[calc(33%-5px)] ml-0 md:ml-[10px] mt-3 md:mt-0">
          {username ?
            <div className="overflow-hidden">
              <div className="text-center my-2">
                <p className="font-medium">Profile Page</p>
                <Link href={`/pro/${username}`} target="_blank" className="text-blue-500 hover:underline text-sm font-bold">
                  {`https://indielance.co/pro/${username}`}
                </Link>
              </div>
              <Link 
                href="/profile" 
                className={cn(buttonVariants({ size: "sm" }), "w-full bg-transparent text-foreground hover:bg-muted rounded-t-none  border-t text-center px-2 py-2")}
              >
                <Settings className="mr-1 h-4 w-4" />
                {"Edit Profile"}
              </Link>
            </div>
          :
            <div className="py-4 md:py-0 h-full w-full flex items-center justify-center">
              <Link href="/profile" className={cn(buttonVariants({ size: "sm" }))}>
                <Plus className="mr-1 h-4 w-4" />
                {"Create Profile"}
              </Link>
            </div>
          }
        </Card>
      </div>
    );
  }
  