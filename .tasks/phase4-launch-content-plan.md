I have now completed a thorough exploration of the entire codebase. Below is the comprehensive Phase 4 plan. Since I am in read-only mode, I will present the full plan document here for you to create at `.tasks/phase4-launch-content-plan.md`.

---

# Phase 4: Launch Content Plan -- 20 GEO-Optimized Articles

## Plan Summary

**Phase**: 4 -- Launch Content  
**Total articles**: 20  
**Total word count**: ~44,900 words  
**Work units**: 12 (1 template + 10 content + 1 QA)  
**Agent team**: 5-6 agents (1 template, 3 content writers in parallel, 1 QA)  
**Estimated duration**: 3-4 execution sessions  

---

## 0. Prerequisites (Must Fix Before Phase 4 Begins)

Before any article writing starts, two issues discovered during exploration must be resolved.

### 0.1 Missing Author: sarah-chen

Two existing seed articles (`stop-building-custom-polling-infrastructure.mdx` and `rockethooks-vs-zapier-for-api-monitoring.mdx`) reference author ID `sarah-chen`, but this author does **not** exist in `/Users/adnene/Projects/odezio/RocketHooks/rockethooks-website/src/content/authors/authors.json`. Only `adnene` and `rockethooks-team` are present. The build currently works because `[...slug].astro` falls back to the raw string, but AuthorBio and PersonSchema will render incomplete data.

**Action**: Add `sarah-chen` (and optionally a third author like `marcus-rodriguez`) to `authors.json` before Phase 4 begins. This gives E-E-A-T author diversity across 20 articles.

**Recommended authors.json additions**:

```json
{
  "id": "sarah-chen",
  "name": "Sarah Chen",
  "title": "Senior Developer Advocate",
  "bio": "Full-stack engineer with deep expertise in API integrations, event-driven systems, and developer tooling. Previously built integration platforms serving millions of API calls daily at enterprise SaaS companies.",
  "avatar": "/images/authors/sarah-chen.jpg",
  "linkedin": "https://www.linkedin.com/in/sarahchen-dev",
  "github": "https://github.com/sarah-chen"
},
{
  "id": "marcus-rodriguez",
  "name": "Marcus Rodriguez",
  "title": "Solutions Architect",
  "bio": "Infrastructure and DevOps specialist focused on serverless architectures, API reliability patterns, and enterprise integration strategies. Contributor to multiple open-source monitoring projects.",
  "avatar": "/images/authors/marcus-rodriguez.jpg",
  "linkedin": "https://www.linkedin.com/in/marcusrodriguez-arch",
  "github": "https://github.com/marcus-rodriguez"
}
```

### 0.2 FAQSchema Not Rendered on Blog Posts

The `FAQSchema.astro` component exists at `/Users/adnene/Projects/odezio/RocketHooks/rockethooks-website/src/components/seo/FAQSchema.astro`, but `/Users/adnene/Projects/odezio/RocketHooks/rockethooks-website/src/pages/blog/[...slug].astro` does **not** extract FAQ questions from the rendered headings or inject FAQSchema into the page head. This means FAQ sections (which every article will have) will render visually but will **not** generate `FAQPage` JSON-LD structured data.

**Action**: Modify `[...slug].astro` to extract H3 headings ending in `?` from the `headings` array and pair them with answer text, then pass to `<FAQSchema>` in the `head` slot. Alternatively, each MDX article can export FAQ data as frontmatter or a named export that the page template picks up.

**Recommended approach**: Add FAQ extraction logic to `[...slug].astro` based on the heading pattern already used in seed articles (H3 headings ending in `?` under an H2 "FAQ" section). This is the approach the PRD template code already outlined.

---

## 1. Content Architecture -- All 20 Articles

### Author Assignment Strategy

| Author ID | Name | Specialization | Article Count |
|-----------|------|----------------|---------------|
| `adnene` | Adnene Khalfa | Founder perspective, architecture, strategy | 7 |
| `sarah-chen` | Sarah Chen | Developer-focused, hands-on tutorials, code-heavy | 8 |
| `marcus-rodriguez` | Marcus Rodriguez | Infrastructure, DevOps, enterprise patterns | 5 |

### Featured Articles (7 total, marked `featured: true`)

Articles 1, 2, 9, 10, 17, 18, 19 -- these represent the highest-traffic target queries and cover all three categories.

---

### Article 1: What Is API Change Detection? Complete Guide

| Field | Value |
|-------|-------|
| **Slug/filename** | `what-is-api-change-detection.mdx` |
| **Category** | `educational` |
| **Target word count** | 2,500 |
| **Author** | `adnene` |
| **Featured** | `true` |
| **GEO target query** | `"what is api change detection"` |
| **Primary keywords** | `API change detection`, `REST API monitoring`, `API diff`, `change detection algorithm`, `API data changes` |
| **Tags** | `api-change-detection`, `rest-api`, `monitoring`, `change-detection` |

**Outline**:

- **H2: Introduction** (~300w) -- Define API change detection, why it matters, who needs it
- **H2: How API Change Detection Works** (~400w)
  - H3: Polling-Based Detection (~150w)
  - H3: Hash Comparison (~150w)
  - H3: Field-Level (JSONPath) Detection (~150w)
- **H2: Types of API Changes to Detect** (~350w)
  - H3: Value Changes (~100w)
  - H3: Structural Changes (~100w)
  - H3: Availability Changes (~100w)
- **H2: Building a Change Detection Pipeline** (~400w)
  - H3: Data Acquisition Layer (~150w)
  - H3: Comparison Engine (~150w)
  - H3: Notification Layer (~100w)
- **H2: Common Challenges** (~300w) -- Rate limits, false positives, timestamp noise, pagination
- **H2: Change Detection with RocketHooks** (~300w) -- JSONPath monitoring, built-in diffing, multi-channel output
- **H2: FAQ** (~350w)
- **H2: Conclusion** (~100w)

**Code examples** (3):
1. Basic hash comparison function (JavaScript)
2. JSONPath expression examples for field-level monitoring
3. RocketHooks configuration YAML for change detection

**FAQ questions** (6):
1. What is the difference between API polling and API change detection?
2. How do you detect changes in nested JSON objects?
3. Can you monitor changes in paginated API responses?
4. What is the best polling interval for change detection?
5. How do you handle false positives in API change detection?
6. Does API change detection work with GraphQL APIs?

**Internal links**: `/features` (hub), `/how-it-works`, `/blog/what-is-api-polling` (seed), `/use-cases/crm-monitoring`

**Related articles**: Article 9 (Monitor REST API Changes), Article 4 (JSONPath Monitoring), Article 6 (REST API Polling Hidden Cost)

---

### Article 2: Event-Driven Architecture: REST API Edition

| Field | Value |
|-------|-------|
| **Slug/filename** | `event-driven-architecture-rest-api.mdx` |
| **Category** | `educational` |
| **Target word count** | 2,800 |
| **Author** | `adnene` |
| **Featured** | `true` |
| **GEO target query** | `"event driven architecture rest api"` |
| **Primary keywords** | `event-driven architecture`, `REST API events`, `API event streaming`, `polling to events`, `event-driven REST` |
| **Tags** | `event-driven`, `architecture`, `rest-api`, `real-time`, `design-patterns` |

**Outline**:

- **H2: Introduction** (~350w) -- What EDA means for REST APIs, the gap between REST and event-driven
- **H2: Traditional REST vs Event-Driven Patterns** (~400w)
  - H3: Request-Response Model Limitations (~200w)
  - H3: Event-Driven Model Advantages (~200w)
- **H2: Converting REST APIs to Event Streams** (~500w)
  - H3: The Polling Bridge Pattern (~200w)
  - H3: Change Detection as Event Source (~150w)
  - H3: Event Fan-Out Architecture (~150w)
- **H2: Implementation Patterns** (~450w)
  - H3: Observer Pattern for API Endpoints (~150w)
  - H3: Event Sourcing from REST State (~150w)
  - H3: CQRS with External APIs (~150w)
- **H2: Real-World Architecture Example** (~400w) -- Complete diagram: REST API -> RocketHooks -> Event bus -> Consumers
- **H2: Performance and Scalability** (~300w)
- **H2: FAQ** (~300w)
- **H2: Conclusion** (~100w)

**Code examples** (4):
1. Traditional polling loop vs event handler pattern (JavaScript)
2. Event fan-out architecture with webhooks (TypeScript)
3. RocketHooks config converting REST endpoint to webhook events
4. Consumer service handling RocketHooks events (Node.js)

**FAQ questions** (6):
1. Can any REST API be converted to an event-driven system?
2. What is the latency overhead of polling-based event detection?
3. How does event-driven architecture differ from webhooks?
4. Is event sourcing possible with third-party REST APIs?
5. How do you handle event ordering with polling-based detection?
6. What are the cost implications of event-driven REST monitoring?

**Internal links**: `/features`, `/how-it-works`, `/blog/what-is-api-polling` (seed), `/use-cases/devops-api-health`

**Related articles**: Article 1 (API Change Detection), Article 14 (Replace Polling Cron Jobs), Article 7 (Multi-Channel Notifications)

---

### Article 3: Webhook Best Practices for Developers

| Field | Value |
|-------|-------|
| **Slug/filename** | `webhook-best-practices-developers.mdx` |
| **Category** | `educational` |
| **Target word count** | 2,200 |
| **Author** | `sarah-chen` |
| **Featured** | `false` |
| **GEO target query** | `"webhook best practices"` |
| **Primary keywords** | `webhook best practices`, `webhook security`, `webhook retry logic`, `webhook implementation`, `webhook delivery` |
| **Tags** | `webhooks`, `best-practices`, `security`, `reliability`, `developer-guide` |

**Outline**:

