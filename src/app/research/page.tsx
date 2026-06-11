
"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { researchPaperSummarizer } from "@/ai/flows/research-paper-summarizer";
import { FileText, Sparkles, Loader2, Download, Share2, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ResearchPage() {
  const [content, setContent] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!content.trim()) {
      toast({
        title: "Input required",
        description: "Please paste the technical research content first.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const output = await researchPaperSummarizer({ paperContent: content });
      setResult(output.advocacyBrief);
    } catch (error) {
      toast({
        title: "Synthesis Error",
        description: "There was an error generating the advocacy brief. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: "Copied to clipboard" });
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F6F8F9] py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Research Synthesis Tool</h1>
              <p className="text-muted-foreground text-lg">
                Harness GenAI to transform technical fragility assessments into concise, stakeholder-ready advocacy briefs.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-headline flex items-center gap-2">
                    <FileText className="h-5 w-5 text-accent" />
                    Input Technical Content
                  </CardTitle>
                  <CardDescription>
                    Paste the full text of your research paper, fragility assessment, or policy draft below.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Paste technical content here..."
                    className="min-h-[300px] font-sans leading-relaxed text-sm bg-background border-muted"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleSummarize} 
                      disabled={loading}
                      className="bg-primary hover:bg-primary/90 text-white gap-2 px-8"
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                      Generate Advocacy Brief
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {result && (
                <Card className="border-none shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <CardHeader className="flex flex-row items-center justify-between border-b pb-6 mb-6">
                    <div>
                      <CardTitle className="text-2xl font-headline text-primary">Advocacy Brief</CardTitle>
                      <CardDescription>Generated based on CPRA core values and mission.</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={handleCopy}>
                        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-headings:font-headline whitespace-pre-wrap">
                      {result}
                    </div>
                    <div className="mt-12 p-4 bg-muted/50 rounded-lg border border-dashed border-muted-foreground/20">
                      <p className="text-xs text-muted-foreground text-center">
                        This brief was generated by the CPRA Insight AI Tool. Always verify key data points against the original source before public dissemination.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
