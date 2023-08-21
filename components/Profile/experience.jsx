import { useRef } from "react";
import Link from "next/link";
import { TruncatedText } from "./truncated-text";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Experience() {
  const ref = useRef(null);

  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "Tech Innovators Ltd.",
      link: "https://techinnovators.com",
      startDate: "March 2021",
      endDate: "Present",
      description:
        "As a senior software engineer, I play a pivotal role in architecting and developing cutting-edge software solutions. My extensive expertise in various programming languages and technologies enables me to design robust and scalable systems. I collaborate closely with cross-functional teams to ensure seamless integration and delivery of high-quality products.",
    },
    {
      title: "Lead Developer",
      company: "CodeCrafters Co.",
      link: "https://codecrafters.com",
      startDate: "June 2019",
      endDate: "January 2021",
      description:
        "I served as the lead developer, overseeing the entire software development lifecycle from concept to deployment. I led a talented team in the design and implementation of complex software solutions. My leadership resulted in improved code quality and faster project delivery through the adoption of modern development practices.",
    },
    {
      title: "Co-Founder & CTO",
      company: "Penmaniacs Inc.",
      link: "https://penmaniacs.com",
      startDate: "December 2022",
      endDate: "August 2023",
      description:
        "As the co-founder and CTO of Penmaniacs Inc., I drove technical innovation and product development. I orchestrated the creation of a user-friendly platform that revolutionized the way people engage with writing. Leading the development team, I implemented novel features and maintained a responsive, secure, and scalable web application.",
    },
    {
      title: "Software Architect",
      company: "InnoSoft Solutions",
      link: "https://innosoftsolutions.com",
      startDate: "September 2018",
      endDate: "June 2019",
      description:
        "My role as a software architect involved designing and implementing high-level software structures that enabled efficient development and maintenance. I collaborated closely with stakeholders to translate business requirements into technical solutions. By establishing robust architectural patterns, I contributed to the creation of reliable and adaptable software systems.",
    },
    {
      title: "Frontend Developer",
      company: "WebWizards Agency",
      link: "https://webwizardsagency.com",
      startDate: "April 2017",
      endDate: "August 2018",
      description:
        "During my tenure as a frontend developer, I crafted engaging and user-friendly web interfaces. I leveraged my proficiency in HTML, CSS, and JavaScript to create visually appealing and responsive designs. My contributions played a crucial role in enhancing user experiences and ensuring seamless interactions for a variety of clients.",
    },
    {
      title: "Software Engineer",
      company: "ByteBlaze Technologies",
      link: "https://byteblazetechnologies.com",
      startDate: "January 2016",
      endDate: "March 2017",
      description:
        "As a software engineer, I developed and maintained software applications that catered to diverse business needs. I collaborated with cross-functional teams to identify requirements and implement feature enhancements. My dedication to writing clean and efficient code contributed to the overall reliability and performance of the software products.",
    },
    {
      title: "Junior Developer",
      company: "CodeGenius Labs",
      link: "https://codegeniuslabs.com",
      startDate: "July 2015",
      endDate: "December 2015",
      description:
        "My role as a junior developer allowed me to gain foundational experience in software development. I worked on various projects, honing my programming skills and learning about different aspects of the development lifecycle. My enthusiasm and eagerness to learn set the stage for my future growth and success in the field.",
    },
    {
      title: "Intern",
      company: "TechMasters Inc.",
      link: "https://techmastersinc.com",
      startDate: "May 2014",
      endDate: "August 2014",
      description:
        "As an intern at TechMasters Inc., I had the opportunity to immerse myself in real-world software projects. I assisted in various tasks, from debugging code to collaborating on feature implementations. This experience provided valuable insights into the software development process and fueled my passion for pursuing a career in technology.",
    },
  ];
  
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
        {experiences.map((job, index) => (
          <Card
            key={index}
            className="flex-none px-3 py-3 w-[310px] xs:w-[350px] mr-3"
          >
            <p className="font-semibold">{job.title}</p>
            <Link href={job.link} className="font-semibold underline">
              {job.company}
            </Link>
            <p className="text-sm mb-2">
              {job.startDate} - {job.endDate}
            </p>
            <TruncatedText description={job.description} />
          </Card>
        ))}
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
