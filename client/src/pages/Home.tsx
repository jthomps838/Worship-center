import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { PrayerRequest } from "@shared/schema";
import { Heart, HandHeart, Users, PlayCircle, ChevronDown } from "lucide-react";

export default function Home() {
  const { data: publicPrayers = [], isLoading } = useQuery<PrayerRequest[]>({
    queryKey: ["/api/prayer-requests/public"],
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 ocean-gradient opacity-80"></div>
        <div 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="relative min-h-screen flex items-center"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                From <span className="text-gold-500">Storm</span> to <span className="text-ocean-100">Shore</span>
              </h1>
              <p className="text-xl md:text-2xl text-ocean-100 mb-8 font-light">
                Finding peace, hope, and healing through Christ in life's most challenging moments
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/prayer/submit">
                  <Button size="lg" className="bg-ocean-500 hover:bg-ocean-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Submit a Prayer Request
                  </Button>
                </Link>
                <Link href="/prayer/wall">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 text-lg font-semibold transition-all duration-300 backdrop-blur-sm"
                  >
                    Visit Prayer Wall
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce">
              <ChevronDown className="text-white text-2xl" size={32} />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Our Mission</h2>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Guiding you through life's storms toward the safety and peace found in Christ
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission Card 1 */}
            <Card className="text-center p-8 bg-ocean-50 hover:bg-ocean-100 transition-colors border-ocean-100">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-ocean-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HandHeart className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-navy-800 mb-4">Prayer Support</h3>
                <p className="text-navy-600">Submit your prayer requests and find community support through our Prayer Wall</p>
              </CardContent>
            </Card>

            {/* Mission Card 2 */}
            <Card className="text-center p-8 bg-gold-100 hover:bg-gold-200 transition-colors border-gold-100">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-navy-800 mb-4">Encouragement</h3>
                <p className="text-navy-600">Find hope through biblical messages, testimonies, and spiritual guidance</p>
              </CardContent>
            </Card>

            {/* Mission Card 3 */}
            <Card className="text-center p-8 bg-emerald-50 hover:bg-emerald-100 transition-colors border-emerald-100">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-navy-800 mb-4">Personal Connection</h3>
                <p className="text-navy-600">Request personal follow-up and connect with our ministry team</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="py-16 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Latest Message</h2>
            <p className="text-xl text-navy-600">Watch our most recent teaching and find encouragement for your journey</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-xl">
              <div className="aspect-video bg-navy-800 flex items-center justify-center">
                <div className="text-center">
                  <PlayCircle className="text-ocean-500 mb-4" size={64} />
                  <p className="text-white text-lg mb-2">Latest Video Message</p>
                  <p className="text-ocean-200">Click to watch on YouTube</p>
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-navy-900 mb-4">Finding Hope in the Storm</h3>
                <p className="text-navy-600 mb-6">
                  Discover how God's presence can guide you through the most challenging seasons of life. 
                  Learn to trust His plan even when the path seems unclear.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-navy-500">Published 3 days ago</span>
                  <Link href="/media">
                    <Button className="bg-ocean-500 hover:bg-ocean-600 text-white">
                      Watch Full Series
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Prayer Wall Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Prayer Wall</h2>
            <p className="text-xl text-navy-600 mb-8">Join our community in prayer and support</p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
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
                  </div>
                </Card>
              ))}
            </div>
          ) : publicPrayers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {publicPrayers.slice(0, 6).map((prayer, index) => (
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
                            {prayer.createdAt ? new Date(prayer.createdAt).toLocaleDateString() : "Recently"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-navy-700 leading-relaxed">
                      {prayer.content.length > 150 
                        ? `${prayer.content.substring(0, 150)}...` 
                        : prayer.content
                      }
                    </p>
                    <div className="mt-4 flex items-center text-sm text-navy-500">
                      <Heart className="mr-2 text-red-400" size={16} />
                      <span>Praying with you</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <HandHeart className="mx-auto text-navy-400 mb-4" size={48} />
              <p className="text-lg text-navy-600 mb-4">No public prayer requests yet</p>
              <p className="text-navy-500">Be the first to share a prayer request with the community</p>
            </div>
          )}

          <div className="text-center">
            <Link href="/prayer/wall">
              <Button className="bg-ocean-500 hover:bg-ocean-600 text-white px-8 py-3 font-semibold">
                View All Prayers
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
