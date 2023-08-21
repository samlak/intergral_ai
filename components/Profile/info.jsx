import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants, Button } from "@/components/ui/button";import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Skill from "./skill"


export default function Info({ setIsChatbotOpen }) { 
  const linkOptions = [
    {
      url: "/",
      text: "Github" 
    },
    {
      url: "/",
      text: "Binnace" 
    },
    {
      url: "/",
      text: "LinkedIn" 
    },
    {
      url: "/",
      text: "Twitter" 
    },
  ] 
  
  const openChatbot = () => setIsChatbotOpen(true);

  return (
    <>
      <section className="container">
        <div className="pb-5 pt-5 text-center flex flex-col justify-center items-center">
          <Avatar className="w-40 h-40 mb-2">
            <AvatarImage 
              className="rounded-full border-8"
              src="/profile.jpeg" 
              alt="devsamlak" 
            />
            <AvatarFallback className="text-7xl">PP</AvatarFallback>
          </Avatar>
          <h2 className="font-bold text-2xl">Haruna Salami</h2>
          <p className="text-lg">Software Developer</p>
          <div className="my-2">
            <Link href={"/"} className={cn(buttonVariants(), "h-9 mr-2 text-lg font-semibold")} >
              Call Me
            </Link> 
            <Button onClick={openChatbot} className="h-9 text-lg font-semibold">
              Chat Me
            </Button>
          </div>
          <div>
            {linkOptions.map((link, index) => (
              <Link href={link.url} key={index} className="mr-3 underline"> 
                {link.text}
              </Link>
            ))}
          </div>
          <div className="mt-2 max-w-md ">
            <Skill />
          </div>
        </div>
      </section>
    </>
  );
}