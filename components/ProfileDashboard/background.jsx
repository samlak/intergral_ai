import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { toast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/react-hook-form/form"
import { RemoveableInput, GenerativeTextarea } from "@/components/Form"

export default function Background() {
  const profileFormSchema = z.object({
    name: z.string().min(1, { 
      message: "Your name is required.",
    }),
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(30, {
        message: "Username must not be longer than 30 characters.",
      }),
    title: z.string().min(1, {
      message: "Your professional title is required.",
    }),
    bio: z.string(),
    calender_link: z.string().url({ 
      message: "Please enter a valid URL." 
    }).optional(),
    external_links: z
      .array(
        z.object({
          url: z.string().url({ message: "Please enter a valid URL." }),
          text: z.string().min(1, { message: "URL text is required." }),
        })
      )
      .optional(),
    skillsets: z
      .array(
        z.string().min(1, { 
          message: "Please add a skillset."
        })
      )
      .optional(),
  });
  
  const defaultValues = {
    name: "Haruna Salami",
    username: "devsamlak",
    title: "Software Developer",
    bio: "I am an accomplished software developer with a proven track record of over 5 years in the industry. My expertise spans a wide spectrum of programming languages, technologies, and development methodologies, enabling me to create robust and efficient software solutions that meet the most demanding requirements. Throughout my career, I have consistently demonstrated a deep understanding of software architecture, design patterns, and best practices, allowing me to deliver scalable and maintainable codebases. My passion for innovation and problem-solving is evident in my ability to tackle complex challenges head-on and devise elegant solutions. Whether I am collaborating within a team or taking the lead on projects, I thrive on fostering an environment of open communication and knowledge sharing. My adaptability and continuous learning mindset have enabled me to stay at the forefront of technological advancements, ensuring that the software I develop remains cutting-edge and aligned with industry trends. With a keen eye for detail and a commitment to quality, I take pride in my contributions to the software development landscape and look forward to leveraging my skills to drive impactful and transformative projects in the future.",
    calender_link: "https://calendly.com/devsamlak",
    external_links: [
      {
        url: "https://.com/devsamlak",
        text: "Github" 
      },
      {
        url: "https://binnace.com/devsamlak",
        text: "Binnace" 
      },
      {
        url: "https://linkedin.com/devsamlak",
        text: "LinkedIn" 
      },
      {
        url: "https://twitter.com/devsamlak",
        text: "Twitter" 
      },
    ],
    skillsets: [
      "Javascript",
      "HTML",
      "CSS",
      "Prompt Engineering",
      "Chatbot Development",
      "React",
      "Node.js",
      "Python",
      "Java",
      "C#",
      "C++",
      "Ruby",
    ],
  }

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const { fields: linkFields, append: linkAppend, remove: linkRemove } = useFieldArray({
    name: "external_links",
    control: form.control,
  })

  const { fields: skillFields, append: skillAppend, remove: skillRemove } = useFieldArray({
    name: "skillsets",
    control: form.control,
  })

  function onSubmit(data) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Background Information</CardTitle>
        <CardDescription>
          Make changes to your background information here. Click save when you're done.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="thejohn" {...field} />
                </FormControl>
                <FormDescription>
                  This is the link to your Indielance profile. {" "}
                  <span className="text-blue-500 font-bold">
                    {`https://indielance.co/pro/${field.value}`}
                  </span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Title</FormLabel>
                <FormControl>
                  <Input placeholder="Software Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Describe yourself</FormLabel>
                <FormControl>
                  <GenerativeTextarea
                    placeholder="Tell us a little bit about yourself"
                    className="min-h-[130px] resize-none"
                    setValue={form.setValue}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can rephrase and expand your input with AI by clicking on the button above
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="calender_link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Calendar Link</FormLabel>
                <FormControl>
                  <Input placeholder="https://calendly.com/username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormItem>
              <FormLabel>
                External Links
              </FormLabel>
              <FormDescription>
                Add links to your github, behance, blog, or social media profiles.
              </FormDescription>
              {linkFields.map((field, index) => (
                <div key={field.id} className="flex items-center flex-wrap sm:flex-nowrap sm:space-x-3">
                  <FormField
                    control={form.control}
                    name={`external_links.${index}.url`}
                    render={({ field }) => (
                      <div className="w-full sm:w-1/2">
                        <FormLabel>
                          URL
                        </FormLabel>
                        <FormControl>
                          <RemoveableInput
                            containerClassName="mt-1"
                            placeholder="https://github.com/username"
                            onClick={() => linkRemove(index)}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`external_links.${index}.text`}
                    render={({ field }) => (
                      <div className="w-full sm:w-1/2 mt-2 sm:mt-0">
                        <FormLabel>
                          Text
                        </FormLabel>
                        <FormControl>
                          <RemoveableInput
                            containerClassName="mt-1"
                            placeholder="Github"
                            onClick={() => linkRemove(index)}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    )}
                  />
                </div>
              ))}
            </FormItem>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => linkAppend({ url: "", text: "" })}
            >
              Add Link
            </Button>
          </div>

          <div>
            <FormItem>
              <FormLabel>
                Your Skillset
              </FormLabel>

              {skillFields.map((field, index) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`skillsets.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RemoveableInput
                          placeholder="Prompt Engineering"
                          onClick={() => skillRemove(index)}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </FormItem>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => skillAppend("")}
            >
              Add Skill
            </Button>
          </div>
        
          <Button type="submit">Save Info</Button>
        </form>
      </Form>
      </CardContent>
    </Card>
  );
}
