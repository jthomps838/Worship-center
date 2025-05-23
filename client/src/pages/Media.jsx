import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Youtube, Video, Clock } from "lucide-react";

export default function Media() {
  // Mock data for demonstration - in a real app, this would come from an API
  const featuredVideo = {
    title: "Finding Hope in the Storm",
    description: "Discover how God's presence can guide you through the most challenging seasons of life. Learn to trust His plan even when the path seems unclear.",
    publishedDate: "3 days ago",
    duration: "28:45",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
  };

  const videoSeries = [
    {
      title: "Navigating Life's Storms",
      description: "A 6-part series on finding God's peace in difficult times",
      videoCount: 6,
      thumbnail: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
    },
    {
      title: "Anchored in Faith", 
      description: "Building an unshakeable foundation in Christ",
      videoCount: 4,
      thumbnail: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
    },
    {
      title: "Testimonies of Grace",
      description: "Stories of God's faithfulness through trials",
      videoCount: 8,
      thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
    },
  ];

  const recentVideos = [
    {
      title: "When God Seems Silent",
      duration: "22:15",
      publishedDate: "1 week ago",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=169",
    },
    {
      title: "The Power of Community Prayer",
      duration: "31:22",
      publishedDate: "2 weeks ago", 
      thumbnail: "https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=169",
    },
    {
      title: "Trusting God's Timing",
      duration: "25:48",
      publishedDate: "3 weeks ago",
      thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=169",
    },
    {
      title: "Peace in the Storm",
      duration: "27:33",
      publishedDate: "1 month ago",
      thumbnail: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=169",
    },
  ];

  return (
    <div className="min-h-screen bg-navy-50">
      {/* Header */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-ocean-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Video className="text-white" size={24} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Media Library</h1>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto">
            Discover biblical teachings, testimonies, and messages of hope to encourage you on your spiritual journey.
          </p>
        </div>
      </section>

      {/* Featured Video */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">Featured Message</h2>
            <p className="text-lg text-navy-600">Our latest teaching to encourage and strengthen your faith</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-xl">
              <div className="aspect-video bg-navy-800 relative group cursor-pointer">
                <img 
                  src={featuredVideo.thumbnail}
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 group-hover:bg-white/30 transition-colors">
                    <PlayCircle className="text-white" size={64} />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {featuredVideo.duration}
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-navy-900 mb-4">{featuredVideo.title}</h3>
                <p className="text-navy-600 mb-6">{featuredVideo.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-navy-500">Published {featuredVideo.publishedDate}</span>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Youtube className="mr-2 h-4 w-4" />
                    Watch on YouTube
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Video Series */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">Teaching Series</h2>
            <p className="text-lg text-navy-600">Dive deeper into specific topics with our multi-part series</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoSeries.map((series, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="aspect-video relative">
                  <img 
                    src={series.thumbnail}
                    alt={series.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <PlayCircle className="text-white" size={48} />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {series.videoCount} videos
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">{series.title}</h3>
                  <p className="text-navy-600 text-sm">{series.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Videos */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">Recent Messages</h2>
            <p className="text-lg text-navy-600">Catch up on our latest teachings and messages of encouragement</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentVideos.map((video, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
                <div className="aspect-video relative">
                  <img 
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <PlayCircle className="text-white" size={32} />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-1 py-0.5 rounded text-xs flex items-center">
                    <Clock className="mr-1" size={10} />
                    {video.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-navy-900 mb-1 text-sm leading-tight">{video.title}</h3>
                  <p className="text-navy-500 text-xs">{video.publishedDate}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-ocean-50 rounded-2xl p-8 border border-ocean-100">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">Stay Connected</h2>
            <p className="text-lg text-navy-600 mb-6">
              Subscribe to our YouTube channel to never miss a new message and be encouraged regularly in your faith journey.
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
              <Youtube className="mr-2 h-5 w-5" />
              Subscribe on YouTube
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}