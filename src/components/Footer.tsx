import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Twitter, Instagram, Github, Mail, ArrowRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <span className="text-xl font-bold tracking-tight text-slate-900">AI Travel <span className="text-brand-600">Planner</span></span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              The next generation of travel planning. Powered by AI to create personalized, budget-conscious journeys for every traveler.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-brand-600 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-brand-600 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-brand-600 transition-all">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link to="/explore" className="hover:text-brand-600 transition-colors">Explore Destinations</Link></li>
              <li><Link to="/plan" className="hover:text-brand-600 transition-colors">AI Trip Planner</Link></li>
              <li><Link to="/dashboard" className="hover:text-brand-600 transition-colors">My Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-brand-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Safety Information</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Newsletter</h4>
            <p className="text-slate-500 text-sm mb-6">Get travel inspiration and AI tips delivered to your inbox.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-all">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs">© 2026 Ai Travel Planner. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-xs text-slate-400">
            <a href="#" className="hover:text-slate-600">English (US)</a>
            <a href="#" className="hover:text-slate-600">INR</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
