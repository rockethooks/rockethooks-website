import type { UseCasePreview } from './types';

export const useCasePreviews: UseCasePreview[] = [
  {
    icon: 'lucide:shopping-cart',
    title: 'E-commerce Inventory',
    description:
      'Monitor supplier APIs for stock changes and trigger reorder workflows before items go out of stock.',
    href: '/use-cases/ecommerce',
  },
  {
    icon: 'lucide:contact',
    title: 'CRM Integration',
    description:
      'Detect contact updates, deal stage changes, and lead scoring shifts across CRM systems in real time.',
    href: '/use-cases/crm',
  },
  {
    icon: 'lucide:truck',
    title: 'Order & Fulfillment',
    description:
      'Track order status changes from payment processors and fulfillment providers with multi-team notifications.',
    href: '/use-cases/fulfillment',
  },
  {
    icon: 'lucide:server',
    title: 'Legacy ERP Sync',
    description:
      'Transform legacy ERP REST endpoints into real-time data feeds without touching existing infrastructure.',
    href: '/use-cases/erp',
  },
  {
    icon: 'lucide:cpu',
    title: 'DevOps Monitoring',
    description:
      'Watch deployment APIs, CI/CD pipelines, and infrastructure endpoints for status changes and failures.',
    href: '/use-cases/devops',
  },
];
