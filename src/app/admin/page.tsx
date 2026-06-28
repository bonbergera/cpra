
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCollection, useUser, useAuth } from "@/firebase";
import { useFirestore } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useMemo, useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Users, Mail, MessageSquare, ShieldAlert, Calendar, LogIn, LogOut, AlertCircle, Globe, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AdminPage() {
  const { user, loading: authLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const [authError, setAuthError] = useState<string | null>(null);
  const [currentHostname, setCurrentHostname] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentHostname(window.location.hostname);
    }
  }, []);

  // Memoize queries for subscribers
  const subscribersQuery = useMemo(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, "newsletter_subscribers"), orderBy("subscribedAt", "desc"));
  }, [firestore, user]);

  // Memoize queries for messages
  const messagesQuery = useMemo(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, "contact_messages"), orderBy("sentAt", "desc"));
  }, [firestore, user]);

  const { data: subscribers, loading: subLoading, error: subError } = useCollection(subscribersQuery);
  const { data: messages, loading: msgLoading, error: msgError } = useCollection(messagesQuery);

  const handleLogin = async () => {
    setAuthError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Auth Error:", error);
      if (error.code === 'auth/unauthorized-domain') {
        setAuthError(`DOMAIN_UNAUTHORIZED: Firebase does not trust "${window.location.hostname}" yet.`);
      } else if (error.code === 'auth/configuration-not-found') {
        setAuthError("GOOGLE_SIGNIN_DISABLED: Google login is not enabled in your Firebase Console.");
      } else {
        setAuthError(error.message || "Authentication failed.");
      }
    }
  };

  const handleSignOut = () => auth.signOut();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-sm font-medium text-muted-foreground">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <main className="flex-1 bg-slate-100 flex items-center justify-center py-20 px-4">
          <Card className="max-w-md w-full text-center p-8 space-y-6 shadow-2xl border-none bg-white">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <ShieldAlert className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-headline font-bold text-primary">Admin Access</h2>
              <p className="text-muted-foreground text-sm">
                Secure dashboard for authorized CPRA personnel only.
              </p>
            </div>

            {authError && (
              <Alert variant="destructive" className="text-left bg-destructive/5 border-destructive/20 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="text-xs font-bold uppercase tracking-tight">Security Blocked</AlertTitle>
                <AlertDescription className="mt-2 text-[11px] space-y-3 leading-relaxed">
                  <p>{authError}</p>
                  
                  {authError.includes('DOMAIN_UNAUTHORIZED') && (
                    <div className="p-3 bg-white/60 rounded-lg border border-destructive/10 space-y-2">
                      <p className="font-bold text-primary">How to fix this in 30 seconds:</p>
                      <ol className="list-decimal pl-4 space-y-1 font-medium">
                        <li>Go to <strong>Firebase Console</strong></li>
                        <li><strong>Authentication</strong> &gt; <strong>Settings</strong></li>
                        <li>Click <strong>Authorized domains</strong></li>
                        <li>Click <strong>Add domain</strong> and type: <code className="bg-destructive/10 px-1 rounded">{currentHostname}</code></li>
                      </ol>
                      <Button asChild variant="link" className="p-0 h-auto text-[10px] text-accent font-bold">
                        <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                          Open Firebase Console <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  )}

                  {authError.includes('GOOGLE_SIGNIN_DISABLED') && (
                    <div className="p-3 bg-white/60 rounded-lg border border-destructive/10">
                      <p><strong>Fix:</strong> Go to Firebase Console &gt; Authentication &gt; Sign-in method &gt; Add Provider &gt; Select <strong>Google</strong> &gt; Enable.</p>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <Button onClick={handleLogin} className="w-full gap-2 h-12 text-sm font-bold uppercase tracking-widest bg-primary hover:bg-primary/90">
              <LogIn className="h-4 w-4" /> Sign in with Google
            </Button>
            
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              Detected Hostname: <span className="text-accent">{currentHostname}</span>
            </p>
          </Card>
        </main>
        <Footer />
      </>
    );
  }

  const globalError = subError || msgError;

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F6F8F9] py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white p-6 rounded-2xl shadow-sm border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary text-white rounded-xl">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-headline font-bold text-primary">Internal Dashboard</h1>
                  <p className="text-xs text-muted-foreground font-medium">Logged in as <span className="text-accent">{user.email}</span></p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2 text-muted-foreground hover:text-destructive transition-colors">
                <LogOut className="h-4 w-4" /> Sign Out
              </Button>
            </div>

            {globalError && (
              <Alert variant="destructive" className="bg-white border-destructive/50">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Database Permission Error</AlertTitle>
                <AlertDescription>
                  Authenticated as <strong>{user.email}</strong>, but Firestore rejected the read request. 
                  Please ensure this email has been granted "Admin" roles in your Security Rules.
                </AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="subscribers" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mb-8 bg-white border shadow-sm">
                <TabsTrigger value="subscribers" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                  <Users className="h-4 w-4" /> Subscribers
                </TabsTrigger>
                <TabsTrigger value="messages" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                  <MessageSquare className="h-4 w-4" /> Messages
                </TabsTrigger>
              </TabsList>

              <TabsContent value="subscribers" className="space-y-6">
                <Card className="border-none shadow-lg overflow-hidden">
                  <CardHeader className="bg-white border-b">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Mail className="h-5 w-5 text-accent" />
                      Newsletter Subscribers
                    </CardTitle>
                    <CardDescription>
                      A total of {subscribers?.length || 0} individuals have opted into your updates.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-slate-50">
                        <TableRow>
                          <TableHead>Email Address</TableHead>
                          <TableHead>Subscribed On</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subLoading ? (
                          <TableRow><TableCell colSpan={2} className="text-center py-8">Loading subscribers...</TableCell></TableRow>
                        ) : subError ? (
                          <TableRow><TableCell colSpan={2} className="text-center py-8 text-destructive font-medium">Permission Denied: Admin access required for this collection.</TableCell></TableRow>
                        ) : subscribers?.length === 0 ? (
                          <TableRow><TableCell colSpan={2} className="text-center py-8 text-muted-foreground font-medium">No subscribers found yet.</TableCell></TableRow>
                        ) : (
                          subscribers?.map((sub: any) => (
                            <TableRow key={sub.id}>
                              <TableCell className="font-medium">{sub.email}</TableCell>
                              <TableCell className="text-muted-foreground flex items-center gap-2">
                                <Calendar className="h-3 w-3" />
                                {sub.subscribedAt?.seconds 
                                  ? format(new Date(sub.subscribedAt.seconds * 1000), "PPP p") 
                                  : "Recently joined"}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="messages" className="space-y-6">
                <Card className="border-none shadow-lg overflow-hidden">
                  <CardHeader className="bg-white border-b">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <MessageSquare className="h-5 w-5 text-accent" />
                      Contact Form Messages
                    </CardTitle>
                    <CardDescription>
                      Review incoming inquiries and collaboration proposals.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-slate-50">
                        <TableRow>
                          <TableHead>Sender</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Message Preview</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {msgLoading ? (
                          <TableRow><TableCell colSpan={4} className="text-center py-8">Loading messages...</TableCell></TableRow>
                        ) : msgError ? (
                          <TableRow><TableCell colSpan={4} className="text-center py-8 text-destructive font-medium">Permission Denied: Admin access required for this collection.</TableCell></TableRow>
                        ) : messages?.length === 0 ? (
                          <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground font-medium">No messages received yet.</TableCell></TableRow>
                        ) : (
                          messages?.map((msg: any) => (
                            <TableRow key={msg.id} className="cursor-pointer hover:bg-slate-50 transition-colors">
                              <TableCell>
                                <div className="font-medium">{msg.name}</div>
                                <div className="text-xs text-muted-foreground">{msg.email}</div>
                              </TableCell>
                              <TableCell className="font-semibold text-primary">{msg.subject}</TableCell>
                              <TableCell className="max-w-xs truncate text-muted-foreground text-xs">
                                {msg.message}
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground">
                                {msg.sentAt?.seconds 
                                  ? format(new Date(msg.sentAt.seconds * 1000), "MMM d, yyyy") 
                                  : "Just now"}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
