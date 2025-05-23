import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertContactMessageSchema } from "../../../shared/schema.js";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const submitContactMutation = useMutation({
    mutationFn: async (data) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out! We'll get back to you as soon as possible.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Failed to Send Message",
        description: "There was an error sending your message. Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data) => {
    submitContactMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-navy-50">
      {/* Header */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-ocean-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="text-white" size={24} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto">
            We'd love to hear from you. Whether you have questions, need prayer, or want to connect with our ministry, 
            we're here to help and support you.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-navy-900">Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-navy-700">
                              Name <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your full name" 
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
                            <FormLabel className="text-navy-700">
                              Email <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="your.email@example.com" 
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
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-navy-700">
                              Message <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea 
                                rows={6}
                                placeholder="How can we help you? Share your thoughts, questions, or prayer requests..."
                                className="border-navy-200 focus:ring-ocean-500 focus:border-ocean-500 resize-none"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit"
                        disabled={submitContactMutation.isPending}
                        className="w-full bg-ocean-500 hover:bg-ocean-600 text-white py-3"
                      >
                        {submitContactMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-navy-900 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-ocean-100 rounded-lg flex items-center justify-center">
                        <Mail className="text-ocean-600" size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-navy-800">Email</p>
                        <p className="text-navy-600 text-sm">hello@stormtoshore.org</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-ocean-100 rounded-lg flex items-center justify-center">
                        <Phone className="text-ocean-600" size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-navy-800">Phone</p>
                        <p className="text-navy-600 text-sm">(555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-ocean-100 rounded-lg flex items-center justify-center">
                        <MapPin className="text-ocean-600" size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-navy-800">Location</p>
                        <p className="text-navy-600 text-sm">Serving communities everywhere</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ministry Hours */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-navy-900 mb-4">Response Times</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-navy-600">General Inquiries</span>
                      <span className="text-navy-800 font-medium">24-48 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-navy-600">Prayer Requests</span>
                      <span className="text-navy-800 font-medium">Same day</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-navy-600">Urgent Matters</span>
                      <span className="text-navy-800 font-medium">Within 6 hours</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-ocean-50 rounded-lg">
                    <p className="text-xs text-navy-600">
                      For immediate spiritual crisis support, please contact your local pastor or crisis helpline.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Ways We Can Help */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-navy-900 mb-4">How We Can Help</h3>
                  <ul className="space-y-2 text-sm text-navy-600">
                    <li>• Prayer support and guidance</li>
                    <li>• Biblical counseling referrals</li>
                    <li>• Speaking engagements</li>
                    <li>• Ministry partnerships</li>
                    <li>• Volunteer opportunities</li>
                    <li>• General questions about faith</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Need Immediate Help?</h3>
              <p className="text-red-700 mb-4">
                If you're experiencing a mental health crisis or having thoughts of self-harm, 
                please reach out for immediate professional help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:988" 
                  className="inline-flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call 988 (Suicide & Crisis Lifeline)
                </a>
                <a 
                  href="tel:911" 
                  className="inline-flex items-center justify-center px-4 py-2 border border-red-300 text-red-700 hover:bg-red-100 font-medium rounded-lg transition-colors"
                >
                  Emergency: 911
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}