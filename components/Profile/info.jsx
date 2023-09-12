import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants, Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Skill from "./skill"


export default function Info({ profileData, setIsChatbotOpen }) {   
  const openChatbot = () => {
    if(profileData.trained_data){
      setIsChatbotOpen(true);
    }
  }

  return (
    <>
      <section className="container">
        <div className="pb-5 pt-5 text-center flex flex-col justify-center items-center">
          <Avatar className="w-40 h-40 mb-2">
            <AvatarImage 
              className="rounded-full border-8"
              src={profileData.image} 
              alt={profileData.username} 
            />
            <AvatarFallback className="text-7xl">PP</AvatarFallback>
          </Avatar>
          <h2 className="font-bold text-2xl">{profileData.name}</h2>
          <p className="text-lg">{profileData.title}</p>
          <div className="my-2">
            <Link href={profileData.calender_link} className={cn(buttonVariants(), "h-9 mr-2 text-lg font-semibold")} >
              Call Me
            </Link> 
            <Button onClick={openChatbot} className="h-9 text-lg font-semibold">
              Chat Me
            </Button>
          </div>
          <div className="mt-2 max-w-md ">
            <div className="flex flex-wrap justify-center ">
              {profileData.external_links.map((link, index) => (
                <Link href={link.url} key={index} className="mr-3 mb-1 underline" target="_blank"> 
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-2 max-w-md ">
            <Skill skillsets={profileData.skillsets}/>
          </div>
        </div>
      </section>
    </>
  );
}