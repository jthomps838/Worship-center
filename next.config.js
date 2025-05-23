/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react']
  },
  images: {
    domains: ['images.unsplash.com']
  }
}

module.exports = nextConfig