- **H2: Introduction** (~250w) -- Why webhooks fail and how to build reliable ones
- **H2: Webhook Security Best Practices** (~400w)
  - H3: HMAC Signature Verification (~150w)
  - H3: IP Allowlisting (~100w)
  - H3: TLS Requirements (~100w)
- **H2: Reliability Patterns** (~400w)
  - H3: Idempotency Keys (~150w)
  - H3: Retry with Exponential Backoff (~150w)
  - H3: Dead Letter Queues (~100w)
- **H2: Payload Design** (~300w)
  - H3: Event Type Conventions (~100w)
  - H3: Payload Size Limits (~100w)
  - H3: Versioning Strategy (~100w)
- **H2: Monitoring and Debugging** (~300w)
- **H2: Webhook Delivery with RocketHooks** (~200w)
- **H2: FAQ** (~300w)
- **H2: Conclusion** (~50w)

**Code examples** (3):
1. HMAC signature verification (Node.js)
2. Idempotent webhook handler with deduplication (TypeScript)
3. RocketHooks webhook delivery configuration with retry

**FAQ questions** (6):
1. How do you verify webhook signatures?
2. What happens when a webhook endpoint is down?
3. How many times should webhooks be retried?
4. What is the maximum recommended webhook payload size?
5. How do you test webhooks during development?
6. Should webhooks be processed synchronously or asynchronously?

**Internal links**: `/features`, `/security`, `/blog/what-is-api-polling` (seed)

**Related articles**: Article 10 (Get Webhooks From APIs), Article 13 (API-Driven Slack Notifications), Article 14 (Replace Polling Cron Jobs)

---

### Article 4: JSONPath Monitoring: Field-Level API Tracking

| Field | Value |
|-------|-------|
| **Slug/filename** | `jsonpath-monitoring-field-level-api-tracking.mdx` |
| **Category** | `educational` |
| **Target word count** | 2,400 |
| **Author** | `sarah-chen` |
| **Featured** | `false` |
| **GEO target query** | `"jsonpath api monitoring"` |
| **Primary keywords** | `JSONPath monitoring`, `field-level API tracking`, `JSONPath expressions`, `API field monitoring`, `JSON change detection` |
| **Tags** | `jsonpath`, `monitoring`, `field-level`, `change-detection`, `api-tracking` |

**Outline**:

- **H2: Introduction** (~250w) -- Why monitoring entire API responses creates noise
- **H2: JSONPath Fundamentals** (~400w)
  - H3: JSONPath Syntax Reference (~200w)
  - H3: Common Expression Patterns (~200w)
- **H2: Field-Level Monitoring Strategies** (~400w)
  - H3: Monitoring Specific Fields (~150w)
  - H3: Monitoring Arrays and Collections (~150w)
  - H3: Nested Object Monitoring (~100w)
- **H2: Practical Examples** (~500w)
  - H3: CRM Contact Status Tracking (~150w)
  - H3: E-commerce Price Monitoring (~150w)
  - H3: CI/CD Pipeline Status (~150w)
- **H2: Advanced Patterns** (~350w)
  - H3: Conditional Monitoring with Filters (~150w)
  - H3: Ignoring Noise Fields (~100w)
  - H3: Composite Change Rules (~100w)
- **H2: JSONPath Monitoring with RocketHooks** (~200w)
- **H2: FAQ** (~250w)
- **H2: Conclusion** (~50w)

**Code examples** (5):
1. JSONPath expression cheat sheet with examples
2. Monitoring specific CRM fields (YAML config)
3. E-commerce price field monitoring (YAML config)
4. Array element change detection (JavaScript)
5. RocketHooks monitor configuration with JSONPath

**FAQ questions** (6):
1. What is the difference between JSONPath and XPath?
2. Can JSONPath monitor changes in deeply nested objects?
3. How do you monitor array additions and deletions?
4. What happens when a monitored field is removed from the API response?
5. Can you combine multiple JSONPath expressions in one monitor?
6. Does JSONPath support regular expression matching?

**Internal links**: `/features`, `/use-cases/crm-monitoring`, `/use-cases/ecommerce-price-tracking`, `/how-it-works`

**Related articles**: Article 1 (API Change Detection), Article 11 (Detect Price Changes), Article 12 (Monitor CRM Data)

---

### Article 5: API Resilience Patterns: Circuit Breakers Guide

| Field | Value |
|-------|-------|
| **Slug/filename** | `api-resilience-patterns-circuit-breakers.mdx` |
| **Category** | `educational` |
| **Target word count** | 2,600 |
| **Author** | `marcus-rodriguez` |
| **Featured** | `false` |
| **GEO target query** | `"api circuit breaker pattern"` |
| **Primary keywords** | `API circuit breaker`, `API resilience patterns`, `fault tolerance`, `retry patterns`, `API reliability` |
| **Tags** | `resilience`, `circuit-breaker`, `fault-tolerance`, `api-reliability`, `design-patterns` |

**Outline**:

- **H2: Introduction** (~300w) -- Why API integrations fail and the cascade effect
- **H2: The Circuit Breaker Pattern** (~500w)
  - H3: Closed State (Normal Operation) (~150w)
  - H3: Open State (Failure Detected) (~150w)
  - H3: Half-Open State (Recovery Testing) (~150w)
- **H2: Complementary Resilience Patterns** (~450w)
  - H3: Retry with Exponential Backoff (~150w)
  - H3: Bulkhead Isolation (~150w)
  - H3: Timeout Management (~150w)
- **H2: Implementation Guide** (~500w)
  - H3: State Machine Implementation (~200w)
  - H3: Configuration and Thresholds (~150w)
  - H3: Monitoring Circuit State (~150w)
- **H2: Resilience in API Monitoring** (~350w) -- How RocketHooks handles failures internally
- **H2: Real-World Failure Scenarios** (~250w)
- **H2: FAQ** (~200w)
- **H2: Conclusion** (~50w)

**Code examples** (3):
1. Circuit breaker class implementation (TypeScript)
2. Exponential backoff with jitter (JavaScript)
3. RocketHooks built-in resilience configuration

**FAQ questions** (5):
1. When should you use a circuit breaker vs simple retry?
2. How do you set circuit breaker thresholds?
3. Can circuit breakers cause cascading failures?
4. How do you monitor circuit breaker state in production?
5. What is the difference between a circuit breaker and a rate limiter?

**Internal links**: `/features`, `/security`, `/how-it-works`, `/use-cases/devops-api-health`

**Related articles**: Article 16 (Monitor Third-Party API Status), Article 8 (API Authentication Patterns), Article 2 (Event-Driven Architecture)

---

### Article 6: REST API Polling: The Hidden Cost of Checking

| Field | Value |
|-------|-------|
| **Slug/filename** | `rest-api-polling-hidden-cost.mdx` |
| **Category** | `educational` |
| **Target word count** | 2,000 |
| **Author** | `adnene` |
| **Featured** | `false` |
| **GEO target query** | `"api polling problems cost"` |
| **Primary keywords** | `API polling cost`, `polling overhead`, `REST API polling problems`, `polling inefficiency`, `API rate limits` |
| **Tags** | `api-polling`, `cost`, `performance`, `rate-limits`, `efficiency` |

**Outline**:

- **H2: Introduction** (~250w) -- Polling seems simple; the real cost is hidden
- **H2: The Direct Costs** (~350w)
  - H3: Infrastructure Compute Costs (~150w)
  - H3: API Rate Limit Consumption (~100w)
  - H3: Bandwidth and Egress (~100w)
- **H2: The Indirect Costs** (~350w)
  - H3: Engineering Maintenance Time (~150w)
  - H3: Incident Response Overhead (~100w)
  - H3: Opportunity Cost (~100w)
- **H2: Cost Calculation Framework** (~400w) -- Formula for calculating true polling cost per endpoint
- **H2: Reducing Polling Costs** (~300w) -- Intelligent scheduling, change detection, managed services
- **H2: Cost Comparison: DIY vs RocketHooks** (~200w) -- Table comparing costs at scale
- **H2: FAQ** (~200w)
- **H2: Conclusion** (~50w)

**Code examples** (2):
1. Cost calculation function for polling infrastructure (TypeScript)
2. Before/after comparison: cron job vs RocketHooks config

**FAQ questions** (5):
1. How much does API polling cost per month?
2. How do rate limits affect polling costs?
3. Can intelligent polling reduce costs by 90%?
4. What is the break-even point for a managed polling service?
5. How do you calculate the engineering cost of maintaining polling code?

**Internal links**: `/pricing`, `/features`, `/blog/stop-building-custom-polling-infrastructure` (seed), `/blog/what-is-api-polling` (seed)

**Related articles**: Article 17 (Build vs Buy), Article 14 (Replace Polling Cron Jobs), Article 20 (Why Developers Switch)

---

### Article 7: Multi-Channel Notifications Architecture Guide

| Field | Value |
|-------|-------|
| **Slug/filename** | `multi-channel-notifications-architecture.mdx` |
| **Category** | `educational` |
| **Target word count** | 2,300 |
| **Author** | `marcus-rodriguez` |
| **Featured** | `false` |
| **GEO target query** | `"multi channel notification system"` |
| **Primary keywords** | `multi-channel notifications`, `notification architecture`, `webhook Slack email SMS`, `notification routing`, `event notifications` |
| **Tags** | `notifications`, `architecture`, `multi-channel`, `slack`, `webhooks`, `email` |

**Outline**:

- **H2: Introduction** (~250w) -- Why single-channel notifications are insufficient
- **H2: Notification Channel Types** (~400w)
  - H3: Webhooks (~100w)
  - H3: Slack and Teams (~100w)
  - H3: Email (~100w)
  - H3: SMS (~100w)
