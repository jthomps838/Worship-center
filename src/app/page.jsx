'use client'

import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Heart, Users, BookOpen, Anchor } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-700 via-navy-600 to-ocean-600 text-white py-20 px-4">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Anchor className="w-16 h-16 mx-auto mb-4 wave-animation" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Storm to <span className="text-ocean-400">Shore</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto">
            Finding peace in God's presence through life's storms. 
            A Christ-centered ministry offering prayer, encouragement, and biblical truth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/prayer-submit">
              <Button size="lg" className="bg-ocean-500 hover:bg-ocean-600 text-white px-8 py-3 text-lg">
                Submit Prayer Request
              </Button>
            </Link>
            <Link href="/prayer-wall">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-700 px-8 py-3 text-lg">
                View Prayer Wall
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-700 mb-4">
              Anchored in Faith
            </h2>
            <p className="text-xl text-navy-600 max-w-2xl mx-auto">
              Our ministry provides a safe harbor for those navigating life's challenges, 
              offering prayer support and biblical encouragement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-navy-100 hover:border-ocean-400 transition-colors">
              <CardHeader className="text-center">
                <Heart className="w-12 h-12 mx-auto text-ocean-500 mb-4" />
                <CardTitle className="text-navy-700">Prayer Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-navy-600 text-center">
                  Submit your prayer requests and receive support from our caring community. 
                  Choose to share publicly or keep private.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-navy-100 hover:border-ocean-400 transition-colors">
              <CardHeader className="text-center">
                <Users className="w-12 h-12 mx-auto text-ocean-500 mb-4" />
                <CardTitle className="text-navy-700">Community Care</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-navy-600 text-center">
                  Join a community that prays for one another and shares in both 
                  struggles and victories through Christ.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-navy-100 hover:border-ocean-400 transition-colors">
              <CardHeader className="text-center">
                <BookOpen className="w-12 h-12 mx-auto text-ocean-500 mb-4" />
                <CardTitle className="text-navy-700">Biblical Truth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-navy-600 text-center">
                  Access encouraging media content, devotionals, and biblical teachings 
                  to strengthen your faith journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Scripture Section */}
      <section className="py-20 px-4 bg-navy-50">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-navy-700 mb-6 leading-relaxed">
            "He stilled the storm to a whisper; the waves of the sea were hushed. 
            They were glad when it grew calm, and he guided them to their desired haven."
          </blockquote>
          <cite className="text-xl text-ocean-600 font-semibold">
            — Psalm 107:29-30
          </cite>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-ocean-500 to-navy-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Find Your Shore?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you're facing a storm or celebrating God's goodness, 
            we're here to pray with you and encourage your faith.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/prayer-submit">
              <Button size="lg" className="bg-white text-navy-700 hover:bg-navy-50 px-8 py-3 text-lg">
                Share Your Prayer Request
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-700 px-8 py-3 text-lg">
                Contact Our Ministry
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}