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

export default function Experience() {
  const profileFormSchema = z.object({
    experiences: z
      .array(
        z.object({
          job_title: z.string().min(1, { message: "Please enter the job title." }),
          company_name: z.string().min(1, { message: "Please enter the company name" }),
          company_link: z.string().url({ message: "Please enter a valid website of the company if available." }).optional(),
          start_date: z.object({ 
            month: z.string().min(1, { message: "Select the starting month." }),
            year: z.string().min(1, { message: "Select the starting year." }),
          }),
          end_date: z.object({ 
            month: z.string().min(1, { message: "Select the ending month." }),
            year: z.string().optional(),
          }),
          description: z.string().min(1, { message: "Describe your experience with the company" }),
        })
      )
  });

  const defaultValues ={
    experiences: [{
      job_title: "", 
      company_name: "",
      company_link: "", 
      start_date: "", 
      end_date: "",
      description: "" 
    }]
  }

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray({
    name: "experiences",
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
        <CardTitle>Work Experience</CardTitle>
        <CardDescription>
          Make changes to your work experience here. Click save when you're done.
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
                    name={`experiences.${index}.job_title`}
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>
                          Job Title
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Software Engineer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experiences.${index}.company_name`}
                    render={({ field }) => (
                      <FormItem className="mt-6">
                        <FormLabel>
                          Company Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Microsoft" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experiences.${index}.company_link`}
                    render={({ field }) => (
                      <FormItem className="mt-6">
                        <FormLabel>
                          Company Website
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="https://microsoft.com" {...field} />
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
                        name={`experiences.${index}.start_date.month`}
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
                        name={`experiences.${index}.start_date.year`}
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
                      name={`experiences.${index}.end_date.month`}
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
                                I am currently working in this role
                              </FormLabel>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    { form.getValues(`experiences.${index}.end_date.month`) !== "Present" &&
                      <div className="flex items-center space-x-3">
                        <FormField
                          control={form.control}
                          name={`experiences.${index}.end_date.month`}
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
                          name={`experiences.${index}.end_date.year`}
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
                    name={`experiences.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="mt-6">
                        <FormLabel>
                          Describe your experience
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
                        Remove Experience
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Do you want to delete this work experience?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action is irreversible. This will permanently delete the work experience from your profile.
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
                job_title: "", 
                company_name: "",
                company_link: "", 
                start_date: "", 
                end_date: "", 
                description: "" 
              })}
            >
              Add Experience
            </Button>
          </div>
          <Button type="submit">Save Info</Button>
        </form>
      </Form>
      </CardContent>
    </Card>
  );
}
