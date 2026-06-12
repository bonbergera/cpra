
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCollection, useUser, useAuth } from "@/firebase";
import { useFirestore } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useMemo } from "react";
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
import { Users, Mail, MessageSquare, ShieldAlert, Calendar, LogIn, LogOut } from "lucide-react";
import { format } from "date-fns";

export default function AdminPage() {
  const { user, loading: authLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();

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

  const { data: subscribers, loading: subLoading } = useCollection(subscribersQuery);
  const { data: messages, loading: msgLoading } = useCollection(messagesQuery);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleSignOut = () => auth.signOut();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-sm font-medium text-muted-foreground">Verifying secure session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <main className="flex-1 bg-slate-100 flex items-center justify-center py-20 px-4">
          <Card className="max-w-md w-full text-center p-8 space-y-6 shadow-2xl border-none">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <ShieldAlert className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-headline font-bold text-primary">Admin Access Required</h2>
              <p className="text-muted-foreground">
                This dashboard is restricted to authorized CPRA staff. Please sign in with your organization-linked Google account to proceed.
              </p>
            </div>
            <Button onClick={handleLogin} className="w-full gap-2 h-12 text-sm font-bold uppercase tracking-widest">
              <LogIn className="h-4 w-4" /> Sign in with Google
            </Button>
          </Card>
        </main>
        <Footer />
      </>
    );
  }

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
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2 text-muted-foreground hover:text-destructive">
                <LogOut className="h-4 w-4" /> Sign Out
              </Button>
            </div>

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
                        ) : subscribers?.length === 0 ? (
                          <TableRow><TableCell colSpan={2} className="text-center py-8 text-muted-foreground">No subscribers found yet.</TableCell></TableRow>
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
                        ) : messages?.length === 0 ? (
                          <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No messages received yet.</TableCell></TableRow>
                        ) : (
                          messages?.map((msg: any) => (
                            <TableRow key={msg.id} className="cursor-pointer hover:bg-slate-50">
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
