import { useState } from 'react';
import { Search, Bell, ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router';

interface PortalHeaderProps {
  onSearchChange?: (value: string) => void;
}

export function PortalHeader({ onSearchChange }: PortalHeaderProps) {
  return (
    <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between gap-4 px-4 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="bg-accent rounded-lg p-2">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold hidden md:inline">SignagePro</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search signs by name or code..."
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white/20 transition-all"
            />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

          <Link to="/checkout" className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute top-0 right-0 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </Link>

          <button className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
