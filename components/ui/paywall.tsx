"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Sparkles, 
  Zap, 
  Crown, 
  Star, 
  CheckCircle,
  TrendingUp,
  Users,
  Award,
  Rocket,
  Heart,
  Calendar,
  Brain,
  Shield,
  ArrowRight,
  Infinity,
  Flame
} from "lucide-react";

export type PaywallStyle = "duolingo" | "flo" | "cal" | "default";

interface PaywallProps {
  title: string;
  description: string;
  loomEmbedUrl?: string;
  ctaText: string;
  secondaryText?: string;
  onCtaClick: () => void;
  onClose?: () => void;
  onSecondaryClick?: () => void;
  style?: PaywallStyle;
}

// Duolingo Style Component
const DuolingoPaywall = ({ title, description, ctaText, secondaryText, onCtaClick, onClose, onSecondaryClick }: PaywallProps) => {
  const [hearts, setHearts] = useState(0);
  
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative max-w-sm w-full"
    >
      <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden">
        {/* Header with Duo mascot style */}
        <div className="bg-gradient-to-b from-green-50 to-white px-6 pt-8 pb-4 text-center relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
          
          {/* Animated mascot circle */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity as any, ease: "easeInOut" }}
            className="relative mx-auto w-24 h-24 mb-4"
          >
            <div className="absolute inset-0 bg-green-500 rounded-full" />
            <div className="absolute inset-2 bg-green-400 rounded-full" />
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity as any }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Crown className="w-12 h-12 text-white" />
            </motion.div>
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {title || "You're out of hearts!"}
          </h2>
          <p className="text-gray-600 text-sm">
            {description || "Get Super to have unlimited hearts and learn without limits"}
          </p>
        </div>

        {/* Heart system */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex justify-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Heart
                  className={`w-8 h-8 ${i < hearts ? 'text-red-500 fill-red-500' : 'text-gray-300'}`}
                />
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">Refill in 3:47</p>
        </div>

        {/* Features */}
        <div className="px-6 py-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Infinity className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">Unlimited Hearts</p>
              <p className="text-xs text-gray-600">Never wait to practice</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">No Ads</p>
              <p className="text-xs text-gray-600">Focus on learning</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Flame className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">Streak Repair</p>
              <p className="text-xs text-gray-600">Monthly streak freeze</p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="px-6 pb-6 space-y-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCtaClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl shadow-lg"
          >
            {ctaText || "Try Super for free"}
          </motion.button>
          {secondaryText && (
            <button
              onClick={onSecondaryClick}
              className="w-full text-gray-500 text-sm py-2"
            >
              {secondaryText}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Flo Style Component
const FloPaywall = ({ title, description, ctaText, secondaryText, onCtaClick, onClose, onSecondaryClick }: PaywallProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative max-w-md w-full"
    >
      <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden">
        {/* Gradient header */}
        <div className="relative h-48 bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-white/80 hover:text-white bg-white/20 backdrop-blur rounded-full p-2"
            >
              <X size={18} />
            </button>
          )}
          
          {/* Floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity as any }}
              className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl"
            />
            <motion.div
              animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
              transition={{ duration: 8, repeat: Infinity as any }}
              className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"
            />
          </div>
          
          <div className="relative z-10 flex items-center justify-center h-full">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity as any }}
              className="w-24 h-24 bg-white/30 backdrop-blur rounded-full flex items-center justify-center"
            >
              <Heart className="w-12 h-12 text-white" />
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
            {title || "Track your cycle with precision"}
          </h2>
          <p className="text-gray-600 text-center text-sm mb-6">
            {description || "Get personalized insights and predictions tailored to your body"}
          </p>

          {/* Features with soft icons */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Cycle predictions</p>
                <p className="text-xs text-gray-500">AI-powered accuracy</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Health insights</p>
                <p className="text-xs text-gray-500">Personalized to you</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Private & secure</p>
                <p className="text-xs text-gray-500">Your data stays yours</p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCtaClick}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-4 rounded-2xl mb-3"
          >
            {ctaText || "Start free trial"}
          </motion.button>
          {secondaryText && (
            <button
              onClick={onSecondaryClick}
              className="w-full text-gray-500 text-sm"
            >
              {secondaryText}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Cal AI Style Component
const CalPaywall = ({ title, description, ctaText, secondaryText, onCtaClick, onClose, onSecondaryClick }: PaywallProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative max-w-md w-full"
    >
      <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
        {/* Minimal header */}
        <div className="px-8 pt-8 pb-6 relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-300"
            >
              <X size={18} />
            </button>
          )}
          
          {/* AI icon */}
          <div className="mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-2">
            {title || "Upgrade to Cal AI Pro"}
          </h2>
          <p className="text-gray-400 text-sm">
            {description || "Let AI handle your scheduling while you focus on what matters"}
          </p>
        </div>

        {/* Features with minimal design */}
        <div className="px-8 pb-6">
          <div className="space-y-3">
            {[
              { text: "AI-powered scheduling", subtext: "Smart conflict resolution" },
              { text: "Natural language processing", subtext: "Just type what you need" },
              { text: "Team availability optimization", subtext: "Find the perfect time" },
              { text: "Automated follow-ups", subtext: "Never miss a meeting" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 py-3 border-b border-gray-800 last:border-0"
              >
                <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{feature.text}</p>
                  <p className="text-gray-500 text-xs">{feature.subtext}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="px-8 pb-8 space-y-3">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onCtaClick}
            className="w-full bg-white text-gray-900 font-medium py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
          >
            {ctaText || "Start 14-day free trial"}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          {secondaryText && (
            <button
              onClick={onSecondaryClick}
              className="w-full text-gray-500 text-sm hover:text-gray-400 transition-colors"
            >
              {secondaryText}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export function Paywall({
  title,
  description,
  loomEmbedUrl,
  ctaText,
  secondaryText = "Not Now",
  onCtaClick,
  onClose,
  onSecondaryClick,
  style = "duolingo"
}: PaywallProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleSecondaryClick = () => {
    if (onSecondaryClick) onSecondaryClick();
    else handleClose();
  };

  if (!isOpen) return null;

  const paywallProps = {
    title,
    description,
    loomEmbedUrl,
    ctaText,
    secondaryText,
    onCtaClick,
    onClose: handleClose,
    onSecondaryClick: handleSecondaryClick,
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
          style === 'cal' ? 'bg-black/80 backdrop-blur-sm' : 'bg-black/50 backdrop-blur-md'
        }`}
      >
        {style === "duolingo" && <DuolingoPaywall {...paywallProps} />}
        {style === "flo" && <FloPaywall {...paywallProps} />}
        {style === "cal" && <CalPaywall {...paywallProps} />}
        {style === "default" && <DuolingoPaywall {...paywallProps} />}
      </motion.div>
    </AnimatePresence>
  );
} 