import type { PricingTier } from './types';
import { getAppUrl } from '@utils/urls';

export const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    priceNote: 'forever',
    description: 'For side projects and experimentation. No credit card required.',
    features: [
      '5 API monitors',
      '1,000 webhook deliveries/month',
      '5-minute minimum polling interval',
      '3 JSONPath expressions per API',
      '1 notification channel per change',
      'Community support',
    ],
    cta: {
      label: 'Get Started Free',
      href: getAppUrl(),
    },
  },
  {
    name: 'Pro',
    price: '$29',
    priceNote: '/month',
    description: 'For teams shipping production integrations with real-time requirements.',
    features: [
      '50 API monitors',
      '50,000 webhook deliveries/month',
      '30-second minimum polling interval',
      '10 JSONPath expressions per API',
      '5 notification channels per change',
      'Multi-channel fanout (Slack, SMS, email)',
      'Visual response diff viewer',
      'Email support',
    ],
    cta: {
      label: 'Start Free Trial',
      href: getAppUrl('/', { plan: 'pro' }),
    },
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description:
      'For organizations with advanced security, compliance, and scale requirements.',
    features: [
      'Unlimited API monitors',
      'Custom webhook delivery limits',
      '10-second minimum polling interval',
      'Unlimited JSONPath expressions',
      'Unlimited notification channels',
      'SLA guarantees (99.9% uptime)',
      'Two-tier circuit breaker protection',
      'On-premises deployment option',
      'Dedicated support & onboarding',
    ],
    cta: {
      label: 'Contact Sales',
      href: '/contact?subject=enterprise',
    },
  },
];
