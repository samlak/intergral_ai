import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/react-hook-form/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function NewClient({ 
  setIsOpenNewClient,  
  setPendingQuestion,
  pendingQuestion,
  answerQuestion
}) {
  const [isLoading, setIsLoading] = useState(false);

  const clientsSchema = z.object({
    name: z.string().min(1, {
      message: "Your name is required.",
    }),
    email: z.string().email({ message: "Invalid email address" }),
  });

  const form = useForm({
    resolver: zodResolver(clientsSchema),
    defaultValues: "",
    mode: "onChange",
  });


  async function onSubmit (data) {
    setIsLoading(true);

    await fetch("/api/client/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    })
    .then((res) => res.json())
    .then(async (response) => {
      setIsLoading(false);
      if (response.status) {
        answerQuestion(pendingQuestion);
        setPendingQuestion("")
        localStorage.setItem('clientInfo', JSON.stringify(response.data));
        setIsOpenNewClient(false);
      } else {
        toast({
          title: "Submission unsuccessful",
          description: <p>Error occured while submitting your data. Please try again!</p>,
        })
      }
    })
    .catch((error) => {
      setIsLoading(false);
      toast({
        title: "Submission unsuccessful",
        description: <p>Error occured while submitting your data. Please try again!</p>,
      })
    });
  }

  return (
    <div className="absolute top-0 left-0 bg-inherit w-full rounded-lg h-full flex items-center px-5">
      <div>
        <p className="text-center text-sm mb-3">
          Let {" "}
          <strong>Adebayo Salami</strong>
          {" "} know who is chatting with them by providing your contact details below.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="h-8 w-full">
              {isLoading && (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                </>
              )}
              Send & Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