- **H2: Architecture Patterns** (~400w)
  - H3: Event Router Pattern (~150w)
  - H3: Priority-Based Routing (~150w)
  - H3: Fan-Out with Deduplication (~100w)
- **H2: Building a Notification Pipeline** (~400w)
  - H3: Event Ingestion (~150w)
  - H3: Channel Selection Logic (~150w)
  - H3: Delivery and Retry (~100w)
- **H2: Multi-Channel with RocketHooks** (~300w) -- Built-in webhook, Slack, email, SMS delivery
- **H2: Scaling Considerations** (~200w)
- **H2: FAQ** (~250w)
- **H2: Conclusion** (~100w)

**Code examples** (3):
1. Notification router with channel selection (TypeScript)
2. Slack notification payload formatting
3. RocketHooks multi-channel configuration (YAML)

**FAQ questions** (6):
1. How do you prevent notification fatigue across channels?
2. What is the best notification channel for critical alerts?
3. How do you handle notification delivery failures?
4. Can you route different event types to different channels?
5. How do you deduplicate notifications across channels?
6. What is the ideal notification payload size per channel?

**Internal links**: `/features`, `/integrations/slack`, `/use-cases/devops-api-health`, `/how-it-works`

**Related articles**: Article 13 (API-Driven Slack Notifications), Article 3 (Webhook Best Practices), Article 2 (Event-Driven Architecture)

---

### Article 8: API Authentication Patterns for Integrations

| Field | Value |
|-------|-------|
| **Slug/filename** | `api-authentication-patterns-integrations.mdx` |
| **Category** | `educational` |
| **Target word count** | 2,500 |
| **Author** | `sarah-chen` |
| **Featured** | `false` |
| **GEO target query** | `"api authentication patterns"` |
| **Primary keywords** | `API authentication`, `OAuth 2.0`, `API keys`, `Bearer token`, `API auth patterns` |
| **Tags** | `authentication`, `oauth`, `api-keys`, `security`, `integrations` |

**Outline**:

- **H2: Introduction** (~250w) -- Auth is the first obstacle in any API integration
- **H2: API Key Authentication** (~350w)
  - H3: Header-Based API Keys (~150w)
  - H3: Query Parameter Keys (~100w)
  - H3: Security Considerations (~100w)
- **H2: OAuth 2.0 Patterns** (~500w)
  - H3: Authorization Code Flow (~200w)
  - H3: Client Credentials Flow (~150w)
  - H3: Token Refresh Handling (~150w)
- **H2: Bearer Token Authentication** (~300w)
  - H3: JWT Tokens (~150w)
  - H3: Token Rotation (~150w)
- **H2: Custom Authentication** (~300w)
  - H3: HMAC Signatures (~150w)
  - H3: Multi-Header Auth (~150w)
- **H2: Auth in Automated Monitoring** (~300w) -- How RocketHooks handles OAuth refresh, key rotation
- **H2: FAQ** (~300w)
- **H2: Conclusion** (~50w)

**Code examples** (4):
1. API key auth with header injection (JavaScript)
2. OAuth 2.0 client credentials flow (TypeScript)
3. JWT token refresh logic (TypeScript)
4. RocketHooks auth configuration for different patterns (YAML)

**FAQ questions** (7):
1. Which API authentication method is most secure?
2. How do you handle OAuth token expiration in automated systems?
3. Should API keys be passed in headers or query parameters?
4. How do you rotate API keys without downtime?
5. Can you use multiple authentication methods simultaneously?
6. How does RocketHooks handle OAuth token refresh?
7. What is the difference between API keys and Bearer tokens?

**Internal links**: `/security`, `/features`, `/integrations/salesforce`, `/integrations/hubspot`

**Related articles**: Article 3 (Webhook Best Practices), Article 5 (API Resilience Patterns), Article 9 (Monitor REST API Changes)

---

### Article 9: How to Monitor REST API Changes in Real-Time

| Field | Value |
|-------|-------|
| **Slug/filename** | `how-to-monitor-rest-api-changes-real-time.mdx` |
| **Category** | `problem-aware` |
| **Target word count** | 2,200 |
| **Author** | `adnene` |
| **Featured** | `true` |
| **GEO target query** | `"how to monitor api changes"` |
| **Primary keywords** | `monitor API changes`, `REST API monitoring`, `real-time API changes`, `API change notifications`, `API monitoring tool` |
| **Tags** | `api-monitoring`, `real-time`, `change-detection`, `rest-api`, `how-to` |

**Outline**:

- **H2: Introduction** (~200w) -- The challenge of knowing when API data changes
- **H2: Step 1: Define What to Monitor** (~300w) -- Endpoints, fields, change types
- **H2: Step 2: Choose Your Detection Method** (~350w)
  - H3: Full Payload Comparison (~100w)
  - H3: Field-Level Monitoring (~150w)
  - H3: Hash-Based Detection (~100w)
- **H2: Step 3: Set Up Monitoring Infrastructure** (~400w) -- DIY options vs managed solutions
- **H2: Step 4: Configure Notifications** (~300w) -- Webhook, Slack, email delivery
- **H2: Step 5: Handle Edge Cases** (~250w) -- Rate limits, pagination, auth refresh
- **H2: Complete Tutorial with RocketHooks** (~250w) -- End-to-end setup in 5 minutes
- **H2: FAQ** (~200w)
- **H2: Conclusion** (~50w)

**Code examples** (3):
1. DIY monitoring script (Node.js) showing the complexity
2. RocketHooks CLI setup in 3 commands
3. Webhook consumer receiving change events

**FAQ questions** (5):
1. How quickly can API changes be detected?
2. What is the minimum polling interval for real-time monitoring?
3. Can you monitor APIs that require authentication?
4. How do you handle API responses with dynamic timestamps?
5. What happens when the monitored API is temporarily unavailable?

**Internal links**: `/features`, `/how-it-works`, `/blog/what-is-api-polling` (seed), `/use-cases/crm-monitoring`

**Related articles**: Article 1 (API Change Detection), Article 10 (Webhooks From APIs), Article 4 (JSONPath Monitoring)

---

### Article 10: How to Get Webhooks From APIs That Don't Have Them

| Field | Value |
|-------|-------|
| **Slug/filename** | `how-to-get-webhooks-from-any-api.mdx` |
| **Category** | `problem-aware` |
| **Target word count** | 2,100 |
| **Author** | `sarah-chen` |
| **Featured** | `true` |
| **GEO target query** | `"add webhooks to any api"` |
| **Primary keywords** | `add webhooks to API`, `API without webhooks`, `webhook proxy`, `polling to webhooks`, `create webhooks any API` |
| **Tags** | `webhooks`, `api-transformation`, `polling`, `how-to`, `integration` |

**Outline**:

- **H2: Introduction** (~200w) -- Most APIs still lack native webhook support
- **H2: Why APIs Lack Webhook Support** (~250w) -- Legacy, security, cost reasons
- **H2: Approach 1: Custom Polling Script** (~350w) -- Build your own, pros/cons, code example
- **H2: Approach 2: Middleware Proxy** (~300w) -- Use a proxy service to bridge polling and webhooks
- **H2: Approach 3: API Transformation Platform** (~350w) -- RocketHooks approach: poll, detect, deliver
- **H2: Step-by-Step: Add Webhooks to Any API** (~400w) -- Complete tutorial with RocketHooks
- **H2: Common APIs Without Native Webhooks** (~150w) -- Table of popular APIs
- **H2: FAQ** (~200w)
- **H2: Conclusion** (~50w)

**Code examples** (3):
1. Custom polling-to-webhook bridge (Node.js)
2. RocketHooks setup for a webhook-less API (cURL)
3. Receiving the generated webhook events (Express.js handler)

**FAQ questions** (6):
1. Can you add webhooks to any REST API?
2. How reliable are polling-based webhooks compared to native ones?
3. What is the latency of synthetic webhooks?
4. Do you need to modify the source API to add webhooks?
5. How do you handle APIs with very low rate limits?
6. Can polling-based webhooks include change details in the payload?

**Internal links**: `/features`, `/how-it-works`, `/blog/what-is-api-polling` (seed), `/blog/stop-building-custom-polling-infrastructure` (seed)

**Related articles**: Article 3 (Webhook Best Practices), Article 14 (Replace Polling Cron Jobs), Article 9 (Monitor REST API Changes)

---

### Article 11: How to Detect Price Changes on Any E-commerce API

| Field | Value |
|-------|-------|
| **Slug/filename** | `how-to-detect-price-changes-ecommerce-api.mdx` |
| **Category** | `problem-aware` |
| **Target word count** | 1,900 |
| **Author** | `sarah-chen` |
| **Featured** | `false` |
| **GEO target query** | `"api price change detection"` |
| **Primary keywords** | `price change detection`, `e-commerce API monitoring`, `price monitoring API`, `competitor price tracking`, `price alert API` |
| **Tags** | `ecommerce`, `price-tracking`, `change-detection`, `monitoring`, `how-to` |

**Outline**:

- **H2: Introduction** (~200w) -- Pricing agility requires real-time awareness
- **H2: Identifying Price Data in API Responses** (~250w) -- JSONPath for price fields
- **H2: Building a Price Monitor** (~350w)
  - H3: Single Product Monitoring (~150w)
  - H3: Catalog-Wide Price Tracking (~200w)
- **H2: Handling E-commerce API Challenges** (~300w) -- Pagination, rate limits, currency formatting
- **H2: Setting Up Price Alerts** (~300w) -- Threshold-based notifications, Slack/email delivery
- **H2: Tutorial: Shopify Price Monitor with RocketHooks** (~350w)
- **H2: FAQ** (~200w)
- **H2: Conclusion** (~50w)

