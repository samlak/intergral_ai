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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GenerativeTextarea } from "@/components/Form"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"

const calendar = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export default function Project() {
  const profileFormSchema = z.object({
    projects: z
      .array(
        z.object({
          project_title: z.string().min(1, { message: "Please enter the project title." }),
          project_link: z.string().url({ message: "Please enter a valid website of the company if available." }).optional(),
          start_date: z.object({ 
            month: z.string().min(1, { message: "Select the starting month." }),
            year: z.string().min(1, { message: "Select the starting year." }),
          }),
          end_date: z.object({ 
            month: z.string().min(1, { message: "Select the ending month." }),
            year: z.string().optional(),
          }),
          description: z.string().min(1, { message: "Describe your project with the company" }),
        })
      )
  });

  const defaultValues ={
    projects: [{
      project_title: "Health Tracker App", 
      project_link: "https://healthtrackerapp.com", 
      start_date: {
        month: "April",
        year: "2020"
      }, 
      end_date: {
        month: "November",
        year: "2020"
      },
      description: "As the lead developer, I created a comprehensive health tracker app that empowered users to monitor their fitness goals. Developed a user-friendly interface, implemented real-time data synchronization, and integrated wearable device support. The app garnered positive user feedback and became a go-to tool for health enthusiasts." 
    }]
  }

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray({
    name: "projects",
    control: form.control,
  })

  function onSubmit(data) {
    toast({
      title: "Profile created successfully!",
      description: (
        <p>
          You can check your profile here {" "}
          <a className="text-blue-600" href="http://localhost:3000/pro/devsamlak">
            https://indielance.co/pro/devsamlak
          </a>
        </p>
      )
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Previous Projects</CardTitle>
        <CardDescription>
          Make changes to your past project here. Click save when you're done.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <FormItem>
              {fields.map((field, index) => (
                <div key={field.id} className="">
                  <FormField
                    control={form.control}
                    name={`projects.${index}.project_title`}
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>
                          Project Title
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Ticket Management System" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`projects.${index}.project_link`}
                    render={({ field }) => (
                      <FormItem className="mt-6">
                        <FormLabel>
                          Project Link
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="https://projectwebsite.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem className="mt-6">
                    <FormLabel>
                      Start Date
                    </FormLabel>
                    <div className="flex items-center space-x-3">
                      <FormField
                        control={form.control}
                        name={`projects.${index}.start_date.month`}
                        render={({ field }) => (
                          <div className="w-1/2">
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Month" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <ScrollArea className="h-[250px]">
                                  {calendar.map((month, index) => (
                                    <SelectItem value={month} key={index}>
                                      {month}
                                    </SelectItem>
                                  ))}
                                </ScrollArea>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </div>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`projects.${index}.start_date.year`}
                        render={({ field }) => (
                          <div className="w-1/2">
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Year" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <ScrollArea className="h-[250px]">
                                  {Array.from({ length: 50 }, (_, i) => (
                                    <SelectItem key={i} value={`${new Date().getFullYear() - i}`}>
                                      {new Date().getFullYear() - i}
                                    </SelectItem>
                                  ))}
                                </ScrollArea>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </div>
                        )}
                      />
                    </div>
                  </FormItem>

                  <FormItem className="mt-6">
                    <FormLabel>
                      End Date
                    </FormLabel> 
                            
                    <FormField
                      control={form.control}
                      name={`projects.${index}.end_date.month`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center space-x-2 my-5">
                              <Checkbox 
                                checked={field.value === "Present" ? true : false }
                                onCheckedChange={(checked) => checked ? field.onChange("Present") : field.onChange("")}
                              />
                              <FormLabel
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                I am currently working in this project
                              </FormLabel>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    { form.getValues(`projects.${index}.end_date.month`) !== "Present" &&
                      <div className="flex items-center space-x-3">
                        <FormField
                          control={form.control}
                          name={`projects.${index}.end_date.month`}
                          render={({ field }) => (
                            <div className="w-1/2">
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Month" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <ScrollArea className="h-[250px]">
                                    {calendar.map((month, index) => (
                                      <SelectItem value={month} key={index}>
                                        {month}
                                      </SelectItem>
                                    ))}
                                  </ScrollArea>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </div>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`projects.${index}.end_date.year`}
                          render={({ field }) => (
                            <div className="w-1/2">
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Year" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <ScrollArea className="h-[250px]">
                                    {Array.from({ length: 50 }, (_, i) => (
                                      <SelectItem key={i} value={`${new Date().getFullYear() - i}`}>
                                        {new Date().getFullYear() - i}
                                      </SelectItem>
                                    ))}
                                  </ScrollArea>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </div>
                          )}
                        />
                      </div>
                    }
                  </FormItem>

                  <FormField
                    control={form.control}
                    name={`projects.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="mt-6">
                        <FormLabel>
                          Describe the project
                        </FormLabel>
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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                      >
                        Remove Project
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Do you want to delete this project?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action is irreversible. This will permanently delete the project from your profile.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => remove(index)}
                        >
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </FormItem>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => append({
                project_title: "", 
                company_name: "",
                project_link: "", 
                start_date: "", 
                end_date: "", 
                description: "" 
              })}
            >
              Add Project
            </Button>
          </div>
          <Button type="submit">Save Project</Button>
        </form>
      </Form>
      </CardContent>
    </Card>
  );
}
