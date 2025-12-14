# Assets Migration Guide

This guide documents all image and asset files that need to be copied from the **meachat-homepage** repository to the **meachat-astro** repository.

## Source Repository
`https://github.com/emad-masaud/meachat-homepage/tree/main/assets`

## Destination
`public/assets/` in meachat-astro repository

---

## 🖼️ Images to Copy

### 1. Logo Files
**Source:** `meachat-homepage/assets/img/logo/`  
**Destination:** `public/assets/img/logo/`

- ✅ MeaChat-Light.svg (Main logo used in Header)
- Copy all other logo variations from the source folder

### 2. Hero Section Images
**Source:** `meachat-homepage/assets/img/`  
**Destination:** `public/assets/img/`

- ✅ **human-avatar.jpg** - Used in Hero chat bubbles
- ✅ **hero-bg.jpeg** - Hero section background image
- hero-bg.jpg (alternative)
- hero-bg.webp (WebP version)

### 3. Channel Icons
**Source:** `meachat-homepage/assets/img/channels/`  
**Destination:** `public/assets/img/channels/`

- ✅ **whatsapp.webp** - WhatsApp channel icon
- ✅ **facebook.webp** - Facebook/Messenger icon
- ✅ **instagram.webp** - Instagram icon
- ✅ **telegram.webp** - Telegram icon
- ✅ **webchat.webp** - WebChat icon

### 4. Integration Service Logos (SVG)
**Source:** `meachat-homepage/assets/img/integration/`  
**Destination:** `public/assets/img/integration/`

#### Messaging & Social (4 files)
- ✅ whatsapp.svg
- ✅ messenger.svg
- ✅ instagram.svg
- ✅ telegram.svg

#### E-commerce (4 files)
- ✅ shopify.svg
- ✅ woocommerce.svg
- ✅ stripe.svg
- ✅ paypal.svg

#### CRM & Support (4 files)
- ✅ salesforce.svg
- ✅ hubspot-seeklogo.svg
- ✅ zendesk-seeklogo.svg
- ✅ intercom.svg

#### Google Services (4 files)
- ✅ gmail.svg
- ✅ google-translate.svg
- ✅ google-maps.svg
- ✅ google-sheets.svg

#### Amazon Web Services (4 files)
- ✅ aws-s3.svg
- ✅ aws-ses.svg
- ✅ amazon-dynamodb.svg
- ✅ amazon-rds.svg

#### AI & Automation (5 files)
- ✅ openai.svg
- ✅ deepseek.svg
- ✅ n8n.svg
- ✅ make-color.svg
- ✅ zapier-seeklogo.svg

---

## 📁 Directory Structure to Create

```
public/assets/
├── css/
│   └── style.css (✅ Already created)
├── img/
│   ├── README.md (✅ Already created)
│   ├── .gitkeep (✅ Already created)
│   ├── human-avatar.jpg
│   ├── hero-bg.jpeg
│   ├── logo/
│   │   └── MeaChat-Light.svg
│   ├── channels/
│   │   ├── whatsapp.webp
│   │   ├── facebook.webp
│   │   ├── instagram.webp
│   │   ├── telegram.webp
│   │   └── webchat.webp
│   └── integration/
│       ├── whatsapp.svg
│       ├── messenger.svg
│       ├── instagram.svg
│       ├── telegram.svg
│       ├── shopify.svg
│       ├── woocommerce.svg
│       ├── stripe.svg
│       ├── paypal.svg
│       ├── salesforce.svg
│       ├── hubspot-seeklogo.svg
│       ├── zendesk-seeklogo.svg
│       ├── intercom.svg
│       ├── gmail.svg
│       ├── google-translate.svg
│       ├── google-maps.svg
│       ├── google-sheets.svg
│       ├── aws-s3.svg
│       ├── aws-ses.svg
│       ├── amazon-dynamodb.svg
│       ├── amazon-rds.svg
│       ├── openai.svg
│       ├── deepseek.svg
│       ├── n8n.svg
│       ├── make-color.svg
│       └── zapier-seeklogo.svg
```

---

## 🚀 Quick Copy Commands

If you have both repositories cloned locally:

```bash
# Navigate to meachat-astro repository
cd meachat-astro

# Copy logo files
mkdir -p public/assets/img/logo
cp ../meachat-homepage/assets/img/logo/* public/assets/img/logo/

# Copy hero images
cp ../meachat-homepage/assets/img/human-avatar.jpg public/assets/img/
cp ../meachat-homepage/assets/img/hero-bg.jpeg public/assets/img/

# Copy channel icons
mkdir -p public/assets/img/channels
cp ../meachat-homepage/assets/img/channels/* public/assets/img/channels/

# Copy integration logos
mkdir -p public/assets/img/integration
cp ../meachat-homepage/assets/img/integration/* public/assets/img/integration/

# Commit the changes
git add public/assets/img/
git commit -m "Add all image assets from meachat-homepage"
git push
```

---

## ✅ Components Using These Assets

### Header.astro
- `/assets/img/logo/MeaChat-Light.svg`

### Hero.astro
- `/assets/img/human-avatar.jpg`
- `/assets/img/hero-bg.jpeg` (background)

### Channels.astro
- `/assets/img/channels/whatsapp.webp`
- `/assets/img/channels/facebook.webp`
- `/assets/img/channels/instagram.webp`
- `/assets/img/channels/telegram.webp`
- `/assets/img/channels/webchat.webp`

### Integrations.astro
- All 25 SVG files from `/assets/img/integration/`

---

## 📊 Summary

- **Total Files to Copy:** ~35 files
- **Logo Files:** 1+ files
- **Hero Images:** 2-4 files
- **Channel Icons:** 5 files
- **Integration Logos:** 25 SVG files

**Status:** Directory structure created ✅  
**Next Step:** Copy actual image files from source repository