**Code examples** (3):
1. JSONPath expressions for Shopify/WooCommerce price fields
2. Price change threshold detection logic (JavaScript)
3. RocketHooks e-commerce price monitor configuration

**FAQ questions** (5):
1. How often should you check competitor prices?
2. Can you monitor prices across multiple e-commerce platforms?
3. How do you handle price changes caused by currency fluctuations?
4. What is the most efficient way to monitor thousands of SKUs?
5. Can you set alerts for specific price change thresholds?

**Internal links**: `/use-cases/ecommerce-price-tracking`, `/integrations/shopify`, `/integrations/woocommerce`, `/features`

**Related articles**: Article 4 (JSONPath Monitoring), Article 15 (Track Inventory Changes), Article 9 (Monitor REST API Changes)

---

### Article 12: How to Monitor CRM Data Changes Automatically

| Field | Value |
|-------|-------|
| **Slug/filename** | `how-to-monitor-crm-data-changes.mdx` |
| **Category** | `problem-aware` |
| **Target word count** | 2,000 |
| **Author** | `adnene` |
| **Featured** | `false` |
| **GEO target query** | `"monitor crm api changes"` |
| **Primary keywords** | `CRM monitoring`, `Salesforce API changes`, `HubSpot monitoring`, `CRM data sync`, `CRM webhook automation` |
| **Tags** | `crm`, `salesforce`, `hubspot`, `monitoring`, `how-to`, `data-sync` |

**Outline**:

- **H2: Introduction** (~200w) -- CRM data staleness costs revenue
- **H2: CRM APIs and Change Detection Challenges** (~300w)
  - H3: Salesforce REST API (~150w)
  - H3: HubSpot API (~150w)
- **H2: What CRM Changes to Monitor** (~250w) -- Contact updates, deal stages, lead scores
- **H2: Building Automated CRM Monitoring** (~350w) -- Step-by-step approach
- **H2: Setting Up Real-Time CRM Alerts** (~300w) -- Slack, email, webhook notifications
- **H2: Tutorial: HubSpot Deal Stage Monitor** (~350w)
- **H2: FAQ** (~200w)
- **H2: Conclusion** (~50w)

**Code examples** (3):
1. Salesforce REST API polling for contact changes (cURL)
2. HubSpot deal stage monitoring JSONPath config
3. RocketHooks CRM monitoring setup

**FAQ questions** (5):
1. Can you monitor CRM changes without native webhooks?
2. What CRM fields are most important to monitor?
3. How do you avoid hitting Salesforce API rate limits?
4. Can you monitor custom fields in CRM systems?
5. How quickly are CRM changes detected with RocketHooks?

**Internal links**: `/use-cases/crm-monitoring`, `/integrations/salesforce`, `/integrations/hubspot`, `/features`

**Related articles**: Article 4 (JSONPath Monitoring), Article 9 (Monitor REST API Changes), Article 11 (Detect Price Changes)

---

### Article 13: How to Build API-Driven Slack Notifications

| Field | Value |
|-------|-------|
| **Slug/filename** | `how-to-build-api-driven-slack-notifications.mdx` |
| **Category** | `problem-aware` |
| **Target word count** | 1,800 |
| **Author** | `sarah-chen` |
| **Featured** | `false` |
| **GEO target query** | `"api to slack notifications"` |
| **Primary keywords** | `API Slack notifications`, `Slack webhook alerts`, `API monitoring Slack`, `Slack bot API changes`, `Slack notification integration` |
| **Tags** | `slack`, `notifications`, `api-monitoring`, `integration`, `how-to` |

**Outline**:

- **H2: Introduction** (~200w) -- Teams live in Slack; API events should be there too
- **H2: Slack Notification Methods** (~300w)
  - H3: Incoming Webhooks (~150w)
  - H3: Slack Bot API (~150w)
- **H2: Designing Useful API Notifications** (~300w) -- Block Kit formatting, action buttons, threading
- **H2: Building the Pipeline** (~300w) -- API -> Change detection -> Slack message
- **H2: Tutorial: API Status Alerts in Slack** (~400w) -- Complete walkthrough
- **H2: Advanced Patterns** (~150w) -- Channel routing, severity-based formatting
- **H2: FAQ** (~200w)
- **H2: Conclusion** (~50w)

**Code examples** (3):
1. Slack Block Kit message formatting (JSON)
2. API change to Slack notification bridge (TypeScript)
3. RocketHooks Slack channel configuration

**FAQ questions** (5):
1. How do you format API data for Slack messages?
2. Can you send different API events to different Slack channels?
3. How do you prevent Slack notification overload?
4. Can Slack notifications include actionable buttons?
5. What is the delivery latency for API-driven Slack alerts?

**Internal links**: `/integrations/slack`, `/features`, `/how-it-works`, `/use-cases/devops-api-health`

**Related articles**: Article 7 (Multi-Channel Notifications), Article 9 (Monitor REST API Changes), Article 16 (Monitor Third-Party API Status)

---

### Article 14: How to Replace Polling Cron Jobs With Webhooks

| Field | Value |
|-------|-------|
| **Slug/filename** | `how-to-replace-polling-cron-jobs-webhooks.mdx` |
| **Category** | `problem-aware` |
| **Target word count** | 2,100 |
| **Author** | `marcus-rodriguez` |
| **Featured** | `false` |
| **GEO target query** | `"replace cron polling webhooks"` |
| **Primary keywords** | `replace cron job webhook`, `polling cron alternatives`, `cron to event-driven`, `webhook cron replacement`, `eliminate polling` |
| **Tags** | `cron-jobs`, `webhooks`, `migration`, `polling`, `how-to`, `devops` |

**Outline**:

- **H2: Introduction** (~200w) -- Cron-based polling is a tech debt generator
- **H2: Problems with Cron-Based Polling** (~300w)
  - H3: Single Point of Failure (~100w)
  - H3: Clock Drift and Overlap (~100w)
  - H3: No Built-in Error Recovery (~100w)
- **H2: The Webhook Alternative** (~300w) -- Event-driven vs scheduled checking
- **H2: Migration Strategy** (~400w)
  - H3: Step 1: Inventory Your Cron Jobs (~100w)
  - H3: Step 2: Classify by Event Type (~100w)
  - H3: Step 3: Set Up Webhook Receivers (~100w)
  - H3: Step 4: Parallel Run and Validate (~100w)
- **H2: Tutorial: Migrate a Cron Poller to RocketHooks** (~350w)
- **H2: Cost and Performance Comparison** (~200w)
- **H2: FAQ** (~250w)
- **H2: Conclusion** (~50w)

**Code examples** (3):
1. Typical cron polling script (bash/Node.js) -- the "before"
2. Equivalent RocketHooks configuration -- the "after"
3. Webhook handler replacing the cron consumer (TypeScript)

**FAQ questions** (6):
1. Can you replace all cron jobs with webhooks?
2. How do you migrate cron jobs without downtime?
3. What if the source API does not support webhooks?
4. How do you handle cron jobs that poll multiple endpoints?
5. Is webhook-based monitoring more reliable than cron?
6. What is the cost difference between cron polling and RocketHooks?

**Internal links**: `/features`, `/pricing`, `/blog/stop-building-custom-polling-infrastructure` (seed), `/blog/what-is-api-polling` (seed)

**Related articles**: Article 20 (Why Developers Switch From Cron Jobs), Article 6 (Hidden Cost of Polling), Article 10 (Get Webhooks From APIs)

---

### Article 15: How to Track Inventory Changes Across APIs

| Field | Value |
|-------|-------|
| **Slug/filename** | `how-to-track-inventory-changes-across-apis.mdx` |
| **Category** | `problem-aware` |
| **Target word count** | 1,900 |
| **Author** | `sarah-chen` |
| **Featured** | `false` |
| **GEO target query** | `"inventory api change tracking"` |
| **Primary keywords** | `inventory API tracking`, `stock level monitoring`, `inventory change detection`, `multi-channel inventory`, `inventory sync API` |
| **Tags** | `inventory`, `ecommerce`, `monitoring`, `change-detection`, `how-to` |

**Outline**:

- **H2: Introduction** (~200w) -- Inventory discrepancies cause overselling and lost sales
- **H2: Inventory Data Across Platforms** (~250w) -- Shopify, Amazon, WooCommerce, ERP systems
- **H2: Monitoring Strategy** (~300w)
  - H3: Stock Level Thresholds (~100w)
  - H3: Availability Status Changes (~100w)
  - H3: Multi-Warehouse Aggregation (~100w)
- **H2: Building Inventory Monitors** (~350w) -- Step-by-step approach with JSONPath
- **H2: Real-Time Inventory Alerts** (~300w) -- Low stock, out-of-stock, restock notifications
- **H2: Tutorial: Shopify Inventory Monitor** (~300w)
- **H2: FAQ** (~200w)
- **H2: Conclusion** (~50w)

**Code examples** (3):
1. Shopify inventory API endpoint with JSONPath field selection
2. Stock threshold alert logic (JavaScript)
3. RocketHooks multi-platform inventory monitoring config

**FAQ questions** (5):
1. How do you monitor inventory across multiple sales channels?
2. Can you set alerts for specific stock level thresholds?
3. How do you handle inventory changes during flash sales?
4. What is the ideal polling interval for inventory monitoring?
5. Can you track inventory changes for specific SKUs only?

**Internal links**: `/use-cases/inventory-monitoring`, `/use-cases/ecommerce-price-tracking`, `/integrations/shopify`, `/integrations/woocommerce`

**Related articles**: Article 11 (Detect Price Changes), Article 4 (JSONPath Monitoring), Article 9 (Monitor REST API Changes)

---

### Article 16: How to Monitor Third-Party API Status Changes

