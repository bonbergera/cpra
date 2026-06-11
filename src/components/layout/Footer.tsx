
"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError, type SecurityRuleContext } from "@/firebase/errors";

export function Footer() {
  const logo = PlaceHolderImages.find(img => img.id === "cpra-logo");
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firestore = useFirestore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !firestore) return;

    setIsSubmitting(true);
    
    const subscriberData = {
      email,
      subscribedAt: serverTimestamp(),
    };

    const subscribersRef = collection(firestore, 'newsletter_subscribers');

    // Firestore write: Initiate and proceed immediately (Optimistic UI)
    addDoc(subscribersRef, subscriberData)
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: subscribersRef.path,
          operation: 'create',
          requestResourceData: subscriberData,
        } satisfies SecurityRuleContext);

        errorEmitter.emit('permission-error', permissionError);
      });

    // Proceed immediately without awaiting the promise
    toast({
      title: "Subscription Successful!",
      description: "Thank you for joining our mailing list.",
    });
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image 
                src={logo?.imageUrl || ""} 
                alt="CPRA Logo" 
                width={240} 
                height={80} 
                className="h-16 w-auto object-contain bg-white rounded-sm p-1"
                data-ai-hint="peace advocacy logo"
              />
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              Promoting sustainable peace and development through evidence-based research and advocacy in Southern Africa.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://www.facebook.com/p/Centre-for-Peace-Research-and-Advocacy-CPRA-100087220065870/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-accent transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link 
                href="https://www.linkedin.com/in/cliffton-mayaba-chifuwe-42614040/?originalSubdomain=zm" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-accent transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-headline text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li><Link href="/themes" className="hover:text-accent transition-colors">Core Themes</Link></li>
              <li><Link href="/research" className="hover:text-accent transition-colors">Research Synthesis</Link></li>
              <li><Link href="/newsroom" className="hover:text-accent transition-colors">Advocacy Newsroom</Link></li>
              <li><Link href="/tracker" className="hover:text-accent transition-colors">Legislative Tracker</Link></li>
              <li><Link href="/partnerships" className="hover:text-accent transition-colors">Academic MOUs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0" />
                <span>Lusaka, Zambia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <span>+260 (0) 977 411 676</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <span>cpra4peace@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-lg font-semibold mb-6">Stay Informed</h4>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Subscribe to our monthly fragility assessments and advocacy briefs.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address" 
                required
                disabled={isSubmitting}
                className="bg-primary-foreground/10 border-primary-foreground/20 rounded-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-accent text-white placeholder:text-primary-foreground/40 disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-accent text-white px-4 py-2 rounded-md hover:bg-accent/90 transition-colors font-bold text-sm disabled:opacity-50 min-w-[70px]"
              >
                {isSubmitting ? "..." : "Join"}
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-primary-foreground/50 gap-4">
          <p>© {new Date().getFullYear()} Centre for Peace Research and Advocacy (CPRA). All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-accent">Privacy Policy</Link>
            <Link href="#" className="hover:text-accent">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
