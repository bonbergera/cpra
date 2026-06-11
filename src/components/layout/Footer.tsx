
import Link from "next/link";
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Footer() {
  const logo = PlaceHolderImages.find(img => img.id === "cpra-logo");

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image 
                src={logo?.imageUrl || ""} 
                alt="CPRA Logo" 
                width={200} 
                height={70} 
                className="h-14 w-auto object-contain bg-white rounded-md p-1"
              />
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              Promoting sustainable peace and development through evidence-based research and advocacy in Southern Africa.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-accent transition-colors"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-accent transition-colors"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-accent transition-colors"><Linkedin className="h-5 w-5" /></Link>
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
                <span>+260 (0) 9XX XXX XXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <span>info@cprainsight.org</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-lg font-semibold mb-6">Stay Informed</h4>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Subscribe to our monthly fragility assessments and advocacy briefs.
            </p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-primary-foreground/10 border-primary-foreground/20 rounded-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button className="bg-accent text-white px-4 py-2 rounded-md hover:bg-accent/90 transition-colors">Join</button>
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
