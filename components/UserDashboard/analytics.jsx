import {
  Card,
  CardTitle,
} from "@/components/ui/card"
import {
  Users,
  MessagesSquare
} from "lucide-react"
import Link from "next/link";

export default function Analytics() {
    return (
      <div className="flex flex-wrap">
        <Card className="w-[calc(50%-5px)] md:w-[calc(33%-5px)] mr-[5px]  px-4 py-2">
          <div className="flex flex-row items-center justify-between space-y-0  pb-2">
            <CardTitle className="text-lg font-medium">
              Client
            </CardTitle>
            <Users className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="flex justify-between items-end">
            <div className="text-2xl font-bold">50</div>
            <Link href={"#"} className="text-sm  text-muted-foreground hover:text-foreground" >View More</Link>
          </div>
        </Card>

        <Card className="w-[calc(50%-5px)] md:w-[calc(33%-5px)] ml-[5px] px-4 py-2">
          <div className="flex flex-row items-center justify-between space-y-0  pb-2">
            <CardTitle className="text-lg font-medium">
              Chat Session
            </CardTitle>
            <MessagesSquare className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="flex justify-between items-end">
            <div className="text-2xl font-bold">100</div>
            <Link href={"#"} className="text-sm  text-muted-foreground hover:text-foreground" >View More</Link>
          </div>
        </Card>
      </div>
    );
  }
  