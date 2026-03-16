import type { ProcessStep } from './types';

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    icon: 'lucide:user-plus',
    title: 'Sign Up in Seconds',
    description:
      'One-click OAuth with GitHub or Google. No credit card required. Your account is ready instantly.',
  },
  {
    number: 2,
    icon: 'lucide:link',
    title: 'Connect Any API',
    description:
      'Add any API endpoint with its authentication. RocketHooks supports API keys, Bearer tokens, OAuth 2.0, and Basic auth.',
  },
  {
    number: 3,
    icon: 'lucide:scan-search',
    title: 'Define What to Watch',
    description:
      'Use JSONPath, XPath, or regex to monitor specific fields, or watch entire responses. The visual builder helps you target the right data.',
  },
  {
    number: 4,
    icon: 'lucide:webhook',
    title: 'Configure Webhooks',
    description:
      'Set up webhook destinations with HMAC-SHA256 signed payloads for secure delivery. Additional channels like Slack, email, and n8n are coming soon.',
  },
  {
    number: 5,
    icon: 'lucide:rocket',
    title: 'Go Live',
    description:
      'Enable monitoring and start receiving real-time events. RocketHooks handles polling, change detection, retries, and delivery.',
  },
];
