"use client";

import { useEffect, useState } from "react";
import { Users, Image as ImageIcon, Star, TrendingUp } from "lucide-react";

interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  icon: any;
  color: string;
}

const stats: Stat[] = [
  {
    id: "users",
    label: "Happy Homeowners",
    value: 127000,
    suffix: "+",
    icon: Users,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "rooms",
    label: "Rooms Transformed",
    value: 2400000,
    suffix: "+",
    icon: ImageIcon,
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "rating",
    label: "Average Rating",
    value: 4.9,
    suffix: "/5",
    icon: Star,
    color: "from-yellow-500 to-orange-600",
  },
  {
    id: "growth",
    label: "Monthly Growth",
    value: 47,
    suffix: "%",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-600",
  },
];

export function SocialProof() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    // Animate counters
    stats.forEach((stat) => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setCounts((prev) => ({ ...prev, [stat.id]: current }));
      }, duration / steps);
      
      timers.push(timer);
    });
    
    // Cleanup function to clear all timers
    return () => {
      timers.forEach(timer => clearInterval(timer));
    };
  }, []);

  const formatNumber = (num: number, decimals: number = 0): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    } else {
      return num.toFixed(decimals);
    }
  };

  return (
    <div className="relative">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Join Thousands Who've Already{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Transformed Their Spaces
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Real homeowners, real transformations. #1 AI interior design tool.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 rounded-2xl`} />
            
            {/* Icon */}
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            
            {/* Counter */}
            <div className="relative">
              <p className="text-3xl font-bold text-gray-900 tabular-nums">
                {stat.id === "rating" 
                  ? formatNumber(counts[stat.id] || 0, 1)
                  : formatNumber(counts[stat.id] || 0)
                }
                <span className="text-xl text-gray-500">{stat.suffix}</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            name: "Sarah Mitchell",
            role: "Interior Designer",
            image: "/images/testimonials/sarah.jpg",
            content: "This tool has revolutionized my workflow. What used to take hours now takes minutes. My clients love the instant visualizations!",
            rating: 5,
          },
          {
            name: "David Chen",
            role: "Real Estate Agent",
            image: "/images/testimonials/david.jpg",
            content: "Game changer for staging homes virtually. I've increased my listing views by 60% using these AI transformations.",
            rating: 5,
          },
          {
            name: "Emily Rodriguez",
            role: "Homeowner",
            image: "/images/testimonials/emily.jpg",
            content: "Finally found the confidence to redecorate! Being able to see different styles before committing saved me thousands.",
            rating: 5,
          },
        ].map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            {/* Content */}
            <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
            
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300" />
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}