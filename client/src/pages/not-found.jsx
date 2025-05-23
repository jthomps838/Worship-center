import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <div className="w-20 h-20 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold text-ocean-600">404</span>
          </div>
          <h1 className="text-3xl font-bold text-navy-900 mb-4">Page Not Found</h1>
          <p className="text-lg text-navy-600 mb-8">
            The page you're looking for doesn't exist. Perhaps it was moved or you entered the wrong URL.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full bg-ocean-500 hover:bg-ocean-600 text-white">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="w-full border-navy-300 text-navy-700 hover:bg-navy-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}