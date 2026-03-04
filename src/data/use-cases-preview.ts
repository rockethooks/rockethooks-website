import type { UseCasePreview } from './types';

export const useCasePreviews: UseCasePreview[] = [
  {
    icon: 'lucide:contact',
    title: 'CRM Monitoring',
    description:
      'Detect contact updates, deal stage changes, and lead scoring shifts across CRM systems in real time.',
    href: '/use-cases/crm-monitoring',
  },
  {
    icon: 'lucide:tag',
    title: 'E-commerce Price Tracking',
    description:
      'Monitor competitor prices, track product availability, and trigger automated repricing workflows.',
    href: '/use-cases/ecommerce-price-tracking',
  },
  {
    icon: 'lucide:cpu',
    title: 'DevOps API Health',
    description:
      'Watch deployment APIs, CI/CD pipelines, and infrastructure endpoints for status changes and failures.',
    href: '/use-cases/devops-api-health',
  },
  {
    icon: 'lucide:shopping-cart',
    title: 'Inventory Monitoring',
    description:
      'Track stock levels across supplier APIs and trigger reorder workflows before items go out of stock.',
    href: '/use-cases/inventory-monitoring',
  },
  {
    icon: 'lucide:server',
    title: 'ERP Integration',
    description:
      'Transform legacy ERP REST endpoints into real-time data feeds without touching existing infrastructure.',
    href: '/use-cases/erp-integration',
  },
  {
    icon: 'lucide:truck',
    title: 'Order Fulfillment',
    description:
      'Track order status changes from payment processors and fulfillment providers with multi-team notifications.',
    href: '/use-cases/order-fulfillment',
  },
  {
    icon: 'lucide:plug',
    title: 'SaaS Integration',
    description:
      'Connect SaaS tools that lack native webhooks into your automation stack with universal API monitoring.',
    href: '/use-cases/saas-integration',
  },
];
