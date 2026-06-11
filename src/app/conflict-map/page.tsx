
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, AlertTriangle, Info, MapPin, Layers, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * EDITABLE MAP DATA
 * Adjust 'top' and 'left' percentages to move pins on the map mockup.
 */
const MAP_POINTS = [
  {
    id: 1,
    region: "Copperbelt Region",
    title: "Land Tenure Dispute",
    description: "High fragility due to rapid urbanization.",
    level: "moderate", // "high", "moderate", "peacebuilding"
    top: "25%",
    left: "35%"
  },
  {
    id: 2,
    region: "Lusaka Province",
    title: "Political Violence Risk",
    description: "Recent cadre activities detected.",
    level: "high",
    top: "60%",
    left: "70%"
  },
  {
    id: 3,
    region: "Western Province",
    title: "Climate Migration Study",
    description: "Ongoing peacebuilding intervention.",
    level: "peacebuilding",
    top: "45%",
    left: "15%"
  }
];

/**
 * EDITABLE ASSESSMENTS DATA
 */
const RECENT_ASSESSMENTS = [
  { region: "Western Province", type: "Climate Migration", level: "High" },
  { region: "Southern Province", type: "Resource Access", level: "Medium" },
  { region: "North-Western", type: "Mining Dispute", level: "Medium" },
  { region: "Central Province", type: "Land Rights", level: "Low" }
];

export default function ConflictMapPage() {
  const getPinColor = (level: string) => {
    switch(level) {
      case 'high': return 'bg-red-500';
      case 'moderate': return 'bg-orange-500';
      case 'peacebuilding': return 'bg-blue-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F6F8F9] py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
              <div className="space-y-4 flex-1">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold border border-orange-200">
                  <AlertTriangle className="h-4 w-4" /> Fragility Monitor
                </div>
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Conflict Mapping</h1>
                <p className="text-muted-foreground text-lg">
                  Visualizing regional fragility assessments to identify localized structural conflicts across Zambia and Southern Africa.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" /> Filters
                </Button>
                <Button variant="outline" className="gap-2">
                  <Layers className="h-4 w-4" /> Layers
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Map Interface (Mockup) */}
              <div className="lg:col-span-3">
                <Card className="border-none shadow-xl overflow-hidden min-h-[600px] relative bg-slate-200">
                  {/* Visual background placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                    <Map className="h-[40rem] w-[40rem] text-primary" />
                  </div>
                  
                  {/* Dynamic Map Markers */}
                  {MAP_POINTS.map((point) => (
                    <div 
                      key={point.id} 
                      className="absolute group cursor-pointer" 
                      style={{ top: point.top, left: point.left }}
                    >
                      <div className={`p-2 ${getPinColor(point.level)} text-white rounded-full animate-pulse shadow-lg`}>
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white p-4 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 scale-95 group-hover:scale-100 pointer-events-none">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase text-accent tracking-tighter">{point.region}</p>
                          <p className="text-sm font-bold text-primary leading-tight">{point.title}</p>
                          <p className="text-[11px] text-muted-foreground leading-relaxed pt-1">{point.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Map Legend Overlay */}
                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-5 rounded-xl shadow-xl border text-xs space-y-4">
                    <h4 className="font-bold text-primary uppercase tracking-widest text-[10px] border-b pb-2">Map Legend</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-200"></div>
                        <span className="font-medium text-slate-700">Active Conflict / High Risk</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-orange-500 shadow-sm shadow-orange-200"></div>
                        <span className="font-medium text-slate-700">Moderate Fragility</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm shadow-blue-200"></div>
                        <span className="font-medium text-slate-700">Peacebuilding Intervention</span>
                      </div>
                    </div>
                  </div>

                  {/* Top Search Overlay */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-center pointer-events-none">
                    <div className="bg-white p-1 rounded-lg shadow-lg flex items-center pointer-events-auto w-72 border">
                      <input 
                        type="text" 
                        placeholder="Search regions..." 
                        className="text-sm px-4 py-2 w-full focus:outline-none"
                      />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                <Card className="border-none shadow-lg bg-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-headline">Recent Assessments</CardTitle>
                    <CardDescription>Fragility report alerts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {RECENT_ASSESSMENTS.map((item, idx) => (
                      <div key={idx} className="p-4 bg-[#F6F8F9] border border-transparent rounded-xl hover:border-accent/30 hover:bg-white transition-all cursor-pointer group shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold text-primary uppercase tracking-tight">{item.region}</span>
                          <Badge 
                            variant={item.level === "High" ? "destructive" : "outline"} 
                            className="text-[9px] h-4 font-bold uppercase"
                          >
                            {item.level}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground group-hover:text-accent font-medium">{item.type}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="p-8 bg-primary text-primary-foreground rounded-2xl shadow-xl space-y-5 relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 opacity-5">
                     <Map className="h-32 w-32" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/20 rounded-lg">
                       <Info className="h-5 w-5 text-accent" />
                    </div>
                    <h4 className="font-headline font-bold text-lg">Data Protocol</h4>
                  </div>
                  <p className="text-xs opacity-80 leading-relaxed font-light">
                    Our conflict maps are updated weekly through a network of local mediators and strategic research partnerships. We focus on structural triggers of localized conflict.
                  </p>
                  <Button variant="outline" size="sm" className="w-full border-white/20 text-white hover:bg-white/10 text-[10px] uppercase font-bold tracking-widest h-10">
                    Request Full Dataset
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
