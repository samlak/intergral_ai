import { useRef } from "react";
import Link from "next/link";
import { TruncatedText } from "./truncated-text";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Project() {
  const ref = useRef(null);

  const projects = [
    {
      title: "E-commerce Platform",
      link: "https://ecommerceplatform.com",
      startDate: "January 2022",
      endDate: "September 2022",
      description:
        "I led the development of a feature-rich e-commerce platform that transformed online shopping experiences. Designed a responsive and intuitive user interface, integrated secure payment gateways, and implemented advanced product recommendation algorithms. The platform saw increased user engagement and sales, contributing to a significant growth in revenue.",
    },
    {
      title: "Health Tracker App",
      link: "https://healthtrackerapp.com",
      startDate: "April 2020",
      endDate: "November 2020",
      description:
        "As the lead developer, I created a comprehensive health tracker app that empowered users to monitor their fitness goals. Developed a user-friendly interface, implemented real-time data synchronization, and integrated wearable device support. The app garnered positive user feedback and became a go-to tool for health enthusiasts.",
    },
    {
      title: "Educational Game",
      link: "https://educationalgame.com",
      startDate: "July 2019",
      endDate: "February 2020",
      description:
        "Co-authored an educational game aimed at teaching children essential math concepts through interactive gameplay. Designed captivating graphics, optimized game mechanics for various devices, and integrated a progress tracking system. The game received accolades for its educational value and engaging user experience.",
    },
    {
      title: "Smart Home Automation",
      link: "https://smarthomeautomation.com",
      startDate: "September 2018",
      endDate: "May 2019",
      description:
        "Contributed to a smart home automation project that enabled users to control household devices remotely. Developed a user-friendly mobile app, implemented IoT protocols, and ensured secure communication between devices. The project gained attention for its innovative approach to enhancing home convenience and energy efficiency.",
    },
    {
      title: "Social Networking Platform",
      link: "https://socialnetworkingplatform.com",
      startDate: "March 2017",
      endDate: "August 2018",
      description:
        "Played a key role in developing a dynamic social networking platform that facilitated seamless connections between users. Designed interactive user profiles, implemented real-time chat features, and integrated content sharing capabilities. The platform gained popularity and became a hub for users to connect and collaborate.",
    },
    {
      title: "Financial Analytics Dashboard",
      link: "https://financialanalyticsdashboard.com",
      startDate: "June 2016",
      endDate: "December 2016",
      description:
        "Led the development of a financial analytics dashboard that provided valuable insights to businesses. Designed visually informative data visualizations, integrated data sources, and ensured robust data security. The dashboard became an essential tool for decision-makers to track financial performance and make informed strategies.",
    },
    {
      title: "Travel Planning App",
      link: "https://travelplanningapp.com",
      startDate: "January 2015",
      endDate: "May 2015",
      description:
        "Collaborated on a travel planning app that streamlined itinerary creation for globetrotters. Developed an intuitive interface, integrated geolocation services, and enabled users to discover and plan activities. The app received positive reviews for simplifying travel arrangements and enhancing the overall vacation experience.",
    },
    {
      title: "E-learning Platform",
      link: "https://elearningplatform.com",
      startDate: "August 2014",
      endDate: "October 2014",
      description:
        "Contributed to the development of an e-learning platform that provided online courses to learners worldwide. Implemented a user-friendly course management system, integrated multimedia content, and ensured smooth course enrollment and progress tracking. The platform empowered learners to acquire new skills and knowledge conveniently.",
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
      <h2 className="text-center font-semibold text-2xl">PREVIOUS PROJECTS</h2>
      <div
        className="py-5 flex items-start overflow-x-scroll scroll-smooth scroll"
        ref={ref}
      >
        {projects.map((project, index) => (
          <Card
            key={index}
            className="flex-none px-3 py-3 w-[310px] xs:w-[350px] mr-3"
          >
            <Link href={project.link} className="font-semibold underline">
              {project.title}
            </Link>
            <p className="text-sm mb-2">
              {project.startDate} - {project.endDate}
            </p>
            <TruncatedText description={project.description} />
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
