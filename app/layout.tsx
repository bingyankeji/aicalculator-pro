import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";

export const metadata: Metadata = {
  title: {
    default: "Calculator Online - Free Online Calculator Tools (250+ Calculators)",
    template: "%s | AICalculator.pro"
  },
  description: "Best free online calculator tools with AI-powered analysis. Access 250+ calculators online including tax, mortgage, loan, BMI, age, percentage, and more. Instant results with detailed explanations.",
  keywords: ["calculator online", "online calculator", "free online calculator", "calculator tools", "AI calculator", "tax calculator", "mortgage calculator", "loan calculator", "BMI calculator", "percentage calculator"],
  authors: [{ name: "AICalculator.pro Team" }],
  creator: "AICalculator.pro",
  publisher: "AICalculator.pro",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aicalculator.pro'),
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aicalculator.pro",
    title: "Calculator Online - Best Free Online Calculator (250+ Tools)",
    description: "The best online calculator with 250+ free tools. Tax, mortgage, loan, BMI, age, percentage calculators and more. More powerful than Google calculator.",
    siteName: "AICalculator.pro",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AICalculator.pro - Free Online Calculator Tools"
      }
    ]
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Calculator Online - 250+ Free Online Calculators",
    description: "Best online calculator tools: tax, mortgage, loan, BMI, age, percentage & more. Better than Google calculator with AI analysis.",
    images: ["/og-image.png"],
    site: "@AICalculatorPro",
  },
  
  // Icons
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  
  // PWA Manifest
  manifest: "/manifest.json",
  
  // Verification (需要在Google Search Console中获取真实验证码)
  verification: {
    google: "google-site-verification-code-here",
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AICalculator.pro - Online Calculator",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://aicalculator.pro",
    "description": "Best free online calculator with 250+ tools including tax, mortgage, loan, BMI, age, percentage calculators and more. AI-powered analysis and instant results.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "250+ Online Calculators",
      "AI-Powered Analysis", 
      "Tax & Financial Calculators",
      "Health & Fitness Calculators",
      "Math & Scientific Calculators",
      "Mobile Responsive Design",
      "Instant Results with Charts",
      "Step-by-Step Explanations"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* DNS Prefetch for Performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Google Fonts Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload Critical Resources */}
        <link rel="preload" href="/favicon.ico" as="image" type="image/x-icon" />
        
        {/* Theme Color for Mobile Browsers */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AICalculator.pro" />
        
        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=G-TM7N7SS3H6`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TM7N7SS3H6', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="antialiased font-sans">
        <Analytics />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1" id="main-content" role="main">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

