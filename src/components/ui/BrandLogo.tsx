import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  variant?: 'blue' | 'white' | 'dark';
}

export default function BrandLogo({
  className,
  size = 'md',
  showTagline = true,
  variant = 'blue',
}: BrandLogoProps) {
  const sizeMap = {
    sm: { height: 36, width: 52, tagline: 'text-[9px]' },
    md: { height: 46, width: 68, tagline: 'text-[10px]' },
    lg: { height: 58, width: 84, tagline: 'text-[11px]' },
    xl: { height: 76, width: 110, tagline: 'text-xs' },
  };

  const config = sizeMap[size];

  const logoSrc =
    variant === 'blue'
      ? '/images/logo-rap-ivoire-blue.png'
      : variant === 'dark'
      ? '/images/logo-rap-ivoire-dark.png'
      : '/images/logo-rap-ivoire-transparent.png';

  const isLight = variant === 'blue' || variant === 'dark';

  return (
    <div className={cn('flex items-center gap-3.5 select-none group', className)}>
      {/* Official Transparent Vector-Extracted Logo */}
      <div className="relative shrink-0 flex items-center justify-center">
        {/* Ambient glow on hover */}
        <div
          className={cn(
            'absolute -inset-2 rounded-2xl blur-md opacity-20 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none',
            isLight
              ? 'bg-gradient-to-r from-blue-400/30 via-brand-blue/30 to-indigo-500/30'
              : 'bg-gradient-to-r from-brand-blue/30 via-brand-cyan/40 to-blue-500/30'
          )}
        />

        <div
          className="relative transition-transform duration-300 group-hover:scale-105"
          style={{ width: config.width, height: config.height }}
        >
          <Image
            src={logoSrc}
            alt="RAP IVOIRE Logo Officiel"
            fill
            className={cn(
              'object-contain',
              isLight
                ? 'drop-shadow-[0_2px_8px_rgba(0,98,255,0.25)]'
                : 'drop-shadow-[0_2px_12px_rgba(0,229,255,0.45)]'
            )}
            priority
          />
        </div>
      </div>

      {/* Elegant Brand Tagline / Baseline */}
      {showTagline && (
        <div
          className={cn(
            'hidden sm:flex flex-col justify-center pl-2.5 border-l leading-tight transition-colors',
            isLight ? 'border-slate-200' : 'border-white/15'
          )}
        >
          <span
            className={cn(
              'font-editorial text-sm font-black tracking-tight transition-colors',
              isLight
                ? 'text-slate-900 group-hover:text-brand-blue'
                : 'text-white group-hover:text-brand-cyan'
            )}
          >
            RAP IVOIRE
          </span>
          <span
            className={cn(
              'font-bold tracking-[0.2em] uppercase mt-0.5',
              isLight ? 'text-brand-blue' : 'text-brand-cyan',
              config.tagline
            )}
          >
            MÉDIA CULTURE URBAINE
          </span>
        </div>
      )}
    </div>
  );
}
