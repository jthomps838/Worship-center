import { useQuery } from "@tanstack/react-query";
import { PrayerRequest } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { HandHeart, Heart, Users, Plus } from "lucide-react";

export default function PrayerWall() {
  const { data: publicPrayers = [], isLoading, error } = useQuery<PrayerRequest[]>({
    queryKey: ["/api/prayer-requests/public"],
  });

  return (
    <div className="min-h-screen bg-navy-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-ocean-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="text-white" size={24} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Prayer Wall</h1>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto mb-8">
            Join our community in prayer and support. Each request here represents a person seeking God's comfort and guidance.
          </p>
          <Link href="/prayer/submit">
            <Button className="bg-ocean-500 hover:bg-ocean-600 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Your Prayer Request
            </Button>
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-6">
                <div className="animate-pulse">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="mt-4 h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-red-500" size={24} />
            </div>
            <h3 className="text-lg font-medium text-navy-800 mb-2">Unable to Load Prayer Requests</h3>
            <p className="text-navy-600 mb-4">There was an error loading the prayer wall. Please try again later.</p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
              className="border-navy-300 text-navy-700 hover:bg-navy-50"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && publicPrayers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HandHeart className="text-ocean-500" size={24} />
            </div>
            <h3 className="text-lg font-medium text-navy-800 mb-2">No Public Prayer Requests Yet</h3>
            <p className="text-navy-600 mb-6">
              Be the first to share a prayer request with our community. Your courage to share may encourage others to do the same.
            </p>
            <Link href="/prayer/submit">
              <Button className="bg-ocean-500 hover:bg-ocean-600 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Submit the First Prayer
              </Button>
            </Link>
          </div>
        )}

        {/* Prayer Requests Grid */}
        {!isLoading && !error && publicPrayers.length > 0 && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publicPrayers.map((prayer, index) => (
                <Card 
                  key={prayer.id} 
                  className={`p-6 hover:shadow-md transition-shadow ${
                    index % 3 === 0 ? "bg-ocean-50 border-ocean-100" : 
                    index % 3 === 1 ? "bg-gold-50 border-gold-100" : 
                    "bg-emerald-50 border-emerald-100"
                  }`}
                >
                  <CardContent className="p-0">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          index % 3 === 0 ? "bg-ocean-200" : 
                          index % 3 === 1 ? "bg-gold-200" : 
                          "bg-emerald-200"
                        }`}>
                          <HandHeart className={
                            index % 3 === 0 ? "text-ocean-600" : 
                            index % 3 === 1 ? "text-gold-600" : 
                            "text-emerald-600"
                          } size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-navy-800">
                            {prayer.name || "Anonymous"}
                          </p>
                          <p className="text-sm text-navy-500">
                            {prayer.createdAt 
                              ? new Date(prayer.createdAt).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric"
                                })
                              : "Recently"
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-navy-700 leading-relaxed mb-4">
                      {prayer.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-navy-500">
                        <Heart className="mr-2 text-red-400" size={16} />
                        <span>Praying with you</span>
                      </div>
                      <p className="text-xs text-navy-400 italic">
                        #{prayer.id}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="text-center mt-12 pt-8 border-t border-navy-200">
              <h3 className="text-lg font-medium text-navy-800 mb-4">
                Would you like to share a prayer request?
              </h3>
              <p className="text-navy-600 mb-6">
                Our community is here to support you in prayer. Share your heart with us.
              </p>
              <Link href="/prayer/submit">
                <Button className="bg-ocean-500 hover:bg-ocean-600 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Submit Your Prayer Request
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
