import type { FAQItem } from './types';

export const faqs: FAQItem[] = [
  // Pricing
  {
    question: 'Is there really a free tier?',
    answer:
      'Yes. The Free plan includes 5 API monitors and 1,000 webhook deliveries per month with no credit card required. It is free forever -- not a time-limited trial.',
    category: 'pricing',
  },
  {
    question: 'Can I upgrade or downgrade at any time?',
    answer:
      'Absolutely. You can switch between plans at any time from your dashboard. Upgrades take effect immediately, and downgrades apply at the end of your current billing cycle.',
    category: 'pricing',
  },
  {
    question: 'What happens if I exceed my plan limits?',
    answer:
      'We will notify you when you approach your limits. Webhook deliveries beyond your plan cap are queued and delivered once you upgrade or a new billing cycle begins. We never drop events.',
    category: 'pricing',
  },

  // Features
  {
    question: 'Does RocketHooks work with any REST API?',
    answer:
      'Yes. RocketHooks works with any REST API that returns JSON responses. It supports API keys, Bearer tokens, OAuth 2.0 with auto-refresh, Basic auth, and custom headers for authentication.',
    category: 'features',
  },
  {
    question: 'What is JSONPath change detection?',
    answer:
      'JSONPath is a query language for JSON data, similar to XPath for XML. RocketHooks uses JSONPath expressions to monitor specific fields within API responses, so you only get notified when the exact data you care about changes -- not on every response.',
    category: 'features',
  },
  {
    question: 'How fast is the change detection?',
    answer:
      'RocketHooks detects changes within the polling interval you configure (as low as 30 seconds on Pro, 10 seconds on Enterprise). Webhook delivery after detection averages 2 seconds.',
    category: 'features',
  },
  {
    question: 'What notification channels are supported?',
    answer:
      'Webhooks, Slack, SMS, and email. With multi-channel fanout, a single API change can trigger all channels simultaneously. Enterprise plans support unlimited channels per change event.',
    category: 'features',
  },
  {
    question: 'What happens when a webhook delivery fails?',
    answer:
      'RocketHooks uses exponential backoff with up to 5 automatic retries. Failed deliveries are stored in a dead letter queue for manual inspection and replay. You can track delivery status in real time.',
    category: 'features',
  },

  // General
  {
    question: 'Do I need to modify my existing APIs?',
    answer:
      'No. RocketHooks connects to your APIs as a consumer -- it reads from them using standard HTTP requests. Your existing systems require zero code changes or infrastructure modifications.',
    category: 'general',
  },
  {
    question: 'Is my data secure?',
    answer:
      'All credentials are encrypted with AWS KMS. Webhook payloads include JWT signatures for verification. The platform uses multi-tenant isolation with organization-level data separation and full audit logging.',
    category: 'general',
  },
  {
    question: 'How reliable is the platform?',
    answer:
      'RocketHooks runs on AWS serverless infrastructure with two-tier circuit breaker protection for fault tolerance. The Enterprise plan includes a 99.9% uptime SLA. Sub-second failure detection prevents cascade failures.',
    category: 'general',
  },
  {
    question: 'How do I get started?',
    answer:
      'Sign up with GitHub or Google OAuth, connect your first API endpoint, define what to watch with JSONPath, and configure your notification channels. Most users are receiving their first webhook within 5 minutes.',
    category: 'general',
  },
];
