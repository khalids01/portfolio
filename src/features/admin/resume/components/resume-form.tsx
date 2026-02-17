"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema, type ResumeData } from "@/features/resume/schema";
import { updateResume } from "@/features/resume/actions/update-resume";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trash2, Plus, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";
import Link from "next/link";

export function ResumeForm({ initialData }: { initialData: ResumeData }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema) as any,
    defaultValues: initialData,
  });

  function onSubmit(values: ResumeData) {
    startTransition(async () => {
      const result = await updateResume(values);
      if (result.success) {
        toast.success("Resume updated successfully");
      } else {
        toast.error("Failed to update resume");
      }
    });
  }

  const skills = useFieldArray({ control: form.control, name: "skills" });
  const experience = useFieldArray({ control: form.control, name: "experience" });
  const education = useFieldArray({ control: form.control, name: "education" });
  const projects = useFieldArray({ control: form.control, name: "projects" });
  const links = useFieldArray({ control: form.control, name: "basics.links" });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-20">
        
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Resume Editor</h1>
            <Button asChild variant="ghost">
                <Link href="/resume" target="_blank">
                    View Resume <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>

        {/* Basics Section */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Basic contact details and professional summary.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <FormField control={form.control} name="basics.name" render={({ field }) => (
                <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )} />
                <FormField control={form.control} name="basics.title" render={({ field }) => (
                <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )} />
                <FormField control={form.control} name="basics.email" render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )} />
                <FormField control={form.control} name="basics.location" render={({ field }) => (
                <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )} />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <FormLabel>Links</FormLabel>
                 <Button type="button" variant="outline" size="sm" onClick={() => links.append({ name: "", url: "" })}>
                    <Plus className="mr-2 h-4 w-4" /> Add Link
                </Button>
              </div>
              {links.fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <Input {...form.register(`basics.links.${index}.name`)} placeholder="Name (e.g. GitHub)" className="w-1/3" />
                  <Input {...form.register(`basics.links.${index}.url`)} placeholder="URL" className="flex-1" />
                  <Button type="button" variant="ghost" size="icon" onClick={() => links.remove(index)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>

             <FormField control={form.control} name="summary" render={({ field }) => (
              <FormItem>
                <FormLabel>Summary</FormLabel>
                <FormControl><Textarea className="min-h-[100px]" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>
        </Card>

        {/* Experience Section */}
        <Card>
          <CardHeader>
             <div className="flex items-center justify-between">
              <CardTitle>Experience</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={() => experience.prepend({ company: "", role: "", start: "", end: "", bullets: [] })}>
                <Plus className="mr-2 h-4 w-4" /> Add Position
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {experience.fields.map((item, index) => (
              <div key={item.id} className="rounded-lg border p-4 space-y-4 relative bg-muted/20">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                  onClick={() => experience.remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                
                <div className="grid md:grid-cols-2 gap-4 pr-8">
                  <FormField control={form.control} name={`experience.${index}.company`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name={`experience.${index}.role`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name={`experience.${index}.start`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl><Input placeholder="Jan 2020" {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name={`experience.${index}.end`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl><Input placeholder="Present" {...field} /></FormControl>
                    </FormItem>
                  )} />
                </div>
                
                <Controller
                   control={form.control}
                   name={`experience.${index}.bullets`}
                   render={({ field }) => (
                      <FormItem>
                         <FormLabel>Key Achievements (One per line)</FormLabel>
                         <FormControl>
                            <Textarea 
                               value={field.value?.join('\n') || ''} 
                               onChange={(e) => {
                                  field.onChange(e.target.value.split('\n'));
                               }}
                               className="min-h-[100px] font-mono text-sm"
                               placeholder="- Achievement 1&#10;- Achievement 2"
                            />
                         </FormControl>
                      </FormItem>
                   )}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Education Section */}
        <Card>
           <CardHeader>
             <div className="flex items-center justify-between">
              <CardTitle>Education</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={() => education.append({ institution: "", degree: "", start: "", end: "" })}>
                <Plus className="mr-2 h-4 w-4" /> Add Education
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {education.fields.map((item, index) => (
              <div key={item.id} className="rounded-lg border p-4 space-y-4 relative bg-muted/20">
                <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                    onClick={() => education.remove(index)}
                  >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="grid md:grid-cols-2 gap-4 pr-8">
                   <FormField control={form.control} name={`education.${index}.institution`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name={`education.${index}.degree`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name={`education.${index}.start`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start</FormLabel>
                      <FormControl><Input placeholder="2016" {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name={`education.${index}.end`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>End</FormLabel>
                      <FormControl><Input placeholder="2020" {...field} /></FormControl>
                    </FormItem>
                  )} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Skills Section */}
        <Card>
           <CardHeader>
             <div className="flex items-center justify-between">
              <CardTitle>Skills</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={() => skills.append({ group: "", items: [] })}>
                <Plus className="mr-2 h-4 w-4" /> Add Skill Group
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
             {skills.fields.map((item, index) => (
              <div key={item.id} className="rounded-lg border p-4 space-y-4 relative bg-muted/20">
                 <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                    onClick={() => skills.remove(index)}
                  >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="grid gap-4 pr-8">
                   <FormField control={form.control} name={`skills.${index}.group`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Name (e.g. Languages)</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <Controller
                   control={form.control}
                   name={`skills.${index}.items`}
                   render={({ field }) => (
                      <FormItem>
                         <FormLabel>Items (Comma separated)</FormLabel>
                         <FormControl>
                            <Input 
                               value={field.value?.join(', ') || ''} 
                               onChange={(e) => {
                                  field.onChange(e.target.value.split(',').map(s => s.trim()).filter(Boolean));
                               }}
                               placeholder="TypeScript, React, Node.js"
                            />
                         </FormControl>
                      </FormItem>
                   )}
                />
                </div>
              </div>
             ))}
          </CardContent>
        </Card>

         {/* Projects Section */}
         <Card>
          <CardHeader>
             <div className="flex items-center justify-between">
              <CardTitle>Projects</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={() => projects.append({ name: "", desc: "", bullets: [], links: [] })}>
                <Plus className="mr-2 h-4 w-4" /> Add Project
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {projects.fields.map((item, index) => (
              <div key={item.id} className="rounded-lg border p-4 space-y-4 relative bg-muted/20">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                  onClick={() => projects.remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                
                <div className="grid gap-4 pr-8">
                  <FormField control={form.control} name={`projects.${index}.name`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name={`projects.${index}.desc`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )} />
                  
                 <Controller
                   control={form.control}
                   name={`projects.${index}.bullets`}
                   render={({ field }) => (
                      <FormItem>
                         <FormLabel>Highlights (One per line)</FormLabel>
                         <FormControl>
                            <Textarea 
                               value={field.value?.join('\n') || ''} 
                               onChange={(e) => {
                                  field.onChange(e.target.value.split('\n'));
                               }}
                               className="min-h-[80px] font-mono text-sm"
                               placeholder="- Highlight 1&#10;- Highlight 2"
                            />
                         </FormControl>
                      </FormItem>
                   )}
                />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="fixed bottom-6 right-6 z-50">
          <Button size="lg" type="submit" disabled={isPending} className="shadow-2xl">
             {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
