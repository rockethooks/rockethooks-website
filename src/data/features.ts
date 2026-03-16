import type { Feature } from './types';

export const features: Feature[] = [
  // Transformation
  {
    icon: 'lucide:repeat',
    title: 'API-to-Event Transformation',
    description:
      'Transform any API endpoint into a real-time event source, even for services that offer no native webhooks or push notifications.',
    category: 'transformation',
  },
  {
    icon: 'lucide:timer',
    title: 'Intelligent Polling Engine',
    description:
      'Configurable polling intervals from 30 seconds to 24 hours with automatic optimization and rate limit awareness.',
    category: 'transformation',
  },
  {
    icon: 'lucide:shield',
    title: 'Webhook Delivery with HMAC Signing',
    description:
      'Every webhook includes an HMAC-SHA256 signature following the Standard Webhooks spec. Verify payload authenticity with zero custom crypto code.',
    category: 'notifications',
  },

  // Monitoring
  {
    icon: 'lucide:scan-search',
    title: 'Field-Level Change Detection',
    description:
      'Monitor specific fields using JSONPath, XPath, or regex expressions. Trigger only when the data you care about changes across JSON, XML, and text responses.',
    category: 'monitoring',
  },
  {
    icon: 'lucide:diff',
    title: 'Visual Response Diff',
    description:
      'See before-and-after comparisons of detected changes with a clear diff view in the dashboard.',
    category: 'monitoring',
  },
  {
    icon: 'lucide:activity',
    title: 'Real-Time Health Dashboard',
    description:
      'Monitor polling status, webhook delivery rates, and system health across all your API integrations.',
    category: 'monitoring',
  },

  // Notifications
  {
    icon: 'lucide:webhook',
    title: 'Reliable Webhook Delivery',
    description:
      'Exponential backoff retries, dead letter queues, and delivery tracking ensure no event is lost.',
    category: 'notifications',
  },
  {
    icon: 'lucide:flask-conical',
    title: 'Test Connection & Validation',
    description:
      'Validate API connectivity, authentication, change detection, and webhook delivery before enabling monitoring. Catch configuration issues before they become production problems.',
    category: 'notifications',
  },
  {
    icon: 'lucide:copy',
    title: 'Clone & Template Endpoints',
    description:
      'Duplicate endpoint configurations for rapid setup across similar APIs. Clone monitoring rules, delivery configs, and authentication in one click.',
    category: 'notifications',
  },

  // Security & Developer Experience
  {
    icon: 'lucide:shield-check',
    title: 'Enterprise-Grade Security',
    description:
      'KMS encryption, JWT webhook signatures, and multi-tenant isolation protect your data at every layer.',
    category: 'security',
  },
  {
    icon: 'lucide:key-round',
    title: 'Universal Auth Support',
    description:
      'Connect APIs using API keys, Bearer tokens, OAuth 2.0 with auto-refresh, Basic auth, or custom headers.',
    category: 'security',
  },
  {
    icon: 'lucide:circuit-board',
    title: 'Two-Tier Circuit Breakers',
    description:
      'API-level and endpoint-level circuit protection prevents cascade failures and reduces compute costs by 60-80%.',
    category: 'security',
  },
];

export const featureCategories: Record<Feature['category'], string> = {
  transformation: 'API Transformation',
  monitoring: 'Change Detection & Monitoring',
  notifications: 'Delivery & Reliability',
  security: 'Security & Reliability',
};
