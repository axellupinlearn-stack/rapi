'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Image as ImageIcon,
  Users,
  Video,
  MessageSquare,
  Globe,
  LogOut,
  Menu,
  X,
  Lock
} from 'lucide-react';
import { User, UserRole } from '@/lib/types';
import { getAuthenticatedUser, logout } from '@/lib/auth';
import { cn } from '@/lib/utils';
import BrandLogo from '@/components/ui/BrandLogo';

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === '/studio/login';

  useEffect(() => {
    if (isLoginPage) return;

    let active = true;
    const checkSession = async () => {
      try {
        const currentUser = await getAuthenticatedUser();
        if (!active) return;
        if (!currentUser) {
          setUser(null);
          setIsAuth(false);
          router.replace('/studio/login');
          return;
        }
        setUser(currentUser);
        setIsAuth(true);
      } catch {
        if (!active) return;
        setUser(null);
        setIsAuth(false);
        router.replace('/studio/login');
      }
    };

    void checkSession();
    return () => {
      active = false;
    };
  }, [pathname, isLoginPage, router]);

  // If on login page, just render children without sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // If checking authentication, show quick secure spinner
  if (isAuth === null || !isAuth || !user) {
    return (
      <div className="min-h-screen bg-[#06090F] flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Vérification des accréditations Studio...
          </p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/studio/login');
    } catch {
      window.alert('La déconnexion a échoué. Réessayez.');
    }
  };

  const menuItems = [
    { label: 'Tableau de bord', href: '/studio', icon: LayoutDashboard },
    { label: 'Articles & Publications', href: '/studio/articles', icon: FileText },
    { label: 'Rédiger un article', href: '/studio/articles/nouveau', icon: PlusCircle, highlight: true },
    { label: 'Médiathèque (Photos/Vidéos)', href: '/studio/medias', icon: ImageIcon },
    { label: 'Gestion des Artistes', href: '/studio/artistes', icon: Users, adminOnly: true },
    { label: 'Clips & Vidéos', href: '/studio/videos', icon: Video, adminOnly: true },
    { label: 'Modération Commentaires', href: '/studio/commentaires', icon: MessageSquare, adminOnly: true },
  ];

  const roleLabels: Record<UserRole, { label: string; badgeClass: string }> = {
    admin: { label: 'Propriétaire / Admin', badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    editor: { label: 'Rédacteur Senior', badgeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    contributor: { label: 'Contributeur', badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  };

  return (
    <div className="min-h-screen bg-[#06090F] text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top bar */}
      <div className="md:hidden bg-[#0A0E1A] border-b border-brand-dark-border px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <Link href="/studio" className="flex items-center gap-2">
          <BrandLogo size="sm" showTagline={false} />
          <span className="text-[10px] uppercase font-black bg-brand-blue px-2 py-0.5 rounded text-white ml-2">
            STUDIO
          </span>
        </Link>

        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300"
        >
          {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'w-full md:w-64 bg-[#0A0E1A] border-r border-brand-dark-border/80 flex flex-col justify-between shrink-0 transition-all duration-300 z-40',
          'md:sticky md:top-0 md:h-screen',
          mobileNavOpen ? 'block' : 'hidden md:flex'
        )}
      >
        <div className="p-5 space-y-6">
          {/* Logo Brand with Owner Badge */}
          <div className="pb-4 border-b border-slate-800 space-y-2">
            <Link href="/" className="block">
              <BrandLogo size="sm" showTagline={false} />
            </Link>
            <div className="flex items-center gap-1.5 text-[10px] text-brand-cyan font-bold uppercase tracking-wider bg-brand-blue/15 px-2.5 py-1 rounded-lg border border-brand-cyan/20">
              <Lock className="w-3 h-3" />
              <span>Espace Propriétaire Privé</span>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="bg-[#06090F] border border-slate-800/80 p-3.5 rounded-2xl space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-brand-blue shrink-0">
                <Image src={user.avatar} alt={user.name} fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">{user.name}</p>
                <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-bold uppercase border ${roleLabels[user.role].badgeClass}`}>
                  {roleLabels[user.role].label}
                </span>
              </div>
            </div>

          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              if (item.adminOnly && user.role !== 'admin') return null;

              const Icon = item.icon;
              const active =
                item.href === '/studio'
                  ? pathname === '/studio'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={cn(
                    'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all',
                    item.highlight && !active
                      ? 'bg-brand-blue/15 text-brand-cyan border border-brand-cyan/30 hover:bg-brand-blue/25'
                      : active
                      ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn('w-4 h-4', active ? 'text-white' : 'text-slate-400')} />
                    <span>{item.label}</span>
                  </div>
                  {item.highlight && !active && (
                    <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Sidebar with Logout & Back to site */}
        <div className="p-5 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-colors border border-slate-800"
          >
            <Globe className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Voir le site public</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-rose-400 hover:bg-rose-950/40 text-xs font-bold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Studio Viewport */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
