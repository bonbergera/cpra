
"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Map, AlertTriangle, Info, MapPin, Layers, Filter, ZoomIn, ZoomOut, Maximize2, Calendar, BookOpen, Mail, Download } from "lucide-react";
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
    description: "High fragility due to rapid urbanization and mining land overlaps.",
    level: "moderate", // "high", "moderate", "peacebuilding"
    top: "25%",
    left: "45%"
  },
  {
    id: 2,
    region: "Lusaka Province",
    title: "Political Violence Risk",
    description: "Monitoring cadre activities and inter-party tension zones.",
    level: "high",
    top: "55%",
    left: "55%"
  },
  {
    id: 3,
    region: "Western Province",
    title: "Climate Migration Study",
    description: "Cross-border pastoralist movements causing localized tension.",
    level: "peacebuilding",
    top: "50%",
    left: "25%"
  },
  {
    id: 4,
    region: "Southern Province",
    title: "Water Resource Access",
    description: "Dispute over livestock watering points in drought-affected areas.",
    level: "moderate",
    top: "70%",
    left: "40%"
  }
];

/**
 * EDITABLE ASSESSMENTS DATA
 * This powers the sidebar and the detailed popups.
 * reportUrl should point to a file in public/documents/
 */
const RECENT_ASSESSMENTS = [
  { 
    id: "as-1",
    region: "Western Province", 
    type: "Climate Migration Assessment", 
    level: "High", 
    date: "November 2023",
    details: "This assessment focused on the Shangombo district, identifying a 40% increase in localized disputes between settled farmers and nomadic herders. CPRA recommends immediate community-led water sharing agreements and mediation training for traditional leaders.",
    findings: ["Resource scarcity driving 60% of cases", "Youth migration rising", "Lack of formal mediation frameworks"],
    reportUrl: "/documents/climate-migration-western.pdf"
  },
  { 
    id: "as-2",
    region: "Southern Province", 
    type: "Resource Access Audit", 
    level: "Medium", 
    date: "October 2023",
    details: "An audit of the Gwembe Valley land rights. Findings suggest that while structural peace remains stable, the introduction of large-scale commercial farming is displacing smallholder farmers. CPRA is facilitating dialogue between community stakeholders and investors.",
    findings: ["Unclear land boundaries", "Inadequate consultation", "Risk of displacement"],
    reportUrl: "/documents/resource-access-audit-southern.pdf"
  },
  { 
    id: "as-3",
    region: "Lusaka District", 
    type: "Cadre Activity Monitor", 
    level: "High", 
    date: "October 2023",
    details: "Post-election fragility report. Despite a general decrease in national violence, urban markets in Lusaka remain flashpoints for extortion and intimidation by unaligned political cadres. Recommendations include strictly enforcing the Public Gatherings Bill.",
    findings: ["Extortion in bus stations", "Weak police presence in markets", "High youth unemployment"],
    reportUrl: "/documents/cadre-activity-monitor-lusaka.pdf"
  }
];

const GMAIL_URL = "https://mail.google.com/mail/?view=cm&fs=1&to=cpra4peace@gmail.com&su=Request for Raw Conflict Dataset";

