import type { FAQItem } from './types';

export const faqs: FAQItem[] = [
  // Pricing
  {
    question: 'Is there a free trial?',
    answer:
      'We offer a 14-day free trial on all plans with no credit card required. The Developer plan starts at $49/month -- affordable enough to test with real workloads before committing.',
    category: 'pricing',
  },
  {
    question: 'Can I upgrade or downgrade at any time?',
    answer:
      'Absolutely. You can switch between Developer, Startup, Growth, and Enterprise plans at any time from your dashboard. Upgrades take effect immediately, and downgrades apply at the end of your current billing cycle.',
    category: 'pricing',
  },
  {
    question: 'What happens if I exceed my plan limits?',
    answer:
      'We notify you when you approach your endpoint limits (6 on Developer, 15 on Startup, 50 on Growth). Additional endpoints beyond your plan cap require an upgrade. We never disable active monitors without notice.',
    category: 'pricing',
  },
  {
    question: 'Do you offer annual billing?',
    answer:
      'Yes, all plans offer a 20% discount with annual billing. Developer: $39.17/month ($470/year), Startup: $119.17/month ($1,430/year), Growth: $399.17/month ($4,790/year). Enterprise annual pricing is negotiated.',
    category: 'pricing',
  },

  // Features
  {
    question: 'Does RocketHooks work with any API?',
    answer:
      'Yes. RocketHooks works with any HTTP API that returns JSON or XML responses. It supports API keys, Bearer tokens, OAuth 2.0 with auto-refresh, Basic auth, and custom headers for authentication.',
    category: 'features',
  },
  {
    question: 'How does field-level change detection work?',
    answer:
      'RocketHooks uses expression-based monitoring to track specific fields within API responses. For JSON APIs, use JSONPath. For XML, use XPath. For plain text, use regex. AUTO mode detects the format automatically. You only get notified when the exact data you care about changes -- not on every response.',
    category: 'features',
  },
  {
    question: 'How fast is the change detection?',
    answer:
      'RocketHooks detects changes within the polling interval you configure, from as low as 30 seconds up to 24 hours. Webhook delivery after detection averages under 2 seconds.',
    category: 'features',
  },
  {
    question: 'What notification channels are supported?',
    answer:
      'Webhooks are currently available with HMAC-SHA256 signed payloads following the Standard Webhooks specification. Slack, email, n8n, Zapier, and Make.com integrations are coming soon.',
    category: 'features',
  },
  {
    question: 'What happens when a webhook delivery fails?',
    answer:
      'RocketHooks uses exponential backoff with automatic retries. Failed deliveries are stored in a dead letter queue for manual inspection and replay. You can track delivery status in real time from the dashboard.',
    category: 'features',
  },

  // General
  {
    question: 'Do the APIs I monitor need any changes?',
    answer:
      'No. RocketHooks connects to APIs as a read-only consumer using standard HTTP requests. The services you monitor require no changes on their end -- no webhooks to configure, no SDKs to install, no provider cooperation.',
    category: 'general',
  },
  {
    question: 'Is my data secure?',
    answer:
      'All credentials are encrypted with AWS KMS. Webhook payloads include HMAC-SHA256 signatures for verification. The platform uses multi-tenant isolation with organization-level data separation.',
    category: 'general',
  },
  {
    question: 'How reliable is the platform?',
    answer:
      'RocketHooks runs on AWS serverless infrastructure with two-tier circuit breaker protection for fault tolerance. All plans include an uptime SLA (99.9% for Developer/Startup, 99.95% for Growth, 99.99% for Enterprise).',
    category: 'general',
  },
  {
    question: 'How do I get started?',
    answer:
      'Sign up with GitHub or Google OAuth to start your 14-day free trial. Connect your first API endpoint, define what to watch using the visual field builder, and configure your notification destination. Most users receive their first event notification within 5 minutes.',
    category: 'general',
  },
];
