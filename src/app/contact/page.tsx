import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/contact-form";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="relative overflow-hidden py-20 sm:py-32 bg-muted">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
        <Container className="relative">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              Get In Touch
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              Let's Create Together
            </h1>
            <p className="text-lg text-muted-foreground">
              Have a project in mind or just want to say hello? We'd love to hear from you.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="pb-20 sm:pb-32">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">Contact Information</h2>
              <p className="text-muted-foreground">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <a href="tel:+2340000000000" className="text-muted-foreground hover:text-primary">+234 XXX XXX XXXX</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a href="mailto:hello@shubz.com" className="text-muted-foreground hover:text-primary">hello@shubz.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-muted-foreground">Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-lg border bg-card p-8 shadow-sm">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}