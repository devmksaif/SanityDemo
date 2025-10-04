import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/contact-form";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
import GradientText from "@/components/GradientText";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Modern Hero Section */}
      <section className="relative overflow-hidden h-[60vh] min-h-[450px] w-full bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        
        <Container className="relative flex h-full flex-col items-center justify-center text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>Get In Touch</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <GradientText 
                colors={['#f59e0b', '#ef4444', '#f59e0b']}
                animationSpeed={4}
                showBorder={false}
                className="inline-block"
              >
                Let's Create
              </GradientText>{" "}
              Together
            </h1>
            
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Have a project in mind or just want to say hello? We'd love to hear from you and explore how we can bring your creative vision to life.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Start the Conversation
                </h2>
                <p className="text-lg text-muted-foreground">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>
              
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