import { Inter, Poppins, Roboto, Open_Sans, Lato, Montserrat, Raleway, Nunito, Work_Sans, Source_Sans_Pro, Playfair_Display, Merriweather, Crimson_Text, Cormorant_Garamond } from 'next/font/google';

// Modern Sans-Serif Fonts
export const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const poppins = Poppins({ 
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const roboto = Roboto({ 
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

export const openSans = Open_Sans({ 
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const lato = Lato({ 
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['300', '400', '700'],
  display: 'swap',
});

export const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const raleway = Raleway({ 
  subsets: ['latin'],
  variable: '--font-raleway',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const nunito = Nunito({ 
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const workSans = Work_Sans({ 
  subsets: ['latin'],
  variable: '--font-work-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const sourceSansPro = Source_Sans_Pro({ 
  subsets: ['latin'],
  variable: '--font-source-sans-pro',
  weight: ['300', '400', '600', '700'],
  display: 'swap',
});

// Elegant Serif Fonts
export const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair-display',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const merriweather = Merriweather({ 
  subsets: ['latin'],
  variable: '--font-merriweather',
  weight: ['300', '400', '700'],
  display: 'swap',
});

export const crimsonText = Crimson_Text({ 
  subsets: ['latin'],
  variable: '--font-crimson-text',
  weight: ['400', '600'],
  display: 'swap',
});

export const cormorantGaramond = Cormorant_Garamond({ 
  subsets: ['latin'],
  variable: '--font-cormorant-garamond',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

// Font combinations for different styles
export const fontCombinations = {
  modern: {
    heading: poppins,
    body: inter,
    name: 'Modern & Clean',
    description: 'Poppins for headings, Inter for body text'
  },
  elegant: {
    heading: playfairDisplay,
    body: openSans,
    name: 'Elegant & Sophisticated',
    description: 'Playfair Display for headings, Open Sans for body'
  },
  friendly: {
    heading: nunito,
    body: roboto,
    name: 'Friendly & Approachable',
    description: 'Nunito for headings, Roboto for body'
  },
  professional: {
    heading: montserrat,
    body: lato,
    name: 'Professional & Bold',
    description: 'Montserrat for headings, Lato for body'
  },
  minimalist: {
    heading: workSans,
    body: inter,
    name: 'Minimalist & Clean',
    description: 'Work Sans for headings, Inter for body'
  },
  classic: {
    heading: merriweather,
    body: crimsonText,
    name: 'Classic & Timeless',
    description: 'Merriweather for headings, Crimson Text for body'
  },
  contemporary: {
    heading: raleway,
    body: sourceSansPro,
    name: 'Contemporary & Stylish',
    description: 'Raleway for headings, Source Sans Pro for body'
  },
  luxury: {
    heading: cormorantGaramond,
    body: openSans,
    name: 'Luxury & Premium',
    description: 'Cormorant Garamond for headings, Open Sans for body'
  }
};

export type FontStyle = keyof typeof fontCombinations;