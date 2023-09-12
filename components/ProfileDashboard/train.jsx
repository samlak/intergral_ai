import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

import { useState } from "react";
import { Loader2 } from "lucide-react"


export default function Train({ profileData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [trainedData, setTrainedData] = useState(profileData.trained_data);

  const trainBot = async () => {
    setIsLoading(true);

    await fetch("/api/ai/train-bot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profileData,
      }),
    })
    .then((res) => res.json())
    .then(async (response) => {
      setIsLoading(false);
      if (response.status) {
        setTrainedData(response.data.trained_data);
        toast({
          title: "Submitted successfully",
          description: (
            <p>
              Your chatbot has been trained. Check your chatbot here {" "}
              <a href={`/pro/${profileData.username}`} target="_blank" className="text-blue-500 font-bold">
                {`https://indielance.co/pro/${profileData.username}`}
              </a>
            </p>
          )
        })
      } else {
        toast({
          title: "Submission unsuccessful",
          description: <p>Error occured while training your chatbot. Please try again!</p>,
        })
      }
    })
    .catch((error) => {
      setIsLoading(false);
      toast({
        title: "Submission unsuccessful",
        description: <p>Error occured while training your chatbot. Please try again!</p>,
      })
    });

  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="">Train your Chatbot</CardTitle>
        <CardDescription className="pt-2 text-sm">
          {!profileData.trained_data ?
            "Click on the button below to start training your chatbot." :
            "You have already trained your chatbot. You can check your chatbot below."
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        {!trainedData ?
          <Button className="h-9 px-6" onClick={trainBot} disabled={isLoading}>
            { isLoading && <Loader2 className="mr-1 h-4 w-4 animate-spin" /> }
            {"Train Chatbot"}
          </Button>
        :
          <>
            <Link href={`/pro/${profileData.username}`} target="_blank" className="text-blue-500 hover:underline font-bold">
              {`https://indielance.co/pro/${profileData.username}`}
            </Link>
            <br />
            <Button className="h-9 px-6 mt-7" onClick={trainBot} disabled={isLoading}>
              { isLoading && <Loader2 className="mr-1 h-4 w-4 animate-spin" /> }
              {"Retrain Chatbot"}
            </Button>
          </>
        }
      </CardContent>
    </Card>
  );
}
