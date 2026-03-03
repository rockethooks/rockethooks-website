export interface Feature {
  icon: string;
  title: string;
  description: string;
  category: 'transformation' | 'monitoring' | 'notifications' | 'security';
}

export interface PricingTier {
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  cta: {
    label: string;
    href: string;
  };
  highlighted?: boolean;
  badge?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface ProcessStep {
  number: number;
  icon: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'pricing' | 'features' | 'general';
}

export interface UseCasePreview {
  icon: string;
  title: string;
  description: string;
  href: string;
}
