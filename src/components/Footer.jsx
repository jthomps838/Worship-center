import { Link } from "wouter";
import { Anchor, Facebook, Youtube, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-ocean-500 rounded-full flex items-center justify-center">
                <Anchor className="text-white text-lg" size={20} />
              </div>
              <span className="text-xl font-semibold">Storm to Shore</span>
            </div>
            <p className="text-navy-300 mb-6 max-w-md">
              A Christ-centered ministry helping people navigate life's storms and find peace in God's presence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-navy-300 hover:text-ocean-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-navy-300 hover:text-ocean-400 transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-navy-300 hover:text-ocean-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-navy-300 hover:text-ocean-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/prayer/wall" className="text-navy-300 hover:text-ocean-400 transition-colors">
                  Prayer Wall
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-navy-300 hover:text-ocean-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-navy-300 hover:text-ocean-400 transition-colors">
                  Media
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-navy-300 hover:text-ocean-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="text-ocean-400" size={16} />
                <span className="text-navy-300">hello@stormtoshore.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-ocean-400" size={16} />
                <span className="text-navy-300">(555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-800 mt-8 pt-8 text-center">
          <p className="text-navy-400">&copy; 2024 Storm to Shore Ministry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
