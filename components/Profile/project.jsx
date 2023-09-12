import { useRef } from "react";
import Link from "next/link";
import { TruncatedText } from "./truncated-text";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Project({ profileData }) {
  const ref = useRef(null);
  
  const scrollToRight = () => {
    ref.current.scrollLeft += 150;
  };

  const scrollToLeft = () => {
    ref.current.scrollLeft -= 150;
  };

  return (
    <section className="container py-10">
      <h2 className="text-center font-semibold text-2xl">PREVIOUS PROJECTS</h2>
      <div
        className="py-5 flex items-start overflow-x-scroll scroll-smooth scroll"
        ref={ref}
      >
        {profileData.projects.length ?
          profileData.projects.map((project, index) => (
            <Card
              key={index}
              className="flex-none px-3 py-3 w-[310px] xs:w-[350px] mr-3"
            >
              <Link href={project.project_link} className="font-semibold underline">
                {project.project_title}
              </Link>
              <p className="text-sm mb-2">
                {project.start_date.month} {" "} {project.start_date.year} - {project.end_date.month} {" "} {project.end_date.month !== "Present" && project.end_date.year}
              </p>
              <TruncatedText description={project.description} />
            </Card>
          ))
        : 
          <div className="flex w-full justify-center mt-5">
            <p className="font-semibold">No previous project provided yet. Contact the user for more info. not yet uploaded</p>
          </div>
        }
      </div>
      <div className="flex justify-end">
        <Button
          onClick={scrollToLeft}
          className="flex justify-center items-center h-11 w-11 p-0 rounded-full dark:text-white text-dark bg-transparent hover:bg-slate-800 mr-2"
        >
          <ChevronLeftCircle className="h-10 w-10" />
        </Button>
        <Button
          onClick={scrollToRight}
          className="flex justify-center items-center h-11 w-11 p-0 rounded-full dark:text-white text-dark bg-transparent hover:bg-slate-800"
        >
          <ChevronRightCircle className="h-10 w-10" />
        </Button>
      </div>
    </section>
  );
}
