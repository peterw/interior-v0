"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cf } from "@/lib/cf";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Realtor at RE/MAX",
    content: "Sold difficult listing in 2 weeks!",
    rating: 5,
    image: "/images/testimonials/sarah.jpg"
  },
  {
    name: "Michael Chen",
    role: "Century 21 Agent",
    content: "Saved $15,000 on staging costs last month alone. This tool pays for itself!",
    rating: 5,
    image: "/images/testimonials/michael.jpg"
  },
  {
    name: "Jessica Martinez",
    role: "Keller Williams",
    content: "My listings get 3x more views when I use AI staging. Game changer!",
    rating: 5,
    image: "/images/testimonials/jessica.jpg"
  }
];

const beforeAfterExamples = [
  {
    before: "https://images.unsplash.com/photo-1486304873000-235643847519?w=600&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=600&h=400&fit=crop",
    label: "Living Room - Sold in 5 days"
  },
  {
    before: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&h=400&fit=crop", 
    after: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    label: "Kitchen - 45% above asking"
  }
];

export default function RealtorLandingPage() {
  const [currentExample, setCurrentExample] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="h-4 w-4" />
            <span>Trusted by 500+ Realtors</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Listings in Seconds
            <br />
            <span className="text-purple-600">with AI Virtual Staging</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Sell homes 73% faster with professional virtual staging. 
            Save $3,000+ per listing compared to traditional staging.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link href="/interior">
              <Button size="lg" className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto px-8 py-6 text-lg"
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See Instant Demo
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Urgency */}
          <p className="text-sm text-orange-600 font-medium">
            🔥 Limited time: First 10 transformations FREE (worth $300)
          </p>
        </div>

        {/* Social Proof Logos */}
        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-gray-500 mb-4">Trusted by agents from</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <span className="text-xl font-bold text-gray-700">RE/MAX</span>
            <span className="text-xl font-bold text-gray-700">Century 21</span>
            <span className="text-xl font-bold text-gray-700">Keller Williams</span>
            <span className="text-xl font-bold text-gray-700">Coldwell Banker</span>
          </div>
        </div>
      </div>

      {/* ROI Calculator Section */}
      <div className="bg-purple-50 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto border-0 shadow-xl">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                Your ROI with Interior AI
              </h2>
              
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-green-600">$3,000+</div>
                  <p className="text-gray-600 mt-2">Saved per listing</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-purple-600">73%</div>
                  <p className="text-gray-600 mt-2">Faster sales</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-blue-600">3x</div>
                  <p className="text-gray-600 mt-2">More views</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Example:</strong> 5 listings/month × $3,000 saved = 
                  <span className="text-green-600 font-bold"> $15,000 monthly savings</span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Before/After Examples */}
      <div className="py-12 sm:py-16" id="demo">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Real Listing Transformations
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <Badge className="absolute top-4 left-4 z-10 bg-gray-900 text-white">
                    Before
                  </Badge>
                  <img 
                    src={beforeAfterExamples[currentExample].before}
                    alt="Before staging"
                    className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="relative">
                  <Badge className="absolute top-4 left-4 z-10 bg-purple-600 text-white">
                    After AI Staging
                  </Badge>
                  <img 
                    src={beforeAfterExamples[currentExample].after}
                    alt="After staging"
                    className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
              
              <p className="text-center mt-4 font-medium text-gray-700">
                {beforeAfterExamples[currentExample].label}
              </p>
            </div>

            {/* Example Selector */}
            <div className="flex justify-center gap-2 mt-6">
              {beforeAfterExamples.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentExample(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentExample ? 'bg-purple-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Try Demo CTA */}
            <div className="text-center mt-8">
              <Link href="/interior">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                  Try With Your Listing Photos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm text-gray-500 mt-2">No credit card required</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            How It Works
          </h2>

          <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Upload Photos</h3>
              <p className="text-gray-600">
                Take photos with your phone or camera. No special equipment needed.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Choose Style</h3>
              <p className="text-gray-600">
                Select from buyer-focused designs that sell homes faster.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Download & List</h3>
              <p className="text-gray-600">
                Get MLS-ready images in seconds. Upload directly to listings.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <span>Average time: Under 2 minutes per room</span>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            What Realtors Are Saying
          </h2>

          <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="border-0 shadow-lg">
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-purple-600 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Transform Your Listings?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join 500+ realtors already using Interior AI to sell homes faster
          </p>
          
          <Link href="/interior">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>10 free transformations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}