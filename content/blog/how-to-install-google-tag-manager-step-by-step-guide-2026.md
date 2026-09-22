---
title: "How to Install Google Tag Manager - Step-by-Step Guide (2026)"
date: "2026-09-22"
description: "Learn how to install Google Tag Manager on your website in 2026. Follow this step-by-step guide to create a GTM account, install the container, configure tags, test tracking, and publish your setup."
image: /images/how-to-install-google-tag-manager.jpg
category: Tracking
author: "Vinay Yadav"
---

**Category:** [Tracking](/category/tracking)

If you want to track website actions properly, **Google Tag Manager (GTM)** is one of the most useful tools you can add to your website.

Instead of adding separate tracking code every time you want to measure a button click, form submission, phone call, WhatsApp click, Google Ads conversion, or other event, you can manage much of your tracking from one place.

The good thing is that you don't need to be an experienced developer to get started.

In this guide, we'll walk through **how to install Google Tag Manager**, create a container, add the GTM code to your website, test the installation, and publish your first setup.

## What Is Google Tag Manager?

Google Tag Manager is a tag management system that lets you add and manage tracking tags through a web interface instead of repeatedly editing your website's code.

A **tag** is a piece of code or tracking configuration that performs a specific job.

For example, you might use tags to send information to:

* Google Analytics 4
* Google Ads
* Meta Ads
* Conversion tracking platforms
* Remarketing systems
* Third-party marketing tools
* Custom tracking scripts

GTM also uses **triggers** to determine when a tag should fire and **variables** to provide additional information to the tag.

Google describes a container as a collection of tags, triggers, variables, and related configurations for a website or app.

This makes GTM particularly useful when you're running paid advertising and need reliable **conversion tracking**.

If you're new to conversion tracking, you may also want to read our guide on [Google Tag Manager setup and tracking](/blog/google-tag-manager-guide-setup-tracking-beginners-2026).

---

## Why Should You Install Google Tag Manager?

Before learning the actual installation process, it's worth understanding why GTM is useful.

Without Tag Manager, you may need to ask a developer to add or change tracking code whenever you want to measure a new action.

With GTM, many tracking changes can be handled directly inside the Tag Manager interface.

For example, imagine your website has:

* A contact form
* A phone number
* A WhatsApp button
* A "Book a Call" button
* A newsletter form
* Several landing pages

You may want to track each action separately.

Instead of creating completely different pieces of code directly inside your website, you can use GTM to create individual tags and triggers.

