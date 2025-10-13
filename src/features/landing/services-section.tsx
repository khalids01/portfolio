import * as React from "react";
import { Code2, Smartphone, Cloud, Palette, Database, Zap } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Building responsive, performant web applications using modern frameworks like React, Next.js, and Vue.js.",
    features: ["Single Page Applications", "Progressive Web Apps", "Server-Side Rendering"],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Creating cross-platform mobile applications with React Native and Flutter for iOS and Android.",
    features: ["Cross-Platform Apps", "Native Performance", "Push Notifications"],
  },
  {
    icon: Database,
    title: "Backend Development",
    description: "Designing and implementing scalable backend systems with Node.js, Express, and modern databases.",
    features: ["RESTful APIs", "GraphQL", "Microservices"],
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Deploying and managing applications on cloud platforms like AWS, Google Cloud, and Azure.",
    features: ["CI/CD Pipelines", "Auto Scaling", "Monitoring"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Crafting beautiful, intuitive user interfaces with attention to detail and user experience.",
    features: ["Responsive Design", "Design Systems", "Prototyping"],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Analyzing and optimizing application performance for faster load times and better user experience.",
    features: ["Code Splitting", "Lazy Loading", "SEO Optimization"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="container mx-auto px-3 py-16 md:py-24">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Section header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Services
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            What I can help you build
          </p>
        </div>

        {/* Services grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group relative rounded-2xl bg-gradient-to-br from-background to-muted/30 p-6 backdrop-blur-sm border border-border shadow-lg hover:shadow-xl transition-all"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative space-y-4">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold">{service.title}</h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-primary">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
