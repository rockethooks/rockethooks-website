import type { Testimonial } from './types';

export const testimonials: Testimonial[] = [
  {
    quote:
      'We replaced 12 polling scripts with RocketHooks in an afternoon. Our inventory alerts went from 30-minute delays to under 3 seconds -- and our AWS bill dropped 60%.',
    name: 'Sarah Chen',
    role: 'Lead Backend Engineer',
    company: 'ShipFast Commerce',
  },
  {
    quote:
      'The JSONPath change detection is a game changer. We monitor nested CRM fields across 40 endpoints and only get notified when the data we care about actually changes.',
    name: 'Marcus Rivera',
    role: 'CTO',
    company: 'PipelineIQ',
  },
  {
    quote:
      'Our legacy ERP has no webhook support. RocketHooks gave us real-time order sync without touching a single line of ERP code. Setup took 10 minutes.',
    name: 'Anika Patel',
    role: 'VP of Engineering',
    company: 'LogiTrack Systems',
  },
  {
    quote:
      'The multi-channel fanout means one API change can notify Slack, trigger a webhook, and send an SMS -- all configured in a single rule. It just works.',
    name: 'James Okoro',
    role: 'DevOps Lead',
    company: 'Nextera Health',
  },
];
