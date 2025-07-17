"use client";

import { Shield, Lock, CreditCard, Award, Zap, HeadphonesIcon } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "100% Secure",
    description: "Your photos are encrypted and never shared",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "We delete your images after processing",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: CreditCard,
    title: "No Hidden Fees",
    description: "Transparent pricing, cancel anytime",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Award,
    title: "Industry Leading",
    description: "Rated #1 by Design Weekly 2024",
    color: "from-yellow-500 to-orange-600",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get your transformation in 30 seconds",
    color: "from-indigo-500 to-purple-600",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Expert help whenever you need it",
    color: "from-red-500 to-pink-600",
  },
];

export function TrustBadges() {
  return (
    <div className="border-t pt-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="group text-center space-y-3 hover:-translate-y-1 transition-transform duration-300"
          >
            {/* Icon */}
            <div className="inline-flex items-center justify-center">
              <div className={`
                relative w-16 h-16 rounded-2xl bg-gradient-to-br ${badge.color} 
                group-hover:scale-110 transition-transform duration-300 shadow-lg
              `}>
                <div className="absolute inset-0 rounded-2xl bg-white/20" />
                <div className="relative flex items-center justify-center h-full">
                  <badge.icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            
            {/* Text */}
            <div>
              <h3 className="font-semibold text-gray-900">{badge.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Security Certifications */}
      <div className="mt-12 pt-8 border-t text-center">
        <p className="text-sm text-gray-500 mb-4">Trusted by leading brands and secured with</p>
        <div className="flex items-center justify-center gap-8 opacity-60">
          {/* Add actual certification logos here */}
          <div className="text-xs text-gray-400">SSL Secured</div>
          <div className="text-xs text-gray-400">GDPR Compliant</div>
          <div className="text-xs text-gray-400">SOC 2 Type II</div>
          <div className="text-xs text-gray-400">ISO 27001</div>
        </div>
      </div>
    </div>
  );
}