| Field | Value |
|-------|-------|
| **Slug/filename** | `how-to-monitor-third-party-api-status.mdx` |
| **Category** | `problem-aware` |
| **Target word count** | 2,000 |
| **Author** | `marcus-rodriguez` |
| **Featured** | `false` |
| **GEO target query** | `"monitor third party api status"` |
| **Primary keywords** | `API status monitoring`, `third-party API health`, `API uptime monitoring`, `status page monitoring`, `API health check` |
| **Tags** | `api-status`, `monitoring`, `uptime`, `health-check`, `devops`, `how-to` |

**Outline**:

- **H2: Introduction** (~200w) -- Your uptime depends on third-party API health
- **H2: Types of API Status Changes** (~300w)
  - H3: HTTP Status Code Changes (~100w)
  - H3: Response Time Degradation (~100w)
  - H3: Payload Structure Changes (~100w)
- **H2: Monitoring Approaches** (~300w)
  - H3: Health Endpoint Polling (~100w)
  - H3: Synthetic Transaction Monitoring (~100w)
  - H3: Status Page Scraping (~100w)
- **H2: Building an API Health Dashboard** (~350w)
- **H2: Alert Configuration** (~250w) -- Severity levels, escalation paths
- **H2: Tutorial: Monitor GitHub API Status** (~350w)
- **H2: FAQ** (~200w)
- **H2: Conclusion** (~50w)

**Code examples** (3):
1. API health check with response time tracking (TypeScript)
2. Status change detection with severity classification
3. RocketHooks API health monitoring configuration

**FAQ questions** (5):
1. How do you distinguish between temporary glitches and real outages?
2. What is the best polling interval for API health monitoring?
3. Can you monitor APIs that do not have a status endpoint?
4. How do you handle false positive status alerts?
5. Should you monitor API response time or just availability?

**Internal links**: `/use-cases/devops-api-health`, `/features`, `/integrations/github`, `/security`

**Related articles**: Article 5 (API Resilience Patterns), Article 13 (API-Driven Slack Notifications), Article 9 (Monitor REST API Changes)

---

### Article 17: RocketHooks vs Custom Polling: Build vs Buy

| Field | Value |
|-------|-------|
| **Slug/filename** | `rockethooks-vs-custom-polling-build-vs-buy.mdx` |
| **Category** | `comparison` |
| **Target word count** | 2,500 |
| **Author** | `adnene` |
| **Featured** | `true` |
| **GEO target query** | `"build vs buy webhook system"` |
| **Primary keywords** | `build vs buy webhooks`, `custom polling vs managed`, `API monitoring build or buy`, `polling infrastructure cost`, `RocketHooks vs custom` |
| **Tags** | `comparison`, `build-vs-buy`, `custom-polling`, `cost-analysis`, `decision-guide` |

**Outline**:

- **H2: Introduction** (~250w) -- Every engineering team faces the build-vs-buy decision
- **H2: What Custom Polling Requires** (~400w)
  - H3: Initial Development (~150w)
  - H3: Ongoing Maintenance (~150w)
  - H3: Hidden Complexity (~100w)
- **H2: Feature Comparison** (~400w) -- Detailed table: change detection, rate limiting, retry, auth, monitoring
- **H2: Cost Analysis** (~400w)
  - H3: Engineering Time Cost (~200w) -- Developer hours x rate
  - H3: Infrastructure Cost (~100w)
  - H3: RocketHooks Cost (~100w)
- **H2: Decision Framework** (~300w) -- When to build, when to buy, hybrid approach
- **H2: Real-World Migration Story** (~250w) -- Before/after scenario
- **H2: Total Cost of Ownership Comparison** (~250w) -- 12-month TCO table
- **H2: FAQ** (~200w)
- **H2: Conclusion** (~50w)

**Code examples** (2):
1. Custom polling system code volume estimate (showing file count/complexity)
2. Equivalent RocketHooks configuration (showing simplicity)

**FAQ questions** (6):
1. When does it make sense to build custom polling?
2. How long does it take to build reliable polling infrastructure?
3. What is the ongoing maintenance cost of custom polling?
4. Can you migrate from custom polling to RocketHooks gradually?
5. Does RocketHooks support all the same APIs as custom polling?
6. What is the break-even point for managed vs custom?

**Internal links**: `/pricing`, `/features`, `/blog/stop-building-custom-polling-infrastructure` (seed), `/how-it-works`

**Related articles**: Article 6 (Hidden Cost of Polling), Article 20 (Why Developers Switch), Article 18 (vs Zapier)

---

### Article 18: RocketHooks vs Zapier: When You Need Real API Power

| Field | Value |
|-------|-------|
| **Slug/filename** | `rockethooks-vs-zapier-real-api-power.mdx` |
| **Category** | `comparison` |
| **Target word count** | 2,300 |
| **Author** | `adnene` |
| **Featured** | `true` |
| **GEO target query** | `"zapier alternative api monitoring"` |
| **Primary keywords** | `Zapier alternative`, `RocketHooks vs Zapier`, `API monitoring vs automation`, `Zapier developer alternative`, `Zapier API limitations` |
| **Tags** | `comparison`, `zapier`, `api-monitoring`, `automation`, `decision-guide` |

**Outline**:

- **H2: Introduction** (~200w) -- Different tools for different problems
- **H2: Fundamental Difference: Automation vs Transformation** (~350w)
- **H2: Feature-by-Feature Comparison** (~400w) -- Detailed comparison table (expanded from seed)
- **H2: Developer Experience Comparison** (~350w)
  - H3: Configuration Approach (~150w) -- Code-first vs visual builder
  - H3: Custom API Support (~100w)
  - H3: Debugging and Monitoring (~100w)
- **H2: Pricing Model Analysis** (~350w) -- Per-task vs per-endpoint, scaling scenarios
- **H2: When to Choose Each** (~300w)
  - H3: Choose RocketHooks When (~150w)
  - H3: Choose Zapier When (~150w)
- **H2: Using Both Together** (~150w)
- **H2: FAQ** (~250w)
- **H2: Conclusion** (~50w)

**Code examples** (2):
1. RocketHooks API config for custom endpoint monitoring (cURL)
2. Side-by-side: Zapier Zap screenshot description vs RocketHooks YAML config

**FAQ questions** (7):
1. Can Zapier monitor any REST API endpoint?
2. Is RocketHooks harder to use than Zapier?
3. Which is more cost-effective at scale?
4. Can RocketHooks and Zapier work together?
5. Does RocketHooks have a visual builder like Zapier?
6. Which has faster change detection?
7. What about Make (Integromat) as an alternative?

**Internal links**: `/pricing`, `/features`, `/compare`, `/blog/rockethooks-vs-zapier-for-api-monitoring` (seed)

**Related articles**: Article 17 (Build vs Buy), Article 19 (API Monitoring Tools Comparison), Article 10 (Get Webhooks From APIs)

---

### Article 19: API Monitoring Tools: Complete Comparison (2026)

| Field | Value |
|-------|-------|
| **Slug/filename** | `api-monitoring-tools-comparison-2026.mdx` |
| **Category** | `comparison` |
| **Target word count** | 3,000 |
| **Author** | `adnene` |
| **Featured** | `true` |
| **GEO target query** | `"best api monitoring tools 2026"` |
| **Primary keywords** | `API monitoring tools`, `best API monitoring`, `API monitoring comparison`, `API monitoring 2026`, `REST API monitoring tools` |
| **Tags** | `comparison`, `tools`, `api-monitoring`, `2026`, `buyer-guide` |

**Outline**:

- **H2: Introduction** (~300w) -- The landscape of API monitoring in 2026
- **H2: Comparison Criteria** (~250w) -- How we evaluated each tool
- **H2: RocketHooks** (~300w) -- Overview, strengths, limitations, pricing
- **H2: Datadog API Monitoring** (~250w)
- **H2: Postman Monitors** (~250w)
- **H2: UptimeRobot / Better Uptime** (~250w)
- **H2: Checkly** (~200w)
- **H2: Zapier / Make** (~200w) -- As monitoring alternatives
- **H2: Custom Solutions (DIY)** (~200w)
- **H2: Comparison Matrix** (~350w) -- Comprehensive feature/price table
- **H2: Choosing the Right Tool** (~200w) -- Decision flowchart by use case
- **H2: FAQ** (~200w)
- **H2: Conclusion** (~50w)

**Code examples** (1):
1. Side-by-side configuration comparison across 3 tools

**FAQ questions** (8):
1. What is the best API monitoring tool for developers?
2. Which API monitoring tool is most affordable?
3. Can API monitoring tools detect data changes, not just uptime?
4. What is the difference between API monitoring and API testing?
5. Do I need separate tools for uptime and change monitoring?
6. Which tools support monitoring authenticated APIs?
7. How do API monitoring tools handle rate limits?
8. What is the best free API monitoring tool?

**Internal links**: `/features`, `/pricing`, `/compare`, `/how-it-works`

**Related articles**: Article 17 (Build vs Buy), Article 18 (vs Zapier), Article 1 (API Change Detection)

---

### Article 20: Why Developers Switch From Cron Jobs to RocketHooks

| Field | Value |
|-------|-------|
| **Slug/filename** | `why-developers-switch-cron-jobs-rockethooks.mdx` |
| **Category** | `comparison` |
| **Target word count** | 2,200 |
| **Author** | `marcus-rodriguez` |
| **Featured** | `false` |
| **GEO target query** | `"cron job alternative webhook"` |
| **Primary keywords** | `cron job alternative`, `replace cron jobs`, `cron job problems`, `cron to webhook migration`, `developer cron alternatives` |
| **Tags** | `comparison`, `cron-jobs`, `migration`, `developer-experience`, `decision-guide` |

**Outline**:

