
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, AlertTriangle, Info, MapPin, Layers, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ConflictMapPage() {
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
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                    <Map className="h-96 w-96 text-primary" />
                  </div>
                  
                  {/* Mock Map Markers */}
                  <div className="absolute top-1/4 left-1/3 group cursor-pointer">
                    <div className="p-2 bg-orange-500 text-white rounded-full animate-pulse shadow-lg">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white p-3 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      <p className="text-xs font-bold uppercase text-accent mb-1">Copperbelt Region</p>
                      <p className="text-sm font-semibold text-primary">Land Tenure Dispute</p>
                      <p className="text-[10px] text-muted-foreground mt-1">High fragility due to rapid urbanization.</p>
                    </div>
                  </div>

                  <div className="absolute bottom-1/3 right-1/4 group cursor-pointer">
                    <div className="p-2 bg-red-500 text-white rounded-full animate-pulse shadow-lg">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white p-3 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      <p className="text-xs font-bold uppercase text-accent mb-1">Lusaka Province</p>
                      <p className="text-sm font-semibold text-primary">Political Violence Risk</p>
                      <p className="text-[10px] text-muted-foreground mt-1">Recent cadre activities detected.</p>
                    </div>
                  </div>

                  {/* Map Legend Overlay */}
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg border text-xs space-y-3">
                    <h4 className="font-bold text-primary uppercase tracking-wider mb-2">Map Legend</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>Active Conflict / High Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span>Moderate Fragility</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>Peacebuilding Intervention</span>
                    </div>
                  </div>

                  {/* Top Search Overlay */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-center pointer-events-none">
                    <div className="bg-white p-1 rounded-md shadow-md flex items-center pointer-events-auto w-64">
                      <input 
                        type="text" 
                        placeholder="Search regions..." 
                        className="text-sm px-3 py-1.5 w-full focus:outline-none"
                      />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                <Card className="border-none shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-headline">Recent Assessments</CardTitle>
                    <CardDescription>Top fragility report alerts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { region: "Western Province", type: "Climate Migration", level: "High" },
                      { region: "Southern Province", type: "Resource Access", level: "Medium" },
                      { region: "North-Western", type: "Mining Dispute", level: "Medium" }
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 bg-white border rounded-lg hover:border-accent transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs font-bold text-primary">{item.region}</span>
                          <Badge variant={item.level === "High" ? "destructive" : "outline"} className="text-[8px] h-4">
                            {item.level}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground group-hover:text-accent">{item.type}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="p-6 bg-primary text-primary-foreground rounded-xl shadow-lg space-y-4">
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-accent" />
                    <h4 className="font-headline font-semibold">About our Data</h4>
                  </div>
                  <p className="text-xs opacity-70 leading-relaxed">
                    Our conflict maps are updated weekly through a network of local mediators and strategic research partnerships. We focus on structural triggers of localized conflict.
                  </p>
                  <Button variant="outline" size="sm" className="w-full border-white/20 text-white hover:bg-white/10 text-[10px] uppercase font-bold tracking-widest">
                    Request Full Data Access
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
