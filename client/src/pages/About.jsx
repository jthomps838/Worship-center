import { Card, CardContent } from "@/components/ui/card";
import { Heart, Anchor, Scroll, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-navy-50">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-ocean-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Anchor className="text-white" size={24} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">About Storm to Shore</h1>
          <p className="text-xl text-navy-600 leading-relaxed">
            A Christ-centered ministry dedicated to helping people navigate life's storms 
            and find the peace, hope, and healing that can only be found in Jesus Christ.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">Our Story</h2>
                <div className="w-12 h-1 bg-ocean-500 mx-auto"></div>
              </div>
              
              <div className="prose prose-lg max-w-none text-navy-700 space-y-6">
                <p className="text-lg leading-relaxed">
                  Storm to Shore was born from a deep understanding of life's inevitable storms. 
                  Just as Jesus called His disciples to follow Him across turbulent waters, 
                  we believe that every storm in our lives is an opportunity to draw closer to Christ 
                  and discover His unfailing love and faithfulness.
                </p>
                
                <p className="leading-relaxed">
                  Our founder experienced firsthand how God's grace can transform the darkest seasons 
                  into testimonies of hope. Through personal struggles with loss, uncertainty, and doubt, 
                  the Lord revealed His character as our anchor in the storm and our safe harbor when 
                  the waves seem overwhelming.
                </p>
                
                <p className="leading-relaxed">
                  We understand that life's challenges can feel isolating, but Scripture reminds us 
                  that we are not meant to walk this journey alone. Storm to Shore exists to provide 
                  a community where people can share their burdens, receive prayer support, and 
                  discover the peace that surpasses all understanding.
                </p>
                
                <blockquote className="border-l-4 border-ocean-500 pl-6 py-4 bg-ocean-50 rounded-r-lg italic text-navy-800">
                  "And he arose and rebuked the wind and said to the sea, 'Peace! Be still!' 
                  And the wind ceased, and there was a great calm." - Mark 4:39
                </blockquote>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">Our Mission & Values</h2>
            <p className="text-lg text-navy-600 max-w-3xl mx-auto">
              Guided by biblical principles and driven by Christ's love, we serve as a beacon 
              of hope for those seeking God's peace in life's storms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Faith */}
            <Card className="text-center p-6 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-ocean-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scroll className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-navy-800 mb-3">Faith</h3>
                <p className="text-navy-600 text-sm">
                  Anchored in God's Word and trusting in His promises for every season of life.
                </p>
              </CardContent>
            </Card>

            {/* Hope */}
            <Card className="text-center p-6 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Anchor className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-navy-800 mb-3">Hope</h3>
                <p className="text-navy-600 text-sm">
                  Offering hope that is found only in Christ, our sure and steadfast anchor.
                </p>
              </CardContent>
            </Card>

            {/* Love */}
            <Card className="text-center p-6 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-navy-800 mb-3">Love</h3>
                <p className="text-navy-600 text-sm">
                  Demonstrating Christ's unconditional love through compassion and service.
                </p>
              </CardContent>
            </Card>

            {/* Community */}
            <Card className="text-center p-6 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-navy-800 mb-3">Community</h3>
                <p className="text-navy-600 text-sm">
                  Building authentic relationships where people can find support and encouragement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-ocean-50 border-ocean-100">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-6">Our Vision</h2>
              <p className="text-lg text-navy-700 leading-relaxed mb-6">
                We envision a world where no one has to weather life's storms alone. 
                Through the power of prayer, biblical encouragement, and authentic community, 
                we believe every person can find their way from the storm to the shore—
                from chaos to peace, from despair to hope, from isolation to belonging.
              </p>
              <p className="text-navy-600 italic">
                "He made the storm be still, and the waves of the sea were hushed. 
                Then they were glad that the waters were quiet, and he brought them to their desired haven." 
                - Psalm 107:29-30
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-6">Join Our Community</h2>
          <p className="text-lg text-navy-600 mb-8">
            Whether you're in the midst of a storm or walking in a season of calm, 
            we invite you to be part of our community. Together, we can support one another 
            and point each other to the hope found in Christ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/prayer/submit" 
              className="inline-flex items-center justify-center px-6 py-3 bg-ocean-500 hover:bg-ocean-600 text-white font-medium rounded-lg transition-colors"
            >
              Submit a Prayer Request
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 border border-navy-300 text-navy-700 hover:bg-navy-50 font-medium rounded-lg transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}