This is especially useful for businesses running [Google Ads campaigns](https://scalewithclicks.com/services/google-ads-agency), Meta campaigns, lead-generation campaigns, or ecommerce advertising.

---

# How to Install Google Tag Manager Step by Step

The installation process is fairly straightforward.

There are four main stages:

1. Create a Google Tag Manager account
2. Create a web container
3. Install the GTM code on your website
4. Test and publish the container

Let's go through each one.

## Step 1: Go to Google Tag Manager

Start by visiting:

**tagmanager.google.com**

Sign in using your Google Account.

Once you're inside Google Tag Manager, you'll be able to create an account and container for your website.

Google's current setup process requires you to have a Tag Manager account and container before installing the web container on your site.

---

## Step 2: Create a Google Tag Manager Account

If you don't already have a GTM account, select **Create Account**.

You'll generally need to enter:

**Account Name:**
Your business or organization name.

**Country:**
Select your country.

**Container Name:**
Usually your website domain.

For example:

`scalewithclicks.com`

Under **Target Platform**, select:

**Web**

Then click **Create**.

Google Tag Manager will create a web container for your website.

### What is a GTM container?

A container is essentially the workspace where your website's tags, triggers, variables, and related configurations are managed.

For example, one website might have tags for:

* GA4
* Google Ads
* Meta Pixel
* Phone clicks
* WhatsApp clicks
* Form submissions

All of these can be managed inside the website's GTM container.

---

## Step 3: Copy Your Google Tag Manager Code

After creating the container, Google Tag Manager will provide installation instructions.

You'll receive **two snippets of code**.

The first snippet belongs inside the `<head>` section of your website.

The second snippet belongs immediately after the opening `<body>` tag.

Google's current documentation recommends placing the first snippet as high in the `<head>` as possible and the second snippet immediately after the opening `<body>` tag.

Your code will look similar to this:

```html
<!-- Google Tag Manager -->
<script>
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;
f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');
</script>
<!-- End Google Tag Manager -->
```

Your actual container ID will be different.

It will look something like:

`GTM-XXXXXXX`

**Don't copy the example ID above. Use the ID generated for your own container.**

---

# Step 4: Add GTM Code to Your Website

This is the part that sometimes causes confusion.

You need to add the GTM snippets to your website's code.

### For a custom HTML website

If you have direct access to your HTML files, place the first snippet inside the `<head>` section.

For example:

```html
<head>

<!-- Google Tag Manager -->
YOUR GTM HEAD CODE
<!-- End Google Tag Manager -->

<title>Your Website</title>

</head>
```

Then place the second GTM snippet immediately after `<body>`:

```html
<body>

<!-- Google Tag Manager (noscript) -->
YOUR GTM NOSCRIPT CODE
<!-- End Google Tag Manager (noscript) -->

<!-- Website content -->

</body>
```

If your website has multiple HTML pages, make sure the container code is included across the pages where you want GTM to operate.

Google recommends installing the container snippets on each page of the website.

---

# Installing Google Tag Manager on WordPress

If your website runs on WordPress, the process can be different depending on the theme, hosting setup, or plugin you're using.

Some website builders and CMS platforms provide integrated ways to add Google tags or tracking code, while others allow you to add custom code manually. Google specifically provides platform instructions for systems including WordPress, Shopify, Wix, Webflow, WooCommerce and others.

The important thing is to avoid accidentally installing the same tracking setup multiple times.

If you're already using another tracking plugin, check what it is installing before adding additional code.

---

# Installing GTM on Shopify and Other Platforms

Platforms such as Shopify, Wix, Webflow and WooCommerce can have their own tracking and integration options.

The exact process depends on the platform and the tracking setup you're using.

Before adding GTM manually, check whether your platform already has an official integration or supported method.

This is particularly important for ecommerce websites because duplicate tracking can create problems such as:

* Duplicate purchases
* Inflated conversions
* Incorrect revenue
* Duplicate page views
* Conflicting pixels

Google recommends using the appropriate platform-specific installation method where available.

---

# Step 5: Verify Your Google Tag Manager Installation

Don't assume GTM is working just because you've pasted the code.

Always test it.

Inside Google Tag Manager, click **Preview**.

This launches Google Tag Assistant.

Enter your website URL and connect to the site.

Google's current verification process uses Preview to launch Tag Assistant and connect it to your website.

If the connection is successful, you should be able to see your GTM container and related events.

This is one of the easiest ways to confirm that the installation is working.

![Google Tag Manager Preview and Tag Assistant](/images/google-tag-manager-tag-assistant.jpg)


---

# Step 6: Create Your First GTM Tag

Once the container is installed, you can start adding tracking.

Go to:

**Tags → New**

Give the tag a clear name.

For example:

`GA4 - Google Tag`

or:

`Google Ads - Lead Conversion`

or:

`WhatsApp Click - GA4`

The naming convention matters more than people think.

If you eventually have 30 or 50 tags inside the container, names like "Tag 1" and "Tag 2" become difficult to manage.

Use descriptive names from the beginning.

---

# Step 7: Understand Tags, Triggers and Variables

This is probably the most important concept to understand when learning **Google Tag Manager tracking**.

### Tags

Tags perform an action.

For example:

**GA4 Event Tag**

sends an event to Google Analytics.

### Triggers

Triggers decide when the tag should fire.

Examples include:

* Page View
* Click
* Form Submission
* Scroll Depth
* Custom Event
* YouTube Video
* Element Visibility

### Variables

Variables provide additional information to your tags and triggers.

For example:

* Click URL
* Click Text
* Page URL
* Page Path
* Form ID
* Transaction ID

A simple way to remember it is:

**Tag = What should happen?**

**Trigger = When should it happen?**

**Variable = What information should be used?**

Once this becomes clear, building GTM tracking becomes much easier.

---

# Step 8: Set Up Conversion Tracking

Installing GTM is only the beginning.

The real value comes from using it to measure meaningful actions.

For a lead-generation website, you might track:

* Contact form submissions
* Phone clicks
* WhatsApp clicks
* Email clicks
* Book-a-call clicks
* Landing-page interactions

For ecommerce websites, you may track:

* View item
* Add to cart
* Begin checkout
* Purchase

This information can then be sent to analytics and advertising platforms.

For businesses running paid campaigns, accurate tracking helps distinguish between someone who simply visited a page and someone who actually became a lead or customer.

If you're working on this area, our [conversion tracking services](https://scalewithclicks.com/services/conversion-tracking) can help businesses build a more structured measurement setup.

---

# Common Google Tag Manager Installation Mistakes

A few mistakes appear again and again when people install GTM.

## 1. Using the wrong container ID

Your container ID begins with:

`GTM-`

Don't accidentally use your GA4 Measurement ID, which normally begins with:

`G-`

These are different things.

## 2. Installing GTM more than once

Duplicate GTM installations can create unexpected tracking behavior.

Check your website source code and plugins before adding another installation.

## 3. Installing only the head snippet

The GTM installation uses two snippets.

Don't simply copy one piece and ignore the other.

## 4. Not testing before publishing

Always use Preview and Tag Assistant before publishing your changes.

## 5. Creating confusing tag names

Good naming saves a lot of time later.

For example:

`GA4 - Form Submit - Contact`

is much easier to understand than:

`Test Tag 3`.

## 6. Tracking clicks without checking the actual destination

A click trigger can fire on the wrong element if the conditions aren't specific enough.

This is particularly common with buttons containing icons, nested `<span>` elements, or dynamically generated links.

---

# Do You Need Google Tag Manager and Google Analytics?

They serve different purposes.

**Google Analytics 4** is primarily used to collect and analyze website and app data.

**Google Tag Manager** is a system for managing and deploying tags.

You can use GTM to deploy Google Analytics-related tags, Google Ads tracking, third-party marketing tags and custom tracking configurations.

Google also notes that the Google tag can be used with both Google Analytics and Google Ads as destinations, while Tag Manager provides additional tag-management capabilities.

So, installing GTM does not replace GA4.

Instead, GTM can help you manage how tracking is implemented.

---

# Should You Install GTM if You Already Have Google Analytics?

Yes, you can use both.

If GA4 is already installed directly on your website, however, don't blindly install another GA4 setup through GTM.

That can result in duplicate data.

Before migrating an existing setup, identify how the current Google tag or GA4 tracking is implemented.

Google's documentation also highlights the importance of avoiding duplicate Google tags and provides migration guidance for sites moving to Tag Manager.

---

# How to Publish Google Tag Manager

Once you've tested your setup:

1. Return to Google Tag Manager.
2. Review your tags and triggers.
3. Click **Submit**.
4. Select **Publish and Create Version**.
5. Add a version name.
6. Add a short description if required.
7. Publish the container.

Google recommends testing tags before publishing and provides version history so changes can be reviewed later.

A simple version name could be:

`Initial GTM Setup`

or:

`GA4 + Lead Tracking Setup`

This makes future troubleshooting easier.

---

# Google Tag Manager Installation Checklist

Before considering your setup complete, check the following:

* [ ] GTM account created
* [ ] Web container created
* [ ] Correct `GTM-` container ID used
* [ ] Head snippet installed
* [ ] Body snippet installed
* [ ] Installation tested with Tag Assistant
* [ ] Existing tracking checked for duplicates
* [ ] Tags created
* [ ] Triggers configured
* [ ] Variables configured where required
* [ ] Conversion events tested
* [ ] Container published
* [ ] Changes documented

---

# Final Thoughts

Learning **how to install Google Tag Manager** isn't particularly difficult. The installation itself can usually be completed in a few steps.

The bigger challenge is building a tracking structure that accurately measures what matters to your business.

Installing GTM is therefore not the finish line. It's the foundation.

Once it's working, you can use it to manage Google Analytics events, Google Ads conversions, phone clicks, form submissions, WhatsApp clicks, ecommerce events and other marketing measurements without constantly adding new tracking scripts directly to your website.

If you're running paid advertising, reliable measurement becomes even more important because campaign decisions are only as useful as the conversion data behind them.

For businesses looking to improve their [Google Ads management](https://scalewithclicks.com/services/google-ads-agency), [Meta Ads campaigns](https://scalewithclicks.com/services/meta-ads-agency), SEO and conversion measurement, having a clean tracking setup is an important part of the overall marketing system.

You can also explore our [SEO services](https://scalewithclicks.com/services/seo-services) if you're looking at tracking and organic growth together.

And if you want to learn more about practical tracking implementation, continue with our [Google Tag Manager guide for beginners](/blog/google-tag-manager-guide-setup-tracking-beginners-2026), where we go deeper into tags, triggers, variables and event tracking.

For more information about our performance marketing services, visit [Scale With Clicks](https://scalewithclicks.com/).

---

## Frequently Asked Questions

### Is Google Tag Manager free?

Yes. Google Tag Manager is available as a free tag management system. Google also offers additional enterprise capabilities through Tag Manager 360.

### How long does Google Tag Manager take to install?

For a basic website, the installation can be completed quickly if you have access to the website code. The amount of time required for the complete tracking setup depends on how many events and platforms need to be configured.

### Do I need coding knowledge to use GTM?

You can perform many common GTM tasks without advanced coding knowledge. However, understanding basic HTML, CSS selectors, JavaScript and the dataLayer can be extremely helpful for more advanced implementations.

### Can Google Tag Manager track button clicks?

Yes. GTM can be configured to track clicks and send those interactions to platforms such as Google Analytics or Google Ads.

### Can I use GTM for Google Ads conversion tracking?

Yes. Google Tag Manager can be used to deploy and manage Google Ads-related tracking configurations. The exact setup depends on the conversion action and how your website is implemented.

### Is Google Tag Manager the same as Google Analytics?

No. Google Analytics is an analytics platform, while Google Tag Manager is a tag management system. They can be used together.

### What should I do after installing GTM?

Start by testing the installation, then build your tracking plan. Identify the business actions that matter—such as leads, purchases, calls or bookings—and create tags and triggers around those actions.

---
