
"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Facebook, Linkedin, Twitter, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError, type SecurityRuleContext } from "@/firebase/errors";

export default function ContactPage() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore) return;

    setIsSubmitting(true);
    
    const messageData = {
      ...formData,
      sentAt: serverTimestamp(),
    };

    const messagesRef = collection(firestore, 'contact_messages');

    // Firestore write (Non-blocking: Optimistic UI)
    addDoc(messagesRef, messageData)
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: messagesRef.path,
          operation: 'create',
          requestResourceData: messageData,
        } satisfies SecurityRuleContext);

        errorEmitter.emit('permission-error', permissionError);
      });

    // Proceed immediately to clear form and show success
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. Our team will get back to you shortly.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const GMAIL_URL = "https://mail.google.com/mail/?view=cm&fs=1&to=cpra4peace@gmail.com";

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F6F8F9] py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Contact Us</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Have a question about our research or interested in partnering with us? 
                Reach out to our team in Lusaka.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-6">
                  <Card className="border-none shadow-md">
                    <CardContent className="pt-8 flex items-start gap-4">
                      <div className="bg-accent/10 p-3 rounded-xl">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary">Email Us</h4>
                        <p className="text-sm text-muted-foreground">cpra4peace@gmail.com</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-md">
                    <CardContent className="pt-8 flex items-start gap-4">
                      <div className="bg-accent/10 p-3 rounded-xl">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary">Call Us</h4>
                        <p className="text-sm text-muted-foreground">+260 (0) 977 411 676</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-md">
                    <CardContent className="pt-8 flex items-start gap-4">
                      <div className="bg-accent/10 p-3 rounded-xl">
                        <MapPin className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary">Our Office</h4>
                        <p className="text-sm text-muted-foreground">Lusaka, Zambia</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-primary uppercase tracking-widest text-xs">Follow Our Impact</h4>
                  <div className="flex gap-4">
                    <Button variant="outline" size="icon" asChild className="rounded-full border-muted-foreground/20">
                      <a href="https://www.facebook.com/p/Centre-for-Peace-Research-and-Advocacy-CPRA-100087220065870/" target="_blank" rel="noopener noreferrer">
                        <Facebook className="h-5 w-5 text-blue-600" />
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild className="rounded-full border-muted-foreground/20">
                      <a href="https://www.linkedin.com/in/cliffton-mayaba-chifuwe-42614040/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-5 w-5 text-blue-700" />
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild className="rounded-full border-muted-foreground/20">
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-5 w-5 text-sky-500" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="border-none shadow-xl bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl font-headline text-primary">Send a Message</CardTitle>
                    <CardDescription>Fill out the form below and we will respond within 48 hours.</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">Full Name</label>
                          <Input 
                            placeholder="John Doe" 
                            required 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">Email Address</label>
                          <Input 
                            type="email" 
                            placeholder="john@example.com" 
                            required 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Subject</label>
                        <Input 
                          placeholder="Inquiry about Research Fellowship" 
                          required 
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Message</label>
                        <Textarea 
                          placeholder="Tell us more about your inquiry..." 
                          className="min-h-[150px]" 
                          required 
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="bg-primary hover:bg-primary/90 flex-1 h-12 gap-2 text-sm font-bold uppercase tracking-widest"
                        >
                          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                          Send Message
                        </Button>
                        <Button asChild variant="outline" className="border-primary/20 flex-1 h-12 gap-2 text-sm font-bold uppercase tracking-widest">
                          <a href={GMAIL_URL} target="_blank" rel="noopener noreferrer">
                            <Mail className="h-4 w-4" /> Open in Gmail
                          </a>
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
