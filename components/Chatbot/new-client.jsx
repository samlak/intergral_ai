import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
  answerQuestion,
  profileName,
  setClientInfo
}) {
  const [isLoading, setIsLoading] = useState(false);

  const clientsSchema = z.object({
    name: z.string().min(1, {
      message: "Your name is required.",
    }),
    email: z.string().email({ message: "Invalid email address" }),
  });

  const defaultValues = {
    name: "",
    email: ""
  }

  const form = useForm({
    resolver: zodResolver(clientsSchema),
    defaultValues,
    mode: "onChange",
  });


  async function onSubmit (data) {
    setIsLoading(true);

    setClientInfo(JSON.stringify(data))
    localStorage.setItem('clientInfo', JSON.stringify(data));
    answerQuestion(pendingQuestion);
    setIsOpenNewClient(false);
    setPendingQuestion("")

    setIsLoading(false);
  }

  return (
    <div className="absolute top-0 left-0 bg-inherit w-full rounded-lg h-full flex items-center px-5">
      <div>
        <p className="text-center text-sm mb-3">
          Let {" "}
          <strong>{profileName}</strong>
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
