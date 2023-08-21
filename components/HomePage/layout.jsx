import { MainNav } from "./main-nav";
import { Separator } from "@/components/ui/separator"

export default function HomePageLayout({ showFooter = true, children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-16 items-center justify-between py-4 ">
          <MainNav />
        </div>
      </header>
      <Separator className="" />
      <main className="flex-1">
        {children}
      </main>
      {showFooter &&
        <footer>
          <div className="container flex flex-col items-center justify-between mb-10 -mt-10">
            <p className="text-center text-base leading-loose">
              For feedback contact us through {" "}
              <a
                href="mailto:indielanceai@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                email here
              </a>
            </p>
          </div>
        </footer>
      }
    </div>
  );
}