- **H2: Introduction** (~200w) -- Cron jobs were fine in 2015; the world has changed
- **H2: The Five Pain Points** (~500w)
  - H3: No Visibility Into Failures (~100w)
  - H3: Scaling Is Manual (~100w)
  - H3: No Built-in Change Detection (~100w)
  - H3: Single Server Dependency (~100w)
  - H3: Rate Limit Blindness (~100w)
- **H2: What Modern API Monitoring Looks Like** (~350w) -- Event-driven, managed, observable
- **H2: Side-by-Side: Cron Job vs RocketHooks** (~350w) -- Detailed comparison table
- **H2: Migration Stories** (~300w) -- Common migration patterns and outcomes
- **H2: The Tipping Point** (~200w) -- When teams hit 5+ cron polling jobs, the pain compounds
- **H2: Getting Started** (~150w) -- Migration path from cron to RocketHooks
- **H2: FAQ** (~200w)
- **H2: Conclusion** (~50w)

**Code examples** (2):
1. Typical cron + polling script showing pain points (commented)
2. Equivalent RocketHooks setup showing the difference

**FAQ questions** (5):
1. Should I replace all my cron jobs with RocketHooks?
2. How long does migration from cron to RocketHooks take?
3. Can RocketHooks handle the same schedule flexibility as cron?
4. What happens to my cron infrastructure after migration?
5. Is RocketHooks overkill for simple periodic checks?

**Internal links**: `/features`, `/pricing`, `/blog/stop-building-custom-polling-infrastructure` (seed), `/how-it-works`

**Related articles**: Article 14 (Replace Polling Cron Jobs), Article 17 (Build vs Buy), Article 6 (Hidden Cost of Polling)

---

## 2. Content Quality Standards

### Mandatory Checklist (Every Article Must Pass)

| # | Requirement | Validation Method |
|---|------------|-------------------|
| 1 | **Direct answer paragraph**: 40-60 words answering the primary GEO query, placed as the first paragraph after frontmatter | Word count check on first paragraph |
| 2 | **TL;DR section**: 3-5 bullet points summarizing key takeaways, placed immediately after the direct answer as a blockquote | Visual inspection |
| 3 | **Self-contained passages**: Each major section contains at least one 127-167 word passage that can be extracted by AI systems as a standalone citation | Word count per section |
| 4 | **Code examples**: Minimum based on article length (see table below) | Count code blocks |
| 5 | **FAQ section**: H2 "FAQ" heading with 5-8 H3 question headings (ending in `?`) and direct answer paragraphs | Heading count under FAQ H2 |
| 6 | **Author bio**: Renders via `AuthorBio.astro` component from `[...slug].astro` -- requires valid author ID in frontmatter | Build validation |
| 7 | **Last Updated date**: `updatedDate` field set in frontmatter (same as pubDate for initial publish) | Frontmatter check |
| 8 | **Table of Contents**: Auto-generated from H2/H3 headings via `TableOfContents.astro` | Build renders ToC sidebar |
| 9 | **Related articles**: 3 articles rendered via `RelatedArticles.astro` (automatic from category matching) | Build validation |
| 10 | **Internal links to hubs**: Minimum 2 internal links to hub/marketing pages (`/features`, `/use-cases`, `/pricing`, `/how-it-works`, `/compare`) | Link count |
| 11 | **Internal links to spokes**: Minimum 1 internal link to a use-case or integration spoke page | Link count |
| 12 | **Word count target**: Within +/- 10% of target | Word count tool |
| 13 | **Frontmatter complete**: All required fields populated per schema | Build validation (Zod) |
| 14 | **Title max 60 chars**: Enforced by Zod schema | Schema validation |
| 15 | **Description max 160 chars**: Enforced by Zod schema | Schema validation |
| 16 | **draft: false**: Must be set to false for publication | Frontmatter check |

### Code Example Minimums

| Article word count | Minimum code examples |
|-------------------|-----------------------|
| < 2,000 | 2 |
| 2,000 - 2,500 | 3 |
| 2,500 - 3,000 | 3-4 |
| > 3,000 | 4 |

### Self-Contained Passages Per Article

| Article word count | Target extractable passages |
|-------------------|-----------------------------|
| 1,800 - 2,000 | 5-6 |
| 2,000 - 2,500 | 6-8 |
| 2,500 - 3,000 | 8-10 |

---

## 3. Article Template

Every article MDX file must follow this template structure.

```mdx
---
title: "[Title - max 60 characters]"
description: "[Description - max 160 characters, includes primary keyword]"
pubDate: 2026-03-15
updatedDate: 2026-03-15
author: "[adnene|sarah-chen|marcus-rodriguez]"
category: "[educational|problem-aware|comparison]"
tags: ["tag-1", "tag-2", "tag-3", "tag-4"]
featured: [true|false]
draft: false
geoTargetQuery: "[exact query this article targets for AI search]"
seoKeywords: ["keyword-1", "keyword-2", "keyword-3", "keyword-4", "keyword-5"]
---

{/* DIRECT ANSWER PARAGRAPH (40-60 words)
   This MUST directly answer the geoTargetQuery.
   AI search engines extract the first paragraph as the primary citation.
   Write in declarative, factual tone. No questions. No "In this article..." */}

[Direct answer paragraph here - 40-60 words answering the primary query]

{/* TL;DR SECTION
   3-5 bullet points summarizing key takeaways.
   Each bullet should be a self-contained fact or recommendation. */}

> **TL;DR**
> - [Key takeaway 1 - actionable, specific]
> - [Key takeaway 2 - actionable, specific]
> - [Key takeaway 3 - actionable, specific]
> - [Key takeaway 4 - optional]
> - [Key takeaway 5 - optional]

## [First Major Section Title]

{/* SELF-CONTAINED PASSAGE (127-167 words)
   Each H2 section should open with a passage that makes sense
   on its own if extracted by an AI search engine.
   Include the section's key insight in these opening words. */}

[127-167 word self-contained passage introducing this section's topic]

[Supporting content, examples, details]

### [Subsection Title]

[Content for subsection]

```javascript
// Code example with descriptive comments
// Show working, practical code that readers can adapt
const example = "real code, not pseudocode";
```

## [Second Major Section Title]

{/* Repeat the pattern: self-contained opening passage,
   supporting content, code examples where relevant */}

[Content continues...]

## [How RocketHooks Solves This / RocketHooks Section]

{/* Every article should mention RocketHooks naturally.
   Educational articles: 1 section showing how RocketHooks applies
   Problem-aware articles: tutorial section with RocketHooks solution
   Comparison articles: RocketHooks as one of the options compared */}

[RocketHooks-specific content with configuration example]

```yaml
# RocketHooks configuration example
name: "Descriptive monitor name"
source:
  url: "https://api.example.com/endpoint"
  method: GET
  headers:
    Authorization: "Bearer ${API_KEY}"
monitor:
  - "$.data.field_to_watch"
interval: 60
channels:
  - webhook
  - slack
```

## FAQ

{/* FAQ SECTION - 5-8 questions as H3 headings ending in ?
   Each answer should be 2-4 sentences, direct and factual.
   These H3 headings will be extracted for FAQPage schema. */}

### [Question 1 ending in a question mark?]

[Direct answer in 1-2 sentences. Optional elaboration in 1-2 more sentences.]

### [Question 2 ending in a question mark?]

[Direct answer in 1-2 sentences. Optional elaboration in 1-2 more sentences.]

### [Question 3 ending in a question mark?]

[Direct answer in 1-2 sentences.]

### [Question 4 ending in a question mark?]

[Direct answer in 1-2 sentences.]

### [Question 5 ending in a question mark?]

[Direct answer in 1-2 sentences.]

## Conclusion

{/* CONCLUSION - Summarize key points, provide next step.
   Include a natural CTA to try RocketHooks or read related content. */}

[Summary of key points from the article - 2-3 sentences]

[Call to action - try RocketHooks or read related articles]

---

{/* INTERNAL LINKS - Woven naturally throughout the article body.
   Minimum 2 links to hub pages (/features, /use-cases, /pricing, /how-it-works)
   Minimum 1 link to a spoke page (/use-cases/*, /integrations/*)
   Links to related blog posts where relevant.
   
   Use markdown link format: [anchor text](/path)
   Example: [API change detection features](/features)
   Example: [CRM monitoring use case](/use-cases/crm-monitoring) */}
```

---

## 4. Work Unit Breakdown

### WU4.0: Prerequisites (Pre-Phase 4)

| Field | Value |
|-------|-------|
| **Scope** | Fix FAQSchema rendering, add missing authors |
| **Deliverables** | Updated `[...slug].astro` with FAQ extraction, updated `authors.json` with 2 new authors |
| **Duration** | 30 minutes |
| **Agent** | Template Agent |
| **Dependencies** | None |

**Tasks**:
1. Add `sarah-chen` and `marcus-rodriguez` to `src/content/authors/authors.json`
2. Modify `src/pages/blog/[...slug].astro` to extract FAQ H3 headings (ending in `?`) and render `FAQSchema` component in the head slot
3. Verify build succeeds with existing 3 seed articles
4. Verify FAQSchema JSON-LD renders on seed articles that have FAQ sections

---

### WU4.1: Article Template and All 20 Outlines

| Field | Value |
|-------|-------|
| **Scope** | Create all 20 MDX files with complete frontmatter, heading structure, FAQ questions, and placeholder content markers |
| **Deliverables** | 20 `.mdx` files in `src/content/blog/` with full frontmatter and heading skeleton |
| **Word count** | ~2,000 (frontmatter + headings + placeholder comments) |
| **Duration** | 1 hour |
| **Agent** | Template Agent |
| **Dependencies** | WU4.0 |