export default function ConflictMapPage() {
  const [zoom, setZoom] = useState(1);
  const [selectedAssessment, setSelectedAssessment] = useState<typeof RECENT_ASSESSMENTS[0] | null>(null);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.8));
  const handleResetZoom = () => setZoom(1);

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
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
              <div className="space-y-4 flex-1">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold border border-orange-200">
                  <AlertTriangle className="h-4 w-4" /> Fragility Monitor
                </div>
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Conflict Mapping</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  Visualizing regional fragility assessments to identify localized structural conflicts. Use the interactive map to explore specific incidents.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2 bg-white"><Filter className="h-4 w-4" /> All Risks</Button>
                <Button variant="outline" className="gap-2 bg-white"><Layers className="h-4 w-4" /> Satellite View</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Map Interface Simulation */}
              <div className="lg:col-span-3">
                <Card className="border-none shadow-2xl overflow-hidden min-h-[700px] relative bg-[#E5E7EB] group/map">
                  {/* Interactive Map Container */}
                  <div 
                    className="absolute inset-0 transition-transform duration-500 ease-out flex items-center justify-center cursor-grab active:cursor-grabbing"
                    style={{ transform: `scale(${zoom})` }}
                  >
                    {/* Visual Zambia Map Placeholder */}
                    <div className="relative w-[800px] h-[600px] bg-slate-100 rounded-[50px] shadow-inner flex items-center justify-center border-4 border-white/50">
                        <Map className="h-[40rem] w-[40rem] text-primary opacity-[0.03]" />
                        <div className="absolute inset-0 border-2 border-slate-300 rounded-[46px] border-dashed opacity-20"></div>
                        
                        {/* Dynamic Map Markers */}
                        {MAP_POINTS.map((point) => (
                          <div 
                            key={point.id} 
                            className="absolute z-10" 
                            style={{ top: point.top, left: point.left }}
                          >
                            <div className="group relative">
                              <div className={`p-2.5 ${getPinColor(point.level)} text-white rounded-full animate-pulse shadow-lg border-2 border-white cursor-pointer hover:scale-125 transition-transform`}>
                                <MapPin className="h-5 w-5" />
                              </div>
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 bg-white p-5 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 pointer-events-none border border-slate-100">
                                <p className="text-[10px] font-bold uppercase text-accent tracking-tighter mb-1">{point.region}</p>
                                <p className="text-sm font-bold text-primary leading-tight">{point.title}</p>
                                <p className="text-[11px] text-muted-foreground leading-relaxed pt-2 border-t mt-2">{point.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Zoom Controls Overlay */}
                  <div className="absolute top-6 right-6 flex flex-col gap-2">
                    <Button size="icon" variant="secondary" className="bg-white/90 backdrop-blur shadow-lg hover:bg-white" onClick={handleZoomIn}><ZoomIn className="h-5 w-5" /></Button>
                    <Button size="icon" variant="secondary" className="bg-white/90 backdrop-blur shadow-lg hover:bg-white" onClick={handleZoomOut}><ZoomOut className="h-5 w-5" /></Button>
                    <Button size="icon" variant="secondary" className="bg-white/90 backdrop-blur shadow-lg hover:bg-white" onClick={handleResetZoom}><Maximize2 className="h-5 w-5" /></Button>
                  </div>

                  {/* Legend Overlay */}
                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border text-xs space-y-4 max-w-xs">
                    <h4 className="font-bold text-primary uppercase tracking-widest text-[10px] border-b pb-3">Security Legend</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3.5 h-3.5 rounded-full bg-red-500 ring-4 ring-red-50"></div>
                        <span className="font-medium text-slate-700">Active High Risk Area</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3.5 h-3.5 rounded-full bg-orange-500 ring-4 ring-orange-50"></div>
                        <span className="font-medium text-slate-700">Moderate Fragility Zone</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3.5 h-3.5 rounded-full bg-blue-500 ring-4 ring-blue-50"></div>
                        <span className="font-medium text-slate-700">Peacebuilding Intervention</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar Assessments */}
              <div className="space-y-6">
                <Card className="border-none shadow-xl bg-white overflow-hidden">
                  <CardHeader className="bg-primary/5 pb-6">
                    <CardTitle className="text-lg font-headline text-primary flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-accent" /> Recent Assessments
                    </CardTitle>
                    <CardDescription className="text-xs">Click to view full research details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    {RECENT_ASSESSMENTS.map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => setSelectedAssessment(item)}
                        className="p-5 bg-[#F6F8F9] border border-transparent rounded-2xl hover:border-accent/30 hover:bg-white transition-all cursor-pointer group shadow-sm hover:shadow-md"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-bold text-primary uppercase tracking-tight">{item.region}</span>
                          <Badge 
                            variant={item.level === "High" ? "destructive" : "outline"} 
                            className="text-[9px] h-4 font-bold uppercase tracking-widest border-none px-2"
                          >
                            {item.level}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-700 group-hover:text-accent font-bold leading-tight transition-colors">{item.type}</p>
                        <div className="flex items-center gap-1.5 mt-3 text-[10px] text-muted-foreground font-semibold">
                          <Calendar className="h-3 w-3" /> {item.date}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="p-8 bg-primary text-primary-foreground rounded-3xl shadow-2xl space-y-5 relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 opacity-10">
                     <MapPin className="h-32 w-32" />
                  </div>
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="p-2 bg-accent/20 rounded-xl">
                       <Info className="h-5 w-5 text-accent" />
                    </div>
                    <h4 className="font-headline font-bold text-xl">Protocol</h4>
                  </div>
                  <p className="text-xs opacity-80 leading-relaxed font-light relative z-10">
                    Our conflict maps are cross-verified by regional academic partners and on-the-ground human rights monitors.
                  </p>
                  <Button asChild className="w-full bg-accent hover:bg-accent/90 text-white text-[10px] uppercase font-bold tracking-widest h-12 rounded-xl relative z-10 shadow-lg transition-transform hover:scale-[1.02]">
                    <a href={GMAIL_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      <Mail className="h-4 w-4" /> Request Raw Dataset
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Assessment Details Popup */}
      <Dialog open={!!selectedAssessment} onOpenChange={() => setSelectedAssessment(null)}>
        <DialogContent className="max-w-2xl w-[95vw] p-0 overflow-hidden border-none rounded-3xl flex flex-col max-h-[90vh]">
          {selectedAssessment && (
            <>
              <DialogHeader className="p-8 bg-primary text-white relative shrink-0">
                <div className="flex justify-between items-center mb-4">
                  <Badge className="bg-accent text-white border-none uppercase text-[10px] tracking-widest">{selectedAssessment.region}</Badge>
                  <span className="text-xs opacity-70 flex items-center gap-1.5 font-bold"><Calendar className="h-3 w-3" /> {selectedAssessment.date}</span>
                </div>
                <DialogTitle className="text-2xl md:text-3xl font-headline font-bold leading-tight pr-10">
                  {selectedAssessment.type}
                </DialogTitle>
                <div className="absolute -bottom-4 right-8 p-3 bg-white rounded-full shadow-xl">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
              </DialogHeader>
              
              <div className="p-8 space-y-8 bg-white overflow-y-auto flex-1">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-accent uppercase tracking-widest border-b pb-2">Assessment Overview</h4>
                  <p className="text-slate-700 leading-relaxed text-lg font-light">
                    {selectedAssessment.details}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-accent uppercase tracking-widest border-b pb-2">Key Findings</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedAssessment.findings.map((finding, i) => (
                      <li key={i} className="flex gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 items-start">
                        <div className="h-2 w-2 rounded-full bg-accent mt-1.5 shrink-0" />
                        <span className="text-sm font-medium text-slate-700">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="p-6 bg-slate-50 border-t flex flex-col sm:flex-row gap-4 items-center justify-between shrink-0">
                <p className="text-[10px] text-muted-foreground font-bold uppercase">Restricted CPRA Insight Access</p>
                <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-xs font-bold uppercase tracking-widest px-8 h-12 rounded-xl shadow-md transition-all hover:scale-[1.02]">
                  <a href={selectedAssessment.reportUrl} download className="flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" /> Download Full Report
                  </a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </>
  );
}
