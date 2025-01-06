'use client';

import { useState, useEffect } from 'react';
import { Map, Info, User, BarChart } from 'lucide-react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const Header = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Scroll vers le bas
      } else {
        setIsVisible(true); // Scroll vers le haut
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const pathname = usePathname();

  return (
    <header
      className={`fixed top-0 left-0 right-0 bg-white z-50 transition-transform duration-300 shadow-sm ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center md:justify-between justify-center">
        <div className="flex items-center">
          <Image
            src="/images/logo-molluscan.png"
            alt="Logo"
            width={120}
            height={40}
            className="w-auto h-10 hover:cursor-pointer"
            onClick={() => router.push('/')}
            loading="eager"
          />
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="/" 
            className={cn(
              'flex items-center gap-2 hover:text-gray-600',
              pathname === '/' ? 'text-blue-500' : ''
            )}
          >
            <Map className="h-4 w-4" />
            <span>Carte</span>
          </Link>
          <Link 
            href="/a-propos" 
            className={cn(
              'flex items-center gap-2 hover:text-gray-600',
              pathname === '/a-propos' ? 'text-blue-500' : ''
            )}
          >
            <Info className="h-4 w-4" />
            <span>À propos</span>
          </Link>
          <Link 
            href="/statistiques" 
            className={cn(
              'flex items-center gap-2 hover:text-gray-600',
              pathname === '/statistiques' ? 'text-blue-500' : ''
            )}
          >
            <BarChart className="h-4 w-4" />
            <span>Statistiques</span>
          </Link>
          <Link 
            href="/profile" 
            className={cn(
              'flex items-center gap-2 hover:text-gray-600',
              pathname === '/profile' ? 'text-blue-500' : ''
            )}
          >
            <User className="h-4 w-4" />
            <span>Profil</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};
