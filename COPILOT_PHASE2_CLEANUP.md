# COPILOT PHASE 2: Cleanup & Complete i18n

## 🎯 URGENT TASKS

### 1️⃣ DELETE Duplicate Arabic Files

**❌ CRITICAL: These files MUST be deleted immediately:**

```bash
src/components/AddonsAr.astro
src/components/ChannelsAr.astro  
src/components/FAQ-ar.astro (if exists)
```

**Why**: We use SINGLE components with `locale` prop, NOT separate Arabic files.

**How to delete in VS Code**:
1. Right-click on each file → Delete
2. Stage changes
3. Commit with message: "Remove duplicate Arabic components"

---

### 2️⃣ UPDATE Remaining Components

**Components that NEED `locale` prop support:**

#### Priority 1 (Pricing page):
- [ ] `PricingHero.astro`
- [ ] `PricingPlans.astro`

#### Priority 2 (Homepage):
- [ ] `Hero.astro` (partially done, needs full i18n)
- [ ] `Features.astro`
- [ ] `Channels.astro`
- [ ] `Integrations.astro`

#### Priority 3 (Supporting):
- [ ] `Faq.astro`
- [ ] `ExpertSupport.astro`
- [ ] `Testimonials.astro`
- [ ] `Cta.astro`
- [ ] `ComparisonTable.astro`

**Pattern to follow (EXACTLY like Addons.astro):**

```astro
---
interface Props {
  locale?: 'ar' | 'en';
}
const { locale = 'en' } = Astro.props;

import { ar } from '../i18n/ar';
import { en } from '../i18n/en';

const t = locale === 'ar' ? ar : en;
const dir = locale === 'ar' ? 'rtl' : 'ltr';
---

<section id="section-name" dir={dir}>
  <h2>{t.sectionName.title}</h2>
  <p>{t.sectionName.description}</p>
</section>
```

---

### 3️⃣ ADD Missing Translations

**Check `src/i18n/ar.ts` and `src/i18n/en.ts` for these sections:**

```typescript
// Example structure needed:
export const ar = {
  // ... existing ...
  
  hero: {
    title: 'كل رسالة من عميلك = أمر مباشر لأنظمتك',
    subtitle: 'طلباتك أوامر',
    description: 'اربط ميتشات مع أي نظام عبر Webhook أو HTTP API...',
    // ...
  },
  
  features: {
    title: 'مميزات قوية',
    items: [
      { title: '...', description: '...' },
      // ...
    ]
  },
  
  integrations: {
    title: 'تكاملات مرنة',
    description: 'لو نظامك يدعم API أو Webhook، ميتشات يقدر يتفاهم معه.',
    // ...
  },
  
  // ... and so on for all sections
};
```

---

### 4️⃣ UPDATE Pages to Pass `locale`

#### Arabic Pages (`src/pages/ar/*.astro`):

**Update these files:**
- `ar/index.astro`
- `ar/pricing.astro` (already done for Addons)

**Pattern:**
```astro
<Hero locale="ar" />
<Features locale="ar" />
<Channels locale="ar" />
<Integrations locale="ar" />
<Addons locale="ar" />
<Faq locale="ar" />
<Cta locale="ar" />
```

#### English Pages (default):

Optionally pass `locale="en"` or leave default:
```astro
<Hero />
<Features />
<!-- OR explicitly -->
<Hero locale="en" />
```

---

## 🛡️ CRITICAL RULES

### ❌ NEVER DO:
1. **DO NOT create files like `ComponentAr.astro`** - this defeats the purpose!
2. **DO NOT hardcode Arabic/English text** in component files
3. **DO NOT skip RTL support** - always add `dir={locale === 'ar' ? 'rtl' : 'ltr'}`
4. **DO NOT forget** to import both `ar` and `en` in each component

### ✅ ALWAYS DO:
1. **USE single component files** with `locale` prop
2. **PULL all text from i18n files** (`ar.ts`, `en.ts`)
3. **ADD RTL/LTR** direction attribute to section wrapper
4. **TEST both languages** after changes
5. **KEEP Arabic text natural** (Khaleeji/Gulf style)

---

## 🧹 STEP-BY-STEP EXECUTION

### Step 1: Delete duplicates
```bash
rm src/components/AddonsAr.astro
rm src/components/ChannelsAr.astro
rm src/components/FAQ-ar.astro  # if exists
git add .
git commit -m "Remove duplicate Arabic components"
```

### Step 2: Start with PricingHero
1. Open `src/components/PricingHero.astro`
2. Add locale prop (copy pattern from Addons.astro)
3. Extract all text to `ar.ts` and `en.ts` under `pricing.hero.*`
4. Replace hardcoded strings with `{t.pricing.hero.title}` etc.
5. Add `dir={dir}` to wrapper element
6. Test on `/pricing` and `/ar/pricing`

### Step 3: Continue with other components
Repeat Step 2 for each component in priority order.

### Step 4: Update all pages
- Add `locale="ar"` to all components in `src/pages/ar/*.astro`
- Verify English pages still work (default locale)

### Step 5: Build & Test
```bash
npm run build
# Should pass without errors
```

---

## 📝 COMPLETION CHECKLIST

Before marking this task complete:

- [ ] All `*Ar.astro` files deleted
- [ ] All priority components support `locale` prop
- [ ] All text extracted to i18n files
- [ ] RTL support added to all sections
- [ ] Arabic pages pass `locale="ar"` to all components
- [ ] `npm run build` passes successfully
- [ ] Both `/` and `/ar/` routes work correctly
- [ ] Content displays in correct language
- [ ] RTL layout works properly on Arabic pages

---

## 👁️ HOW TO USE THIS FILE

### In VS Code:
1. Open this file
2. Read through each section carefully
3. Follow Step-by-Step Execution in order
4. Check off items in Completion Checklist as you go

### With Copilot:
Open Copilot Chat and say:
```
@workspace Execute the tasks in COPILOT_PHASE2_CLEANUP.md.
Start by deleting duplicate Arabic files, then refactor components one by one following the pattern from Addons.astro.
```

---

**Status**: 🔴 URGENT - Duplicate files exist, cleanup needed  
**Priority**: HIGH - Must complete before adding new content  
**Estimated Time**: 2-3 hours for all components
