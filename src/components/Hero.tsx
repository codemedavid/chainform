import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Truck, Clock, Beaker, Leaf, Award } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

interface HeroProps {
  onShopAll: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopAll }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { siteSettings } = useSiteSettings();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Use settings or fallbacks if loading/missing
  const badgeText = siteSettings?.hero_badge_text || 'Modern Peptide Science';
  const tagline = siteSettings?.hero_tagline || 'Clarity. Consistency. Care.';
  const description = siteSettings?.hero_description || 'ChainForm delivers high-quality peptides and medical supplies through a system built on scientific precision and thoughtful design.';

  return (
    <div className="relative min-h-[85vh] bg-gradient-to-br from-neutral-50 via-white to-purple-50/30 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top gradient bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-purple-400 to-sage-400" />

        {/* Soft floating orbs */}
        <div className="absolute top-20 right-[10%] w-80 h-80 bg-gradient-to-br from-purple-300/15 to-purple-500/5 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute top-40 left-[5%] w-64 h-64 bg-gradient-to-br from-sage-300/15 to-sage-500/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-20 right-[20%] w-72 h-72 bg-gradient-to-br from-blush-200/15 to-blush-400/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '3s' }} />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#EEF0F6_1px,transparent_1px),linear-gradient(to_bottom,#EEF0F6_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />

        {/* Decorative molecular connection lines */}
        <svg className="absolute top-1/4 left-0 w-full h-20 opacity-10" viewBox="0 0 1200 80" fill="none">
          <path d="M0 40 L200 40 L250 20 L300 60 L350 30 L400 50 L450 40 L1200 40" stroke="url(#chain-gradient)" strokeWidth="2" />
          <defs>
            <linearGradient id="chain-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6F6AD9" stopOpacity="0" />
              <stop offset="50%" stopColor="#6F6AD9" />
              <stop offset="100%" stopColor="#8CBFA8" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 z-10">
        <div className="max-w-5xl mx-auto">

          {/* Content */}
          <div className={`transition-all duration-700 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-purple-100 shadow-soft">
                <Beaker className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-semibold tracking-wide uppercase text-purple-600">
                  {badgeText}
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="text-center mb-10">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 font-space-grotesk">
                <span className="text-purple-500">Connected Science.</span>
                <br />
                <span className="text-theme-text">Clean Solutions.</span>
              </h1>

              <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
            </div>

            {/* Molecular Chain Visual */}
            <div className="flex justify-center mb-10">
              <div className="relative">
                <svg className="w-72 md:w-96 h-14" viewBox="0 0 300 50" fill="none">
                  {/* Chain backbone */}
                  <path
                    d="M20 25 L60 25 L80 25 L100 25 L140 25 L160 25 L200 25 L240 25 L280 25"
                    stroke="url(#chain-line)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Molecular nodes */}
                  <circle cx="40" cy="25" r="6" fill="#6F6AD9" />
                  <circle cx="100" cy="25" r="8" fill="#8CBFA8" />
                  <circle cx="150" cy="25" r="6" fill="#E8A6B8" />
                  <circle cx="200" cy="25" r="8" fill="#6F6AD9" />
                  <circle cx="260" cy="25" r="6" fill="#8CBFA8" />
                  {/* Connecting dots */}
                  <circle cx="70" cy="25" r="3" fill="#B5B3EA" />
                  <circle cx="125" cy="25" r="3" fill="#B8D9C9" />
                  <circle cx="175" cy="25" r="3" fill="#F2C5D2" />
                  <circle cx="230" cy="25" r="3" fill="#B5B3EA" />
                  <defs>
                    <linearGradient id="chain-line" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6F6AD9" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#6F6AD9" />
                      <stop offset="100%" stopColor="#8CBFA8" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Feature Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
              <div className="group flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-brand-lg border border-neutral-100 shadow-card hover:shadow-medium hover:border-purple-200 transition-all duration-300 hover:-translate-y-1">
                <div className="p-2.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-brand text-white shadow-purple group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-theme-text text-sm">Lab Tested</p>
                  <p className="text-xs text-neutral-500">99%+ Purity</p>
                </div>
              </div>

              <div className="group flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-brand-lg border border-neutral-100 shadow-card hover:shadow-medium hover:border-sage-200 transition-all duration-300 hover:-translate-y-1">
                <div className="p-2.5 bg-gradient-to-br from-sage-400 to-sage-500 rounded-brand text-white shadow-sage group-hover:scale-105 transition-transform">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-theme-text text-sm">Clean Formula</p>
                  <p className="text-xs text-neutral-500">Science-Forward</p>
                </div>
              </div>

              <div className="group flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-brand-lg border border-neutral-100 shadow-card hover:shadow-medium hover:border-purple-200 transition-all duration-300 hover:-translate-y-1">
                <div className="p-2.5 bg-gradient-to-br from-purple-400 to-purple-500 rounded-brand text-white shadow-purple group-hover:scale-105 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-theme-text text-sm">Trusted</p>
                  <p className="text-xs text-neutral-500">By Community</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={onShopAll}
                className="group relative px-10 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-brand-lg font-semibold text-lg hover:from-purple-600 hover:to-purple-700 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                style={{
                  boxShadow: '0 10px 30px -4px rgba(111, 106, 217, 0.6), 0 6px 16px -2px rgba(111, 106, 217, 0.4)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-3">
                  Explore Products
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <a
                href="/coa"
                className="px-8 py-4 bg-white text-purple-600 border-2 border-sage-400 rounded-brand-lg font-semibold text-lg hover:bg-sage-50 hover:border-sage-500 hover:-translate-y-1 transition-all duration-300"
                style={{
                  boxShadow: '0 10px 30px -4px rgba(140, 191, 168, 0.55), 0 6px 16px -2px rgba(140, 191, 168, 0.35)'
                }}
              >
                View Lab Reports
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-8 border-t border-neutral-200/60">
              <div className="flex items-center gap-2.5 text-sm font-medium text-neutral-600">
                <div className="p-1.5 bg-sage-100 rounded-brand">
                  <Truck className="w-4 h-4 text-sage-600" />
                </div>
                <span>Fast Shipping</span>
              </div>
              <div className="w-px h-6 bg-gradient-to-b from-transparent via-neutral-300 to-transparent" />
              <div className="flex items-center gap-2.5 text-sm font-medium text-neutral-600">
                <div className="p-1.5 bg-purple-100 rounded-brand">
                  <Clock className="w-4 h-4 text-purple-600" />
                </div>
                <span>24/7 Support</span>
              </div>
              <div className="w-px h-6 bg-gradient-to-b from-transparent via-neutral-300 to-transparent hidden sm:block" />
              <div className="flex items-center gap-2.5 text-sm font-medium text-neutral-600">
                <div className="p-1.5 bg-sage-100 rounded-brand">
                  <ShieldCheck className="w-4 h-4 text-sage-600" />
                </div>
                <span>Secure Checkout</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
