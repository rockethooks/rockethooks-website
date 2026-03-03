import type { Feature } from './types';

export const features: Feature[] = [
  // Transformation
  {
    icon: 'lucide:repeat',
    title: 'REST to Real-Time Conversion',
    description:
      'Transform any REST API endpoint into a webhook source. No code changes to your existing systems required.',
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
    icon: 'lucide:workflow',
    title: 'Multi-Channel Fanout',
    description:
      'A single API change triggers webhooks, Slack messages, SMS alerts, and emails simultaneously.',
    category: 'transformation',
  },

  // Monitoring
  {
    icon: 'lucide:scan-search',
    title: 'JSONPath Change Detection',
    description:
      'Monitor specific nested fields using JSONPath expressions. Trigger only when the data you care about changes.',
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
    icon: 'lucide:message-square',
    title: 'Slack & SMS Alerts',
    description:
      'Route critical changes to Slack channels or SMS for immediate team awareness with rich formatting.',
    category: 'notifications',
  },
  {
    icon: 'lucide:mail',
    title: 'Email Notifications',
    description:
      'Detailed email reports and summaries for stakeholders who need change visibility without technical dashboards.',
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
  notifications: 'Notifications & Delivery',
  security: 'Security & Reliability',
};
