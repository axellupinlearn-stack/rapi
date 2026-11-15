'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, Disc3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import BrandLogo from '@/components/ui/BrandLogo';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'Actualités', href: '/actualites' },
    { label: 'Artistes', href: '/artistes' },
    { label: 'Vidéos & Clips', href: '/videos' },
    { label: 'Culture & Nouchi', href: '/culture' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm'
          : 'bg-white/85 backdrop-blur-md border-b border-slate-200/60'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand with Official Identity */}
          <Link href="/" className="inline-block">
            <BrandLogo size="md" variant="blue" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-xl text-xs lg:text-sm font-bold tracking-wide transition-all duration-200',
                    active
                      ? 'text-brand-blue bg-blue-50/90 border border-blue-200/80 shadow-xs'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/80'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action: Search & Quick Access */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <Link
              href="/recherche"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/70 border border-slate-200/80 transition-all text-xs font-semibold"
              title="Rechercher"
            >
              <Search className="w-4 h-4 text-brand-blue" />
              <span className="hidden sm:inline">Recherche</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-black transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between transition-colors',
                    active
                      ? 'bg-blue-50 text-brand-blue border border-blue-200'
                      : 'text-slate-800 hover:bg-slate-50'
                  )}
                >
                  <span>{link.label}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-brand-blue"></span>}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-slate-200">
            <Link
              href="/recherche"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-100 text-slate-800 font-medium text-sm hover:bg-slate-200 transition-colors border border-slate-200"
            >
              <Search className="w-4 h-4 text-brand-blue" />
              <span>Rechercher un article, un rappeur, un son...</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
