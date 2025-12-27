# COPILOT INSTRUCTION: MeaChat Deep Review & Refactoring

## SYSTEM ROLE
You are GitHub Copilot specialized in:
- Astro framework projects
- i18n architecture (internationalization)
- UI/UX design systems
- SEO optimization
- SaaS content strategy

## PROJECT CONTEXT

### About MeaChat
- **Type**: White-label chatbot platform (based on BotSailor)
- **Tech Stack**: Astro + TypeScript + Tailwind CSS
- **Languages**: Arabic (RTL) + English (LTR)
- **Core Value Proposition**: "Your Requests Are Commands" - any customer message can trigger actions in connected systems via Webhook/API

### Current Structure
```
src/
├── components/       # UI components (NO separate AR versions)
├── i18n/            # Translation files (ar.ts, en.ts)
├── pages/           # Routes (index, pricing, etc.)
│   └── ar/          # Arabic pages (RTL)
├── styles/          # Global CSS
```

### Key Integrations
- **Channels**: WhatsApp, Instagram, Facebook, Telegram, WebChat
- **Built-in**: Google Sheets, Google Calendar, WooCommerce, Shopify
- **Flexible**: Webhook + HTTP API → connects to n8n, Odoo, any REST API
- **Core Concept**: Customer message = trigger for real action (create order, update inventory, send invoice, etc.)

## CRITICAL ISSUES TO FIX

### 🔴 BLOCKER: Build Failure
**Problem**: `src/pages/ar/pricing.astro` imports non-existent `AddonsAr.astro`
**Impact**: Deployment fails
**Solution**: Use unified component with `locale` prop

## YOUR MISSION (7 FOCUS AREAS)

### 1️⃣ FIX i18n ARCHITECTURE
**Goal**: Single component files, language via props

**Tasks**:
- [ ] Review all components in `src/components/`
- [ ] Identify which components need i18n support
- [ ] Add `locale` prop to components:
  ```ts
  interface Props {
    locale?: 'ar' | 'en';
  }
  const { locale = 'en' } = Astro.props;
  ```
- [ ] Import translations:
  ```ts
  import { ar } from '../i18n/ar';
  import { en } from '../i18n/en';
  const t = locale === 'ar' ? ar.componentName : en.componentName;
  ```
- [ ] Apply RTL/LTR styling:
  ```astro
  <section dir={locale === 'ar' ? 'rtl' : 'ltr'}>
  ```
- [ ] Update pages to pass `locale` prop:
  ```astro
  <PricingPlans locale="ar" />
  ```

**Priority Components**:
1. `Addons.astro` (URGENT - fixes build)
2. `PricingPlans.astro`
3. `Hero.astro`
4. `Features.astro`
5. `Integrations.astro`
6. `Faq.astro`
7. `ExpertSupport.astro`

### 2️⃣ DESIGN AUDIT
**Check for**:
- Inconsistent spacing between sections
- Font size hierarchy (h1/h2/h3 consistency)
- Button styles (primary vs secondary)
- Card layouts (padding, shadows, borders)
- Mobile responsiveness (breakpoints)
- Color contrast (accessibility)

**Recommendations**:
- Use Tailwind spacing scale consistently (`space-y-16`, `space-y-24`)
- Standardize max-width for content (`max-w-7xl mx-auto`)
- Unify button classes in a shared pattern

### 3️⃣ BRAND IDENTITY
**Define Color System**:
```css
/* Suggested palette for Trust + Automation */
--primary: #3B82F6      /* Blue - trust, tech */
--secondary: #8B5CF6    /* Purple - innovation */
--accent: #10B981       /* Green - success, action */
--dark: #0F172A         /* Background */
--light: #F8FAFC        /* Light mode background */
```

**Typography**:
- Arabic: `Tajawal` (already in use ✅)
- English: `Inter` (already in use ✅)
- Ensure proper hierarchy:
  - H1: 3xl-4xl (hero)
  - H2: 2xl-3xl (sections)
  - H3: xl-2xl (subsections)
  - Body: base-lg

### 4️⃣ SEO + BLOG STRUCTURE
**Current Pages Check**:
- [ ] Verify `<title>` tags (unique per page)
- [ ] Verify `<meta name="description">` (unique, 150-160 chars)
- [ ] Add Open Graph tags:
  ```html
  <meta property="og:title" content="..." />
  <meta property="og:description" content="..." />
  <meta property="og:image" content="..." />
  ```
- [ ] Check H1 hierarchy (one H1 per page)
- [ ] Verify canonical URLs

