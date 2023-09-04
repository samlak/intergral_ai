import { useRef } from "react";
import Link from "next/link";
import { TruncatedText } from "./truncated-text";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Experience({ profileData }) {
  const ref = useRef(null);
  
  const scrollToRight = () => {
    ref.current.scrollLeft += 150;
  };

  const scrollToLeft = () => {
    ref.current.scrollLeft -= 150;
  };

  return (
    <section className="container py-10">
      <h2 className="text-center font-semibold text-2xl">WORK EXPERIENCES</h2>
      <div
        className="py-5 flex items-start overflow-x-scroll scroll-smooth scroll"
        ref={ref}
      >
        {profileData.experiences.length ?
          profileData.experiences.map((job, index) => (
            <Card
              key={index}
              className="flex-none px-3 py-3 w-[310px] xs:w-[350px] mr-3"
            >
              <p className="font-semibold">{job.job_title}</p>
              <Link href={job.company_link} className="font-semibold underline">
                {job.company_name}
              </Link>
              <p className="text-sm mb-2">
                {job.start_date.month} {" "} {job.start_date.year} - {job.end_date.month} {" "} {job.end_date.year}
              </p>
              <TruncatedText description={job.description} />
            </Card>
          ))
        : 
          <div className="flex w-full justify-center mt-5">
            <p className="font-semibold">Work experience not yet uploaded</p>
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
