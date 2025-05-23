import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { insertPrayerRequestSchema, type InsertPrayerRequest } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { HandHeart, Loader2 } from "lucide-react";

export default function PrayerSubmit() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertPrayerRequest>({
    resolver: zodResolver(insertPrayerRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      content: "",
      isPublic: false,
      needsFollowUp: false,
    },
  });

  const submitPrayerMutation = useMutation({
    mutationFn: async (data: InsertPrayerRequest) => {
      const response = await apiRequest("POST", "/api/prayer-requests", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/prayer-requests"] });
      queryClient.invalidateQueries({ queryKey: ["/api/prayer-requests/public"] });
      
      toast({
        title: "Prayer Request Submitted",
        description: "Your prayer request has been received and will be reviewed shortly. Thank you for sharing your heart with us.",
      });
      
      form.reset();
      setLocation("/");
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your prayer request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertPrayerRequest) => {
    submitPrayerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-navy-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-ocean-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <HandHeart className="text-white" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-navy-900 mb-4">Submit Prayer Request</h1>
          <p className="text-lg text-navy-600">
            Share your prayer request with our community. We believe in the power of prayer and are honored to pray with you.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-navy-900">Your Prayer Request</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-navy-700">Name (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your name or leave blank for anonymous" 
                          className="border-navy-200 focus:ring-ocean-500 focus:border-ocean-500"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-navy-700">Email (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="your.email@example.com" 
                          className="border-navy-200 focus:ring-ocean-500 focus:border-ocean-500"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription className="text-navy-500">
                        Only needed if you want follow-up
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-navy-700">
                        Prayer Request <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={6}
                          placeholder="Share your prayer request here..."
                          className="border-navy-200 focus:ring-ocean-500 focus:border-ocean-500 resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="isPublic"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-navy-300"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-navy-700 font-medium">
                            Make this public on the Prayer Wall
                          </FormLabel>
                          <FormDescription className="text-navy-500">
                            Allow others to see and pray for your request
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="needsFollowUp"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-navy-300"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-navy-700 font-medium">
                            I would like personal follow-up
                          </FormLabel>
                          <FormDescription className="text-navy-500">
                            Someone from our team will reach out to you
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex space-x-4">
                  <Button 
                    type="submit"
                    disabled={submitPrayerMutation.isPending}
                    className="flex-1 bg-ocean-500 hover:bg-ocean-600 text-white"
                  >
                    {submitPrayerMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Prayer Request"
                    )}
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setLocation("/")}
                    className="px-6 border-navy-300 text-navy-700 hover:bg-navy-50"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
