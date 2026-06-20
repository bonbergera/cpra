
"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useFirestore } from "@/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
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
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !firestore) return;

    setIsSubmitting(true);
    
    const subscriberData = {
      email: cleanEmail,
      subscribedAt: serverTimestamp(),
    };

    // Use email as the document ID to prevent duplicates
    const subscriberRef = doc(firestore, 'newsletter_subscribers', cleanEmail);

    // Firestore write: Initiate and proceed immediately (Optimistic UI)
    setDoc(subscriberRef, subscriberData, { merge: true })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: subscriberRef.path,
          operation: 'write',
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
    <footer className="bg-accent text-white pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Link href="/" className="inline-block">
              <Image 
                src={logo?.imageUrl || ""} 
                alt="CPRA Logo" 
                width={200} 
                height={60} 
                className="h-12 w-auto object-contain bg-white rounded-lg p-2"
                data-ai-hint="peace advocacy logo"
              />
            </Link>
           <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Promoting sustainable peace and development through evidence-based research and advocacy across Southern Africa.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://www.facebook.com/p/Centre-for-Peace-Research-and-Advocacy-CPRA-100087220065870/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-all group"
              >
                <Facebook className="h-5 w-5 text-white/70 group-hover:text-white" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-all group">
                <Twitter className="h-5 w-5 text-white/70 group-hover:text-white" />
              </Link>
              <Link 
               href="https://www.linkedin.com/in/cliffton-mayaba-chifuwe-42614040/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-all group"
              >
               <Linkedin className="h-5 w-5 text-white/70 group-hover:text-white" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-headline text-lg font-bold mb-8 border-b border-white/10 pb-2">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link href="/themes" className="hover:text-primary transition-colors">Core Themes</Link></li>
              <li><Link href="/research" className="hover:text-primary transition-colors">Research Synthesis</Link></li>
              <li><Link href="/newsroom" className="hover:text-primary transition-colors">Advocacy Newsroom</Link></li>
              <li><Link href="/tracker" className="hover:text-primary transition-colors">Legislative Tracker</Link></li>
              <li><Link href="/partnerships" className="hover:text-primary transition-colors">Academic MOUs</Link></li>
            </ul>
          </div>

          <div>
             <h4 className="font-headline text-lg font-bold mb-8 border-b border-white/10 pb-2">Contact Us</h4>
            <ul className="space-y-6 text-sm text-white/60">
              <li className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Lusaka, Zambia</span>
              </li>
                           <li className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+260 (0) 977 411 676</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>cpra4peace@gmail.com</span>
              </li>
            </ul>
          </div>

           <div className="space-y-8">
            <h4 className="font-headline text-lg font-bold mb-8 border-b border-white/10 pb-2">Newsletter</h4>
            <p className="text-sm text-white/60 leading-relaxed">
              Stay updated with our monthly fragility assessments and advocacy briefs.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address" 
                required
                disabled={isSubmitting}
                className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary text-white placeholder:text-white/30 disabled:opacity-50 transition-all"
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white w-full py-3 rounded-xl hover:bg-primary/90 transition-all font-bold text-sm uppercase tracking-widest shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? "Subscribing..." : "Join Newsletter"}
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/40 gap-6">
          <p>© {new Date().getFullYear()} Centre for Peace Research and Advocacy (CPRA).</p>
          <div className="flex space-x-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/admin" className="hover:text-primary transition-colors opacity-50">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