**Tasks**:
1. Create all 20 MDX files using the article template
2. Fill in complete frontmatter for each (title, description, pubDate, author, category, tags, featured, draft: true, geoTargetQuery, seoKeywords)
3. Add all H2/H3 headings per the outlines in Section 1
4. Add all FAQ questions as H3 headings under FAQ H2
5. Add placeholder comments for word counts per section
6. Add internal link targets as comments in each file
7. Verify build succeeds with all 20 skeleton files (draft: true)

---

### WU4.2: Educational Articles Batch 1 (Articles 1-2)

| Field | Value |
|-------|-------|
| **Scope** | Write full content for Articles 1 and 2 |
| **Articles** | (1) What Is API Change Detection?, (2) Event-Driven Architecture: REST API Edition |
| **Word count** | 5,300 |
| **Duration** | 45-60 minutes |
| **Agent** | Content Writer A |
| **Dependencies** | WU4.1 |

---

### WU4.3: Educational Articles Batch 2 (Articles 3-4)

| Field | Value |
|-------|-------|
| **Scope** | Write full content for Articles 3 and 4 |
| **Articles** | (3) Webhook Best Practices, (4) JSONPath Monitoring |
| **Word count** | 4,600 |
| **Duration** | 40-50 minutes |
| **Agent** | Content Writer B |
| **Dependencies** | WU4.1 |

---

### WU4.4: Educational Articles Batch 3 (Articles 5-6)

| Field | Value |
|-------|-------|
| **Scope** | Write full content for Articles 5 and 6 |
| **Articles** | (5) API Resilience Patterns, (6) REST API Polling Hidden Cost |
| **Word count** | 4,600 |
| **Duration** | 40-50 minutes |
| **Agent** | Content Writer C |
| **Dependencies** | WU4.1 |

---

### WU4.5: Educational Articles Batch 4 (Articles 7-8)

| Field | Value |
|-------|-------|
| **Scope** | Write full content for Articles 7 and 8 |
| **Articles** | (7) Multi-Channel Notifications, (8) API Authentication Patterns |
| **Word count** | 4,800 |
| **Duration** | 40-50 minutes |
| **Agent** | Content Writer A |
| **Dependencies** | WU4.2 completed |

---

### WU4.6: Problem-Aware Articles Batch 1 (Articles 9-10)

| Field | Value |
|-------|-------|
| **Scope** | Write full content for Articles 9 and 10 |
| **Articles** | (9) Monitor REST API Changes, (10) Get Webhooks From APIs |
| **Word count** | 4,300 |
| **Duration** | 35-45 minutes |
| **Agent** | Content Writer B |
| **Dependencies** | WU4.3 completed |

---

### WU4.7: Problem-Aware Articles Batch 2 (Articles 11-12)

| Field | Value |
|-------|-------|
| **Scope** | Write full content for Articles 11 and 12 |
| **Articles** | (11) Detect Price Changes, (12) Monitor CRM Data |
| **Word count** | 3,900 |
| **Duration** | 35-45 minutes |
| **Agent** | Content Writer C |
| **Dependencies** | WU4.4 completed |

---

### WU4.8: Problem-Aware Articles Batch 3 (Articles 13-14)

| Field | Value |
|-------|-------|
| **Scope** | Write full content for Articles 13 and 14 |
| **Articles** | (13) API-Driven Slack Notifications, (14) Replace Polling Cron Jobs |
| **Word count** | 3,900 |
| **Duration** | 35-45 minutes |
| **Agent** | Content Writer A |
| **Dependencies** | WU4.5 completed |

---

### WU4.9: Problem-Aware Articles Batch 4 (Articles 15-16)

| Field | Value |
|-------|-------|
| **Scope** | Write full content for Articles 15 and 16 |
| **Articles** | (15) Track Inventory Changes, (16) Monitor Third-Party API Status |
| **Word count** | 3,900 |
| **Duration** | 35-45 minutes |
| **Agent** | Content Writer B |
| **Dependencies** | WU4.6 completed |

---

### WU4.10: Comparison Articles Batch 1 (Articles 17-18)

| Field | Value |
|-------|-------|
| **Scope** | Write full content for Articles 17 and 18 |
| **Articles** | (17) Build vs Buy, (18) vs Zapier |
| **Word count** | 4,800 |
| **Duration** | 40-50 minutes |
| **Agent** | Content Writer C |
| **Dependencies** | WU4.7 completed |

---

### WU4.11: Comparison Articles Batch 2 (Articles 19-20)

| Field | Value |
|-------|-------|
| **Scope** | Write full content for Articles 19 and 20 |
| **Articles** | (19) API Monitoring Tools Comparison 2026, (20) Why Developers Switch From Cron Jobs |
| **Word count** | 5,200 |
| **Duration** | 45-55 minutes |
| **Agent** | Content Writer A |
| **Dependencies** | WU4.8 completed |

---

### WU4.12: QA -- Final Verification and Publication

| Field | Value |
|-------|-------|
| **Scope** | Verify all 20 articles, fix issues, set draft: false, validate build |
| **Duration** | 1-2 hours |
| **Agent** | QA Agent |
| **Dependencies** | WU4.2 through WU4.11 all completed |

**Verification checklist** (see Section 8 for full details).

---

## 5. Agent Team Strategy

### Team Composition

| Agent | Role | Work Units | Specialization |
|-------|------|-----------|----------------|
| **Template Agent** | Setup and scaffolding | WU4.0, WU4.1 | File structure, frontmatter, Astro infrastructure |
| **Content Writer A** | Write 6 articles (3 batches) | WU4.2, WU4.5, WU4.8, WU4.11 | 4 WUs, ~18,200 words |
| **Content Writer B** | Write 6 articles (3 batches) | WU4.3, WU4.6, WU4.9 | 3 WUs, ~12,800 words |
| **Content Writer C** | Write 8 articles (3 batches) | WU4.4, WU4.7, WU4.10 | 3 WUs, ~13,300 words |
| **QA Agent** | Validation and publication | WU4.12 | Build verification, quality gates, link validation |

### Execution Model: Wave-Based Parallel

The recommended execution model is **wave-based parallel** -- content writers work simultaneously within waves, with a brief coordination checkpoint between waves.

**Wave 1** (Educational): WU4.2 + WU4.3 + WU4.4 in parallel (3 agents)
**Wave 2** (Educational + Problem-Aware): WU4.5 + WU4.6 + WU4.7 in parallel (3 agents)
**Wave 3** (Problem-Aware + Comparison): WU4.8 + WU4.9 + WU4.10 in parallel (3 agents)
**Wave 4** (Comparison): WU4.11 (1 agent -- lighter wave, can run during QA prep)
**Wave 5** (QA): WU4.12 (1 agent)

**Why wave-based over fully parallel**:
1. **Consistency**: Writers in Wave 1 establish the voice, tone, and structure patterns. Wave 2+ writers can reference completed articles.
2. **Internal linking**: Earlier articles create link targets that later articles reference. Writing in waves ensures link targets exist.
3. **Build validation**: Each wave can be followed by a quick build check to catch schema issues early rather than accumulating 20 articles of problems.
4. **Context window**: Each writer maintains fresh context by working on 2 articles at a time rather than being overwhelmed.

### Consistency Enforcement

To ensure all articles feel like they were written by one voice:

