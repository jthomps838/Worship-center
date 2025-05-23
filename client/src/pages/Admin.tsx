import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PrayerRequest, ContactMessage } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, HandHeart, Mail, Clock, CheckCircle, XCircle, AlertCircle, Eye } from "lucide-react";

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerRequest | null>(null);

  const { data: prayerRequests = [], isLoading: loadingPrayers } = useQuery<PrayerRequest[]>({
    queryKey: ["/api/prayer-requests"],
  });

  const { data: contactMessages = [], isLoading: loadingMessages } = useQuery<ContactMessage[]>({
    queryKey: ["/api/contact"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest("PATCH", `/api/prayer-requests/${id}/status`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/prayer-requests"] });
      queryClient.invalidateQueries({ queryKey: ["/api/prayer-requests/public"] });
      toast({
        title: "Status Updated",
        description: "Prayer request status has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "There was an error updating the prayer request status.",
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300"><Clock className="mr-1 h-3 w-3" />Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="text-green-600 border-green-300"><CheckCircle className="mr-1 h-3 w-3" />Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="text-red-600 border-red-300"><XCircle className="mr-1 h-3 w-3" />Rejected</Badge>;
      default:
        return <Badge variant="outline"><AlertCircle className="mr-1 h-3 w-3" />Unknown</Badge>;
    }
  };

  const handleStatusChange = (id: number, status: string) => {
    updateStatusMutation.mutate({ id, status });
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-navy-50">
      {/* Header */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Shield className="text-red-600" size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-navy-900">Admin Dashboard</h1>
              <p className="text-navy-600">Manage prayer requests and contact messages</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{prayerRequests.filter(p => p.status === "pending").length}</div>
                <div className="text-sm text-navy-600">Pending</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{prayerRequests.filter(p => p.status === "approved").length}</div>
                <div className="text-sm text-navy-600">Approved</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{prayerRequests.filter(p => p.status === "rejected").length}</div>
                <div className="text-sm text-navy-600">Rejected</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-ocean-600">{contactMessages.length}</div>
                <div className="text-sm text-navy-600">Messages</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="prayers" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="prayers" className="flex items-center space-x-2">
                <HandHeart size={16} />
                <span>Prayer Requests</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center space-x-2">
                <Mail size={16} />
                <span>Contact Messages</span>
              </TabsTrigger>
            </TabsList>

            {/* Prayer Requests Tab */}
            <TabsContent value="prayers" className="space-y-6">
              {loadingPrayers ? (
                <div className="grid gap-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <div className="animate-pulse space-y-3">
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : prayerRequests.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <HandHeart className="mx-auto text-navy-400 mb-4" size={48} />
                    <h3 className="text-lg font-medium text-navy-800 mb-2">No Prayer Requests</h3>
                    <p className="text-navy-600">No prayer requests have been submitted yet.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {prayerRequests.map((request) => (
                    <Card key={request.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-ocean-100 rounded-full flex items-center justify-center">
                              <HandHeart className="text-ocean-600" size={16} />
                            </div>
                            <div>
                              <p className="font-medium text-navy-800">
                                {request.name || "Anonymous"} #{request.id}
                              </p>
                              <p className="text-sm text-navy-500">
                                {formatDate(request.createdAt)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(request.status)}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedPrayer(selectedPrayer?.id === request.id ? null : request)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {selectedPrayer?.id === request.id && (
                          <div className="mt-4 p-4 bg-navy-50 rounded-lg space-y-4">
                            <div>
                              <p className="text-sm font-medium text-navy-700 mb-1">Email:</p>
                              <p className="text-navy-600">{request.email || "Not provided"}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-navy-700 mb-1">Prayer Request:</p>
                              <p className="text-navy-700 leading-relaxed">{request.content}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="font-medium text-navy-700">Public:</p>
                                <p className={request.isPublic ? "text-green-600" : "text-red-600"}>
                                  {request.isPublic ? "Yes" : "No"}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium text-navy-700">Follow-up:</p>
                                <p className={request.needsFollowUp ? "text-green-600" : "text-red-600"}>
                                  {request.needsFollowUp ? "Requested" : "Not requested"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 pt-2">
                              <p className="text-sm font-medium text-navy-700">Status:</p>
                              <Select
                                value={request.status}
                                onValueChange={(value) => handleStatusChange(request.id, value)}
                                disabled={updateStatusMutation.isPending}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="approved">Approved</SelectItem>
                                  <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}

                        {selectedPrayer?.id !== request.id && (
                          <p className="text-navy-700 leading-relaxed">
                            {request.content.length > 150 
                              ? `${request.content.substring(0, 150)}...` 
                              : request.content
                            }
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Contact Messages Tab */}
            <TabsContent value="messages" className="space-y-6">
              {loadingMessages ? (
                <div className="grid gap-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <div className="animate-pulse space-y-3">
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : contactMessages.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Mail className="mx-auto text-navy-400 mb-4" size={48} />
                    <h3 className="text-lg font-medium text-navy-800 mb-2">No Contact Messages</h3>
                    <p className="text-navy-600">No contact messages have been received yet.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {contactMessages.map((message) => (
                    <Card key={message.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center">
                              <Mail className="text-gold-600" size={16} />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{message.name}</CardTitle>
                              <p className="text-sm text-navy-500">
                                {message.email} • {formatDate(message.createdAt)}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline">#{message.id}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-navy-700 leading-relaxed">{message.message}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
