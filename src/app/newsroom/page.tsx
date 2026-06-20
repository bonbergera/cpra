
"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Search, Filter, Newspaper, Calendar, ArrowRight, Facebook, ExternalLink } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import siteContent from "@/lib/site-content.json";

export default function NewsroomPage() {
  const [selectedNews, setSelectedNews] = useState<any | null>(null);
  const newsItems = siteContent.news;

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F6F8F9] py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-sm">
                  <Newspaper className="h-4 w-4" />
                  Public Advocacy
                </div>
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Newsroom</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  Official statements, legislative updates, and high-impact reports from the CPRA advocacy team.
                </p>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search statements..." 
                    className="pl-10 pr-4 py-2 bg-white border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.map((news: any) => {
                const newsImg = PlaceHolderImages.find(img => img.id === news.id);
                return (
                  <Card 
                    key={news.id} 
                    className="group overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer bg-white" 
                    onClick={() => setSelectedNews(news)}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image 
                        src={newsImg?.imageUrl || ""} 
                        alt={newsImg?.description || news.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        data-ai-hint={newsImg?.imageHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                      <div className="absolute bottom-3 left-3">
                        <Badge variant="secondary" className="bg-white/90 text-primary border-none text-[10px] uppercase font-bold tracking-wider">
                          {news.category}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="flex-1 space-y-3 pt-6">
                      <div className="flex items-center text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
                        <Calendar className="h-3 w-3 mr-1.5" />
                        {news.date}
                      </div>
                      <CardTitle className="font-headline text-xl leading-tight text-primary group-hover:text-accent transition-colors">
                        {news.title}
                      </CardTitle>
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {news.excerpt}
                      </p>
                    </CardHeader>
                    <CardFooter className="pt-2 pb-6 flex justify-between items-center px-6">
                      <Button variant="link" className="text-accent p-0 font-bold hover:no-underline flex items-center group/btn">
                        Read Statement <ArrowRight className="h-4 w-4 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                      <div className="flex gap-3">
                        <a 
                          href={news.socialMediaLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-slate-400 hover:text-blue-600 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                          title="View on Facebook"
                        >
                          <Facebook className="h-5 w-5" />
                        </a>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>

            <div className="mt-16 flex justify-center">
              <Button variant="outline" className="px-12 border-slate-300 text-primary font-bold uppercase tracking-widest text-xs h-12">
                Load More Statements
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
  <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden border-none flex flex-col">

    <DialogTitle className="sr-only">
      News Article
    </DialogTitle>

    {selectedNews && (
            <>
              {(() => {
                const newsImg = PlaceHolderImages.find(img => img.id === selectedNews.id);
                return (
                  <div className="relative h-64 w-full shrink-0">
                    <Image src={newsImg?.imageUrl || ""} alt={newsImg?.description || selectedNews.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-primary/20" />
                    <div className="absolute bottom-6 left-6 right-6">
                       <Badge className="bg-accent text-white mb-2">{selectedNews.category}</Badge>
                       <h2 className="text-2xl md:text-3xl font-headline font-bold text-white drop-shadow-md leading-tight">
                        {selectedNews.title}
                      </h2>
                    </div>
                  </div>
                );
              })()}
              <div className="p-8 md:p-10 overflow-y-auto bg-white flex-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold uppercase tracking-widest mb-6 pb-4 border-b">
                  <Calendar className="h-4 w-4 text-accent" /> Published on {selectedNews.date}
                </div>
                <div className="prose prose-slate max-w-none">
                  <div className="whitespace-pre-wrap text-slate-800 leading-relaxed font-sans text-base md:text-lg">
                    {selectedNews.fullStory}
                  </div>
                </div>
              </div>
              <DialogFooter className="p-6 bg-slate-50 border-t flex flex-col sm:flex-row gap-4 items-center justify-between shrink-0">
                <div className="text-sm font-semibold text-slate-500">
                  Official Statement by CPRA Insight
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button asChild variant="outline" className="flex-1 sm:flex-none gap-2 border-slate-300 font-bold text-xs uppercase tracking-widest">
                    <a href={selectedNews.socialMediaLink} target="_blank" rel="noopener noreferrer">
                      <Facebook className="h-4 w-4 text-blue-600" /> Facebook
                    </a>
                  </Button>
                  <Button asChild className="flex-1 sm:flex-none gap-2 bg-primary font-bold text-xs uppercase tracking-widest">
                    <a href={selectedNews.socialMediaLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" /> Original Story
                    </a>
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </>
  );
}