**Blog/Articles Setup**:
- [ ] Create `/src/pages/blog/` directory
- [ ] Create blog layout: `/src/layouts/BlogLayout.astro`
- [ ] Suggested articles (focused on "Your Requests Are Commands"):
  1. "How to Automate WooCommerce Orders via WhatsApp"
  2. "Connect Your CRM to Customer Chats with Webhooks"
  3. "Turn Customer Messages into Odoo Actions"

### 5️⃣ CONTENT ACCURACY vs BotSailor
**Audit Checklist**:
- [ ] Compare features listed on MeaChat with BotSailor capabilities
- [ ] Verify channel support matches BotSailor
- [ ] Check integration list accuracy
- [ ] Review limits/quotas:
  - Number of bots
  - Subscriber limits
  - Message limits
  - Broadcast frequency
- [ ] Add "Fair Use Policy" mention in pricing:
  ```
  "Designed for normal business use. Excessive usage may require plan upgrade."
  ```
- [ ] Avoid promises like "unlimited" without clear fair-use clause

### 6️⃣ "YOUR REQUESTS ARE COMMANDS" MESSAGING
**Rewrite These Sections**:

**Hero Section** (Arabic example):
```
كل رسالة من عميلك = أمر مباشر لأنظمتك
اربط ميتشات مع أي نظام عبر Webhook أو API،
وخلّ كل محادثة تشتغل لك بالخلفية:
✅ إنشاء طلب في Odoo
✅ تحديث المخزون في WooCommerce
✅ إرسال فاتورة عبر البريد
✅ فتح تذكرة دعم
كل هذا، تلقائي، بدون تدخل بشري.
```

**Integrations Section**:
```
لو نظامك يدعم API أو Webhook، ميتشات يقدر يتفاهم معه.
جاهز مع: Shopify, WooCommerce, Google Sheets, وأكثر.
مرن مع: n8n, Odoo, Zapier، وأي REST API.
```

**Use Cases** (create new section if missing):
- E-commerce: Customer asks "Where's my order?" → Bot pulls status from Odoo/Shopify
- Support: "I need help" → Creates ticket in CRM
- Booking: "Book for 3pm" → Updates Google Calendar
- Sales: "Send quote" → Triggers invoice generation

### 7️⃣ ACTION CHECKLIST (TODO for Developer)

#### URGENT (Fixes Build)
- [ ] Fix `src/pages/ar/pricing.astro`: Change `AddonsAr` import to `Addons` with `locale="ar"`
- [ ] Update `Addons.astro` to accept `locale` prop and use i18n files

#### HIGH PRIORITY
- [ ] Refactor all components to use `locale` prop (start with pricing-related components)
- [ ] Add missing i18n keys to `ar.ts` and `en.ts` (especially for Integrations section)
- [ ] Update Hero section text to emphasize "Your Requests Are Commands"
- [ ] Create "Fair Use Policy" section in Pricing page

#### MEDIUM PRIORITY
- [ ] Audit and unify Tailwind spacing classes across all pages
- [ ] Standardize button components (create `Button.astro` if needed)
- [ ] Add Open Graph meta tags to all pages
- [ ] Create blog directory structure under `/src/pages/blog/`

#### LOW PRIORITY
- [ ] Write 3 blog articles about automation use cases
- [ ] Add structured data (JSON-LD) for SEO
- [ ] Create comparison table: MeaChat vs competitors

---

## HOW TO USE THIS FILE

### In VS Code with Copilot:
1. Open this file
2. Select all (Ctrl+A / Cmd+A)
3. Open Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I)
4. Type:
   ```
   @workspace Review the MeaChat project according to COPILOT_MEACHAT_REVIEW.md.
   Start with urgent fixes, then provide detailed recommendations for each of the 7 areas.
   ```

### In Copilot Chat (Direct Command):
```
Analyze the MeaChat Astro project and:
1. Fix the build error in src/pages/ar/pricing.astro
2. Refactor components to use unified i18n with locale props
3. Audit design consistency and brand identity
4. Review content accuracy vs BotSailor capabilities
5. Rewrite messaging to emphasize "Your Requests Are Commands"
6. Provide a prioritized TODO list
```

---

## IMPORTANT REMINDERS
- **DO NOT** create separate Arabic component files (e.g., `ComponentAr.astro`)
- **DO** use single components with `locale` prop
- **DO NOT** promise "unlimited" features without fair-use disclaimer
- **DO** emphasize Webhook/API flexibility as core differentiator
- **DO NOT** add features that BotSailor doesn't support
- **DO** keep Arabic text natural (Khaleeji/Gulf style preferred)

---

**Last Updated**: 2025-12-28  
**Maintainer**: @emad-masaud  
**Status**: 🔴 URGENT - Build failing, needs immediate attention
