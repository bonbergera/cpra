
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCollection } from "@/firebase";
import { useFirestore } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
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
import { Users, Mail, MessageSquare, ShieldAlert, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function AdminPage() {
  const firestore = useFirestore();

  // Memoize queries for subscribers
  const subscribersQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, "newsletter_subscribers"), orderBy("subscribedAt", "desc"));
  }, [firestore]);

  // Memoize queries for messages
  const messagesQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, "contact_messages"), orderBy("sentAt", "desc"));
  }, [firestore]);

  const { data: subscribers, loading: subLoading } = useCollection(subscribersQuery);
  const { data: messages, loading: msgLoading } = useCollection(messagesQuery);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F6F8F9] py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary text-white rounded-xl">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-headline font-bold text-primary">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage your community engagement and insights.</p>
              </div>
            </div>

            <Tabs defaultValue="subscribers" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mb-8">
                <TabsTrigger value="subscribers" className="gap-2">
                  <Users className="h-4 w-4" /> Subscribers
                </TabsTrigger>
                <TabsTrigger value="messages" className="gap-2">
                  <MessageSquare className="h-4 w-4" /> Messages
                </TabsTrigger>
              </TabsList>

              <TabsContent value="subscribers" className="space-y-6">
                <Card className="border-none shadow-lg overflow-hidden">
                  <CardHeader className="bg-white border-b">
                    <CardTitle className="flex items-center gap-2">
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
                          <TableRow><TableCell colSpan={2} className="text-center py-8">No subscribers found yet.</TableCell></TableRow>
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
                    <CardTitle className="flex items-center gap-2">
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
                          <TableRow><TableCell colSpan={4} className="text-center py-8">No messages received yet.</TableCell></TableRow>
                        ) : (
                          messages?.map((msg: any) => (
                            <TableRow key={msg.id} className="cursor-pointer hover:bg-slate-50">
                              <TableCell>
                                <div className="font-medium">{msg.name}</div>
                                <div className="text-xs text-muted-foreground">{msg.email}</div>
                              </TableCell>
                              <TableCell className="font-semibold">{msg.subject}</TableCell>
                              <TableCell className="max-w-xs truncate text-muted-foreground">
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
