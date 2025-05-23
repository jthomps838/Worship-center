'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Play, 
  BookOpen, 
  Music, 
  Video, 
  FileText, 
  Calendar,
  Clock,
  ExternalLink
} from "lucide-react"

export default function Media() {
  const mediaContent = [
    {
      id: 1,
      type: 'video',
      title: 'Finding Peace in the Storm',
      description: 'A powerful message about trusting God during difficult times, based on Mark 4:35-41.',
      duration: '28 min',
      date: '2024-01-15',
      category: 'Sermon',
      featured: true,
      thumbnail: '/api/placeholder/400/225'
    },
    {
      id: 2,
      type: 'audio',
      title: 'Anchored in Hope - Daily Devotional',
      description: 'Start your day with this encouraging devotional about being anchored in Christ.',
      duration: '12 min',
      date: '2024-01-10',
      category: 'Devotional',
      featured: false
    },
    {
      id: 3,
      type: 'article',
      title: 'When Waves Overwhelm: A Biblical Perspective',
      description: 'Exploring how Scripture guides us through overwhelming seasons of life.',
      duration: '8 min read',
      date: '2024-01-08',
      category: 'Article',
      featured: true
    },
    {
      id: 4,
      type: 'video',
      title: 'Testimonies from the Shore',
      description: 'Community members share how God brought them through their storms.',
      duration: '35 min',
      date: '2024-01-05',
      category: 'Testimony',
      featured: false,
      thumbnail: '/api/placeholder/400/225'
    },
    {
      id: 5,
      type: 'audio',
      title: 'Worship in the Storm',
      description: 'Peaceful worship music for meditation and prayer during difficult times.',
      duration: '45 min',
      date: '2024-01-03',
      category: 'Worship',
      featured: false
    },
    {
      id: 6,
      type: 'article',
      title: 'Prayer as Your Anchor',
      description: 'Discovering the power of prayer as a stabilizing force in chaotic times.',
      duration: '6 min read',
      date: '2024-01-01',
      category: 'Teaching',
      featured: false
    }
  ]

  const getMediaIcon = (type) => {
    switch (type) {
      case 'video': return <Video className="w-6 h-6" />
      case 'audio': return <Music className="w-6 h-6" />
      case 'article': return <FileText className="w-6 h-6" />
      default: return <BookOpen className="w-6 h-6" />
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800 border-red-200'
      case 'audio': return 'bg-green-100 text-green-800 border-green-200'
      case 'article': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const featuredContent = mediaContent.filter(item => item.featured)
  const regularContent = mediaContent.filter(item => !item.featured)

  return (
    <div className="min-h-screen bg-navy-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <Play className="w-10 sm:w-12 h-10 sm:h-12 mx-auto text-ocean-500 mb-4" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-700 mb-4 px-4">
            Media Library
          </h1>
          <p className="text-base sm:text-lg text-navy-600 max-w-2xl mx-auto px-4 leading-relaxed">
            Encouraging content to strengthen your faith journey. Find sermons, devotionals, 
            testimonies, and worship resources to help you navigate life's storms.
          </p>
        </div>

        {/* Featured Content */}
        {featuredContent.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-navy-700 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-ocean-500" />
              Featured Content
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredContent.map((item) => (
                <Card key={item.id} className="border-2 border-ocean-200 hover:border-ocean-400 transition-colors shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-ocean-500 to-navy-600 text-white p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1">
                        <CardTitle className="text-lg sm:text-xl mb-2 flex items-center gap-2 leading-tight">
                          {getMediaIcon(item.type)}
                          <span className="break-words">{item.title}</span>
                        </CardTitle>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm opacity-90">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {item.duration}
                          </span>
                        </div>
                      </div>
                      <Badge className="bg-white text-ocean-600 border-white self-start">
                        {item.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {item.thumbnail && (
                      <div className="w-full h-40 bg-navy-100 rounded-lg mb-4 flex items-center justify-center">
                        <Play className="w-12 h-12 text-navy-400" />
                      </div>
                    )}
                    <p className="text-navy-600 mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    <Button className="w-full bg-ocean-500 hover:bg-ocean-600 text-white">
                      <Play className="w-4 h-4 mr-2" />
                      {item.type === 'article' ? 'Read Article' : 'Play Now'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All Content */}
        <section>
          <h2 className="text-2xl font-bold text-navy-700 mb-6 flex items-center gap-2">
            <Video className="w-6 h-6 text-ocean-500" />
            All Media Content
          </h2>
          <div className="grid gap-6">
            {regularContent.map((item) => (
              <Card key={item.id} className="border-2 border-navy-200 hover:border-ocean-400 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="flex-shrink-0 w-full sm:w-auto">
                      <div className="w-full sm:w-20 h-20 bg-gradient-to-br from-ocean-500 to-navy-600 rounded-lg flex items-center justify-center text-white">
                        {getMediaIcon(item.type)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <h3 className="text-lg sm:text-xl font-semibold text-navy-700 leading-tight break-words">
                          {item.title}
                        </h3>
                        <Badge className={`${getTypeColor(item.type)} flex-shrink-0`}>
                          {item.type}
                        </Badge>
                      </div>
                      <p className="text-navy-600 mb-4 leading-relaxed text-sm sm:text-base">
                        {item.description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-navy-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {item.duration}
                          </span>
                          <Badge variant="outline" className="text-ocean-600 border-ocean-300 self-start">
                            {item.category}
                          </Badge>
                        </div>
                        <Button variant="outline" className="border-ocean-500 text-ocean-600 hover:bg-ocean-50 w-full sm:w-auto">
                          <Play className="w-4 h-4 mr-2" />
                          {item.type === 'article' ? 'Read' : 'Play'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-navy-700 mb-6 text-center">
            Browse by Category
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-navy-200 hover:border-ocean-400 transition-colors text-center">
              <CardHeader>
                <Video className="w-12 h-12 mx-auto text-ocean-500 mb-2" />
                <CardTitle className="text-navy-700">Sermons & Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-navy-600 mb-4">
                  Biblical teachings and inspiring messages for spiritual growth.
                </p>
                <Button variant="outline" className="border-ocean-500 text-ocean-600">
                  Browse Sermons
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-navy-200 hover:border-ocean-400 transition-colors text-center">
              <CardHeader>
                <Music className="w-12 h-12 mx-auto text-ocean-500 mb-2" />
                <CardTitle className="text-navy-700">Worship & Devotionals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-navy-600 mb-4">
                  Peaceful worship music and daily devotional content.
                </p>
                <Button variant="outline" className="border-ocean-500 text-ocean-600">
                  Browse Worship
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-navy-200 hover:border-ocean-400 transition-colors text-center">
              <CardHeader>
                <FileText className="w-12 h-12 mx-auto text-ocean-500 mb-2" />
                <CardTitle className="text-navy-700">Articles & Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-navy-600 mb-4">
                  Written resources and biblical insights for deeper study.
                </p>
                <Button variant="outline" className="border-ocean-500 text-ocean-600">
                  Browse Articles
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <div className="bg-gradient-to-r from-ocean-500 to-navy-600 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              Stay Connected with Our Latest Content
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Get notified when we publish new sermons, devotionals, and encouraging resources.
            </p>
            <Button size="lg" className="bg-white text-navy-700 hover:bg-navy-50">
              <ExternalLink className="w-5 h-5 mr-2" />
              Subscribe to Updates
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}