import Head from "next/head"
import Link from "next/link"
import { Briefcase, ChevronLeft  } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { RegisterForm } from "@/components/Auth/register-form"

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register | Indielance</title>
      </Head>
      <div className="container flex h-screen w-screen flex-col items-center justify-center mx-auto">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-4 top-4 md:left-8 md:top-8"
          )}
        >
          <>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[370px] max-w-[370px] px-5">
          <div className="flex flex-col space-y-2 text-center">
            <Briefcase className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an Account
            </h1>
            <p className="text-sm text-muted-foreground">
              Complete the form below to create an account
            </p>
          </div>
          <RegisterForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/login"
              className="hover:text-brand underline underline-offset-4"
            >
              Already have an account? Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
