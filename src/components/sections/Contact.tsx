"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Mail, MapPin, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Reveal, SplitText } from "@/components/layout/Reveal";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { useContent } from "@/components/layout/ContentProvider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  projectType: z.string().min(1, "Select a project type"),
  budgetRange: z.string().optional(),
  details: z.string().min(10, "Tell me a bit more about your project"),
});

type FormData = z.infer<typeof schema>;

export function Contact() {
  const { content } = useContent();
  const site = content.site;
  const projectTypes = content.contactOptions.projectTypes;
  const budgetRanges = content.contactOptions.budgetRanges;
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      projectType: "",
      budgetRange: "",
      details: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setDone(true);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out — I'll get back to you soon.",
      });
      reset();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-[1400px]">
        <Reveal>
          <SectionLabel index="08" accent="orange">
            Let&apos;s Work Together
          </SectionLabel>
        </Reveal>

        {/* Heading — full width */}
        <div className="mt-8 max-w-3xl">
          <SplitText
            as="h2"
            text="Have an Idea? Let's Make It Happen."
            className="font-display text-4xl font-bold leading-[1.0] tracking-[-0.03em] sm:text-5xl lg:text-[3.6rem]"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg">
              Have a project in mind? I&apos;m always interested in creative
              collaborations, exciting projects, and opportunities to create
              something meaningful.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-3xl border border-border bg-white p-6 sm:p-8"
              >
                <div className="grid gap-5">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="fullName">
                      Full Name
                    </label>
                    <Input
                      id="fullName"
                      placeholder="Your name"
                      {...register("fullName")}
                    />
                    {errors.fullName && (
                      <span className="text-xs text-destructive">
                        {errors.fullName.message}
                      </span>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="email">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@email.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <span className="text-xs text-destructive">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium" htmlFor="projectType">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        {...register("projectType")}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select type
                        </option>
                        {projectTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      {errors.projectType && (
                        <span className="text-xs text-destructive">
                          {errors.projectType.message}
                        </span>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium" htmlFor="budgetRange">
                        Budget Range{" "}
                        <span className="text-muted-foreground">(Optional)</span>
                      </label>
                      <select
                        id="budgetRange"
                        {...register("budgetRange")}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                        defaultValue=""
                      >
                        <option value="">Select range</option>
                        {budgetRanges.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="details">
                      Project Details
                    </label>
                    <Textarea
                      id="details"
                      rows={5}
                      placeholder="Tell me about your project, goals, and timeline..."
                      {...register("details")}
                    />
                    {errors.details && (
                      <span className="text-xs text-destructive">
                        {errors.details.message}
                      </span>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={loading || done}
                    className="group h-12 w-full rounded-full bg-foreground text-base font-semibold text-background hover:bg-foreground/90"
                  >
                    {done ? (
                      <>
                        <Check className="mr-2 h-5 w-5" /> Message Sent
                      </>
                    ) : loading ? (
                      "Sending..."
                    ) : (
                      <>
                        Start a Project
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Reveal>
          </div>

          {/* Right — info cards + open zone (character shows here on desktop) */}
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <div className="space-y-4">
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-4 transition-colors hover:border-foreground"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-orange/10 text-orange">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Email
                    </div>
                    <div className="font-display text-base font-semibold">
                      {site.email}
                    </div>
                  </div>
                </a>
                <div className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-electric/10 text-electric">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Location
                    </div>
                    <div className="font-display text-base font-semibold">
                      {site.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4">
                  <span className="relative grid h-11 w-11 place-items-center rounded-full bg-lime/15">
                    <span className="h-3 w-3 rounded-full bg-lime animate-soft-pulse" />
                  </span>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Availability
                    </div>
                    <div className="font-display text-base font-semibold">
                      {site.availability}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
