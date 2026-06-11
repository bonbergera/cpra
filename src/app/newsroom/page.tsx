
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, Newspaper, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";

const newsItems = [
  {
    id: 1,
    title: "CPRA Strongly Condemns Political Cadre Violence in Lusaka",
    date: "October 12, 2023",
    category: "Media Freedoms",
    excerpt: "Occurrence of political cadre violence threatens democratic values. CPRA demands police action to safeguard journalists and peaceful assembly.",
    image: "https://picsum.photos/seed/news1/800/400"
  },
  {
    id: 2,
    title: "Centre Urges Ministry of Justice to Expedite Draft Public Gatherings Bill",
    date: "September 28, 2023",
    category: "Legal Reform",
    excerpt: "The delay in reviewing the Public Gatherings Bill hampers democratic participation. We call for a level playing field for all political stakeholders.",
    image: "https://picsum.photos/seed/news2/800/400"
  },
  {
    id: 3,
    title: "Strategic Academic Partnership with University of Zambia Formalized",
    date: "September 15, 2023",
    category: "Partnerships",
    excerpt: "New MOU focuses on restorative justice research and peacebuilding student mentorship programs in the Southern African region.",
    image: "https://picsum.photos/seed/news3/800/400"
  },
  {
    id: 4,
    title: "Fragility Assessment: Climate Impact on Border Conflicts Released",
    date: "September 05, 2023",
    category: "Climate Justice",
    excerpt: "Comprehensive research detailing how environmental degradation is driving localized resource conflicts in rural areas.",
    image: "https://picsum.photos/seed/news4/800/400"
  },
  {
    id: 5,
    title: "Statement on Electoral Integrity and Democratic Monitoring",
    date: "August 20, 2023",
    category: "Democratic Accountability",
    excerpt: "CPRA highlights key areas for improvement in the upcoming localized elections to ensure transparency and accountability.",
    image: "https://picsum.photos/seed/news5/800/400"
  }
];

export default function NewsroomPage() {
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
                  High-profile statements, legal updates, and strategic reports on Zambian governance and regional security.
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

            {/* Featured Post */}
            <div className="mb-16">
              <Card className="overflow-hidden border-none shadow-xl flex flex-col lg:flex-row">
                <div className="relative lg:w-1/2 aspect-video lg:aspect-auto">
                  <Image 
                    src={newsItems[0].image} 
                    alt="Featured Statement" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center space-y-6">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-accent text-white hover:bg-accent">{newsItems[0].category}</Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {newsItems[0].date}
                    </span>
                  </div>
                  <h2 className="text-3xl font-headline font-bold text-primary leading-tight">
                    {newsItems[0].title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {newsItems[0].excerpt}
                  </p>
                  <Button className="w-fit bg-primary gap-2">
                    Read Full Statement <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>

            {/* Grid Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.slice(1).map((news) => (
                <Card key={news.id} className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow flex flex-col">
                  <div className="relative aspect-video">
                    <Image 
                      src={news.image} 
                      alt={news.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider">{news.category}</Badge>
                      <span className="text-xs text-muted-foreground">{news.date}</span>
                    </div>
                    <CardTitle className="font-headline text-xl leading-tight text-primary">
                      {news.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {news.excerpt}
                    </p>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Button variant="link" className="text-accent p-0 font-bold hover:underline">
                      Read Statement <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-16 flex justify-center">
              <Button variant="outline" className="px-12 border-muted-foreground/30 text-primary font-semibold">
                Load More Advocacy
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
