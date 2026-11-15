import type { Metadata } from 'next';
import './globals.css';
import BreakingTicker from '@/components/layout/BreakingTicker';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'RAP IVOIRE — Le Média Digital de la Culture Urbaine Ivoirienne',
  description: 'Le média de référence du rap ivoirien, de la trap nouchi, de la drill abidjanaise et de la culture hip-hop en Côte d’Ivoire. Actualités, interviews, clips et sorties.',
  keywords: ['Rap Ivoire', 'Côte d’Ivoire', 'Abidjan', 'Hip-Hop', 'Trap Nouchi', 'Drill Ivoire', 'Didi B', 'Himra', 'Suspect 95', 'Team Paiya'],
  icons: {
    icon: '/images/logo-rap-ivoire.jpg',
    apple: '/images/logo-rap-ivoire.jpg',
  },
  openGraph: {
    title: 'RAP IVOIRE — Le Média Digital de la Culture Urbaine Ivoirienne',
    description: 'Le média de référence du rap ivoirien. Actualités, exclusivités, artistes et clips.',
    url: 'https://rapivoire.ci',
    siteName: 'RAP IVOIRE',
    images: [
      {
        url: '/images/logo-rap-ivoire.jpg',
        width: 1000,
        height: 1000,
        alt: 'RAP IVOIRE Logo',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans antialiased selection:bg-brand-blue selection:text-white">
        <BreakingTicker />
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