1. **Template compliance**: WU4.1 creates skeleton files with exact heading structure, word count targets per section, and placeholder comments. Writers fill in content but do not modify structure.
2. **Style guide rules** (include in each writer's prompt):
   - Write in second person ("you") for tutorials, third person for educational
   - Use active voice
   - No marketing superlatives (no "revolutionary", "game-changing", "cutting-edge")
   - Technical claims must be specific and verifiable
   - RocketHooks mentions: natural, not forced. Educational articles: 1 section. Problem-aware: tutorial section. Comparison: equal treatment with honest pros/cons.
3. **Code example standards**:
   - JavaScript/TypeScript for all code unless the example demands another language (bash for CLI, YAML for config)
   - Include explanatory comments in code
   - Use `expressive-code` syntax highlighting (already configured)
   - All code must be syntactically valid (no pseudocode)

---

## 6. Content Creation Workflow

Each content writing agent follows this step-by-step process for each article:

### Step 1: Read the Outline

Read the skeleton MDX file created in WU4.1. Understand:
- Frontmatter fields (already filled -- do not modify)
- H2/H3 heading structure (already defined -- do not modify heading names)
- FAQ questions (already defined)
- Word count targets per section (in comments)
- Internal link targets (in comments)

### Step 2: Research Technical Accuracy

Use available tools to verify technical claims:
- **Context7** (`mcp__context7`) for library documentation (JSONPath specs, Node.js APIs, Slack API)
- **WebSearch** for current pricing data, tool comparisons, industry statistics
- Verify all API endpoint examples are realistic (use real endpoint patterns from Salesforce, Shopify, HubSpot, GitHub)

### Step 3: Write the Direct Answer Paragraph

Write the opening paragraph (40-60 words) that directly answers the `geoTargetQuery`. This is the single most important paragraph for GEO. Rules:
- Declarative, factual tone
- No questions
- No "In this article we will discuss..."
- Must be self-contained -- if an AI search engine extracts only this paragraph, it should be a complete, useful answer

### Step 4: Write TL;DR Section

Write 3-5 bullet points as a blockquote. Each bullet should be an actionable insight or specific recommendation. No vague statements.

### Step 5: Write Each Section

Follow the heading structure. For each H2 section:
1. Open with a 127-167 word self-contained passage (the "extractable citation")
2. Add supporting content, examples, and details
3. Include code examples where specified in the outline
4. Weave in internal links naturally (minimum 2 to hubs, 1 to spokes across the full article)

### Step 6: Write Code Examples

For each code example:
1. Use the correct language identifier for syntax highlighting (`javascript`, `typescript`, `yaml`, `bash`, `json`)
2. Include descriptive comments explaining what the code does
3. Ensure code is syntactically valid
4. For RocketHooks configurations, use consistent YAML structure matching the seed articles

### Step 7: Write FAQ Section

For each pre-defined FAQ question:
1. Write a direct answer in 1-2 sentences
2. Optionally add 1-2 sentences of elaboration
3. Keep each answer under 100 words
4. Ensure the H3 heading is the exact question (ends with `?`)

### Step 8: Write Conclusion

2-3 sentences summarizing the article's key insights. Include a natural call-to-action (try RocketHooks, read related articles, explore the use case page).

### Step 9: Verify Word Count

Count total words (excluding frontmatter and code blocks). Target must be within +/-10% of the specified count.

### Step 10: Verify GEO Structure

Final self-check:
- First paragraph answers the GEO query directly? (yes/no)
- TL;DR section present? (yes/no)
- At least 1 self-contained passage (127-167w) per H2 section? (yes/no)
- All code blocks have language identifiers? (yes/no)
- All FAQ questions end with `?`? (yes/no)
- Minimum 2 internal hub links present? (yes/no)
- Minimum 1 spoke link present? (yes/no)

---

## 7. Internal Linking Strategy

### Hub-and-Spoke Matrix

**Hub pages** (every article must link to at least 2):

| Hub Page | URL | Which articles link here |
|----------|-----|--------------------------|
| Features | `/features` | ALL 20 articles (primary hub) |
| How It Works | `/how-it-works` | 1, 2, 7, 9, 10, 13, 18, 19, 20 |
| Pricing | `/pricing` | 6, 14, 17, 18, 19, 20 |
| Use Cases Hub | `/use-cases` | 4, 11, 12, 15 |
| Compare Hub | `/compare` | 17, 18, 19 |
| Security | `/security` | 3, 5, 8, 16 |

**Spoke pages** (each article links to at least 1 relevant spoke):

| Spoke | URL | Articles linking here |
|-------|-----|-----------------------|
| CRM Monitoring | `/use-cases/crm-monitoring` | 1, 4, 9, 12 |
| E-commerce Price Tracking | `/use-cases/ecommerce-price-tracking` | 4, 11, 15 |
| DevOps API Health | `/use-cases/devops-api-health` | 2, 5, 7, 13, 16 |
| Inventory Monitoring | `/use-cases/inventory-monitoring` | 15 |
| Salesforce Integration | `/integrations/salesforce` | 8, 12 |
| HubSpot Integration | `/integrations/hubspot` | 8, 12 |
| Shopify Integration | `/integrations/shopify` | 11, 15 |
| WooCommerce Integration | `/integrations/woocommerce` | 11, 15 |
| Slack Integration | `/integrations/slack` | 7, 13 |
| GitHub Integration | `/integrations/github` | 16 |

### Cross-Article Linking

Every article links to its 3 "Related Articles" (rendered automatically by `RelatedArticles.astro`), plus has 2-4 contextual in-body links to other blog posts:

**Blog-to-Blog Links (in-body)**:

| Article | Links to these blog posts |
|---------|---------------------------|
| 1 (API Change Detection) | Seed: `what-is-api-polling` |
| 2 (Event-Driven) | Seed: `what-is-api-polling` |
| 3 (Webhook Best Practices) | Seed: `what-is-api-polling` |
| 6 (Polling Hidden Cost) | Seeds: `what-is-api-polling`, `stop-building-custom-polling-infrastructure` |
| 9 (Monitor REST API Changes) | Seed: `what-is-api-polling` |
| 10 (Get Webhooks) | Seeds: `what-is-api-polling`, `stop-building-custom-polling-infrastructure` |
| 14 (Replace Cron Jobs) | Seeds: `what-is-api-polling`, `stop-building-custom-polling-infrastructure` |
| 17 (Build vs Buy) | Seed: `stop-building-custom-polling-infrastructure` |
| 18 (vs Zapier) | Seed: `rockethooks-vs-zapier-for-api-monitoring` |
| 20 (Why Developers Switch) | Seed: `stop-building-custom-polling-infrastructure` |

### Related Articles Assignment

The `getRelatedArticles()` function in `/Users/adnene/Projects/odezio/RocketHooks/rockethooks-website/src/utils/content.ts` matches by category first, then fills with recent posts. For more precise control, the Related Articles assignments specified in Section 1 of this plan reflect **topical relevance** rather than just category matching. If the current implementation is insufficient, the QA agent should verify that the automatic selection produces reasonable results. If not, a `relatedSlugs` frontmatter field could be added to the schema for manual override (optional enhancement).

---

## 8. Quality Gates (WU4.12 QA Checklist)

### Build Verification

| Check | Command/Method | Pass Criteria |
|-------|---------------|---------------|
| TypeScript compilation | `yarn build` | 0 errors |
| Build output | `yarn build` | All 23 blog posts rendered (3 seed + 20 new) |
| No console warnings | Build log | No content collection warnings |

### Frontmatter Validation (Per Article)

| Check | Method | Pass Criteria |
|-------|--------|---------------|
| `title` length | Zod schema | max 60 characters |
| `description` length | Zod schema | max 160 characters |
| `author` resolves | Build + manual | Author exists in `authors.json` |
| `category` valid | Zod enum | One of: educational, problem-aware, comparison |
| `geoTargetQuery` present | Manual | Non-empty string |
| `seoKeywords` populated | Manual | 3-5 keywords |
| `draft: false` | Manual | Must be false for publication |
| `featured` correct | Manual | Exactly 7 articles marked featured |
| `pubDate` set | Zod schema | Valid date |
| `updatedDate` set | Manual | Set to same as pubDate |
| `tags` populated | Manual | 3-6 tags per article |

### Content Quality (Per Article)

| Check | Method | Pass Criteria |
|-------|--------|---------------|
| Word count | Word count tool | Within +/-10% of target |
| Direct answer paragraph | Manual | 40-60 words, answers GEO query |
| TL;DR section | Manual | 3-5 bullet points present |
| Self-contained passages | Manual (spot check) | At least 1 per H2 section |
| Code examples count | Grep for code fences | Meets minimums per word count |
| Code syntax valid | Manual | All code blocks are syntactically correct |
| FAQ section present | Heading check | H2 "FAQ" with 5-8 H3 questions |
| FAQ questions end with `?` | Grep | All H3 under FAQ end with `?` |
| Internal hub links | Link count | Minimum 2 per article |
| Internal spoke links | Link count | Minimum 1 per article |
| No broken internal links | Build + grep | All `/blog/`, `/use-cases/`, `/integrations/` links resolve |

### Schema Validation

| Check | Method | Pass Criteria |
|-------|--------|---------------|
| ArticleSchema renders | HTML inspection | `TechArticle` JSON-LD on every blog post |
| FAQSchema renders | HTML inspection | `FAQPage` JSON-LD on posts with FAQ section |
| PersonSchema renders | HTML inspection | `Person` JSON-LD via AuthorBio component |
| BreadcrumbList renders | HTML inspection (from BaseLayout) | Present on all blog posts |

### Cross-Article Validation

| Check | Method | Pass Criteria |
|-------|--------|---------------|
| No duplicate slugs | File listing | 20 unique filenames |
| No duplicate titles | Grep frontmatter | 20 unique titles |
| Category distribution | Count | 8 educational, 8 problem-aware, 4 comparison |
| Author distribution | Count | ~7 adnene, ~8 sarah-chen, ~5 marcus-rodriguez |
| Featured count | Count | Exactly 7 articles |
| All tags valid format | Grep | Lowercase, hyphenated |
| Related articles render | Build output | 3 related articles on each post |
| Reading time renders | Build output | "X min read" on each post |

### Final Publication Steps

1. Set `draft: false` on all 20 articles
2. Run `yarn build` -- verify 0 errors, 23 blog pages rendered
3. Verify `/blog/` listing page shows all 20 articles (plus 3 seeds = 23)
4. Verify `/compare/` hub shows 4 comparison articles (seed + 3 new)
5. Verify `/blog/category/educational` shows 9 educational articles (seed + 8 new)
6. Verify `/blog/category/problem-aware` shows 9 problem-aware articles (seed + 8 new)
7. Verify `/blog/category/comparison` shows 5 comparison articles (seed + 4 new)
8. Spot-check 5 articles in browser for visual rendering quality
9. Verify RSS feed at `/rss.xml` includes all 23 posts

---

### Critical Files for Implementation

- `/Users/adnene/Projects/odezio/RocketHooks/rockethooks-website/src/content/blog/what-is-api-polling.mdx` -- Seed article serving as the structural template for all 20 new articles. Writers must match its frontmatter format, heading style, code block patterns, and FAQ format.
- `/Users/adnene/Projects/odezio/RocketHooks/rockethooks-website/src/pages/blog/[...slug].astro` -- Blog post rendering page that must be modified to extract FAQ headings and inject FAQSchema (prerequisite WU4.0).
- `/Users/adnene/Projects/odezio/RocketHooks/rockethooks-website/src/content/authors/authors.json` -- Authors data file that must be extended with `sarah-chen` and `marcus-rodriguez` entries before Phase 4 writing begins.
- `/Users/adnene/Projects/odezio/RocketHooks/rockethooks-website/src/content.config.ts` -- Blog collection schema definition (Zod). All 20 articles must conform to these field constraints (title max 60, description max 160, category enum, etc.).
- `/Users/adnene/Projects/odezio/RocketHooks/rockethooks-website/src/utils/content.ts` -- Content utility functions including `getRelatedArticles()`, `getPublishedPosts()`, and `getPostsByCategory()`. These drive the automatic related articles and category listing behavior that all 20 articles depend on.
