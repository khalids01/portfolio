"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminProfile } from "../../profile/useAdminProfile";

const schema = z.object({
  fullName: z.string().min(2, "Required"),
  headline: z.string().min(2, "Required"),
  bio: z.string().optional().nullable(),
  avatarUrl: z.string().url().optional().nullable(),
  location: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  emailPublic: z.string().email().optional().nullable(),
  resumeUrl: z.string().url().optional().nullable(),
  linkedinUrl: z.string().url().optional().nullable(),
  githubUrl: z.string().url().optional().nullable(),
  websiteUrl: z.string().url().optional().nullable(),
});

export function AdminProfileForm() {
  const { profileQuery, createOrUpdate } = useAdminProfile();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      headline: "",
      bio: "",
      avatarUrl: "",
      location: "",
      phone: "",
      emailPublic: "",
      resumeUrl: "",
      linkedinUrl: "",
      githubUrl: "",
      websiteUrl: "",
    },
  });

  useEffect(() => {
    const p = profileQuery.data?.data;
    if (p) {
      form.reset({
        fullName: p.fullName ?? "",
        headline: p.headline ?? "",
        bio: p.bio ?? "",
        avatarUrl: p.avatarUrl ?? "",
        location: p.location ?? "",
        phone: p.phone ?? "",
        emailPublic: p.emailPublic ?? "",
        resumeUrl: p.resumeUrl ?? "",
        linkedinUrl: p.linkedinUrl ?? "",
        githubUrl: p.githubUrl ?? "",
        websiteUrl: p.websiteUrl ?? "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileQuery.data]);

  const onSubmit = (values: z.infer<typeof schema>) => {
    createOrUpdate.mutate(values);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Full name</label>
              <Input {...form.register("fullName")} placeholder="Your name" />
              <p className="text-xs text-destructive">{form.formState.errors.fullName?.message}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Headline</label>
              <Input {...form.register("headline")} placeholder="e.g., Software Engineer" />
              <p className="text-xs text-destructive">{form.formState.errors.headline?.message}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Bio</label>
            <Textarea rows={4} {...form.register("bio")} placeholder="Short bio" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Avatar URL</label>
              <Input {...form.register("avatarUrl")} placeholder="https://..." />
            </div>
            <div>
              <label className="text-sm font-medium">Location</label>
              <Input {...form.register("location")} placeholder="City, Country" />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input {...form.register("phone")} placeholder="+880..." />
            </div>
            <div>
              <label className="text-sm font-medium">Public Email</label>
              <Input {...form.register("emailPublic")} placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-sm font-medium">Resume URL</label>
              <Input {...form.register("resumeUrl")} placeholder="https://..." />
            </div>
            <div>
              <label className="text-sm font-medium">LinkedIn</label>
              <Input {...form.register("linkedinUrl")} placeholder="https://linkedin.com/in/..." />
            </div>
            <div>
              <label className="text-sm font-medium">GitHub</label>
              <Input {...form.register("githubUrl")} placeholder="https://github.com/..." />
            </div>
            <div>
              <label className="text-sm font-medium">Website</label>
              <Input {...form.register("websiteUrl")} placeholder="https://..." />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={createOrUpdate.isPending}>
              {createOrUpdate.isPending ? "Saving..." : profileQuery.data?.data ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
