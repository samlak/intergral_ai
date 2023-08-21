"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Loader2,
} from "lucide-react"


export function RegisterForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  const formElement = [
    {
      label: "Name",
      id: "name",
      placeholder: "Jone Doe",
      type: "text",
      autoCapitalize: "none",
      autoComplete: "name",
      autoCorrect: "off"
    },
    {
      label: "Email",
      id: "email",
      placeholder: "name@example.com",
      type: "email",
      autoCapitalize: "none",
      autoComplete: "email",
      autoCorrect: "off"
    },
    {
      label: "Password",
      id: "password",
      placeholder: "password",
      type: "password",
      autoCapitalize: "none",
      autoComplete: "password",
      autoCorrect: "off"
    }
  ]

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          {formElement.map((options, index) => (
            <div className="grid gap-1 mb-2" key={index}>
              <Label className="mb-1" htmlFor={options.id}>
                {options.label}
              </Label>
              <Input
                id={options.id}
                placeholder={options.placeholder}
                type={options.type}
                autoCapitalize={options.autoCapitalize}
                autoComplete={options.autoComplete}
                autoCorrect={options.autoCorrect}
                disabled={isLoading}
              />
            </div>
          ))}
          <Button disabled={isLoading}>
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Register
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="github"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff"
            viewBox="0 0 512 512"
            className="mr-2 h-4 w-4"
          >
            <title>Google</title>
            <path d="M473.16,221.48l-2.26-9.59H262.46v88.22H387c-12.93,61.4-72.93,93.72-121.94,93.72-35.66,0-73.25-15-98.13-39.11a140.08,140.08,0,0,1-41.8-98.88c0-37.16,16.7-74.33,41-98.78s61-38.13,97.49-38.13c41.79,0,71.74,22.19,82.94,32.31l62.69-62.36C390.86,72.72,340.34,32,261.6,32h0c-60.75,0-119,23.27-161.58,65.71C58,139.5,36.25,199.93,36.25,256S56.83,369.48,97.55,411.6C141.06,456.52,202.68,480,266.13,480c57.73,0,112.45-22.62,151.45-63.66,38.34-40.4,58.17-96.3,58.17-154.9C475.75,236.77,473.27,222.12,473.16,221.48Z" />
          </svg>
        )}{" "}
        Google
      </Button>
    </div>
  )
}
