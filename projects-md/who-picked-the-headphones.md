---
title: "Who Picked the Headphones"
slug: "who-picked-the-headphones"
tag: "experiment"
date: "2026-06"
description: "Six AIs, one two-sentence request. Watch where the details in the output actually come from — and find the gap where your intention was supposed to go."
source: "projects/who-picked-the-headphones/index.html"
format: "scroll-driven experiment built on ~15 screenshots of six models' generated pages across three prompt rounds — the argument lives in comparing those images"
---

# Who Picked the Headphones

How can two sentences of input produce a whole, detailed webpage? The experiment traces where the details actually come from, and where the user's intention was supposed to go.

## Round 1: the bare prompt

One prompt, sent to six models independently (deepseek-v4-pro, opus-4.8, mimo-v2.5, kimi-k2.6, gpt-5.5, gemini-3.5-flash):

> make a single file html page with a realistic mockup of a product page from an e-commerce site. use realistic mockup text but leave images as boxes.

No product, no brand, no price. What the screenshots show them converging on, unprompted:

- **The product.** The default is **over-the-ear wireless noise-cancelling headphones** — four of six chose exactly that. gpt-5.5 made a backpack; gemini-3.5-flash made a projector.
- **The color.** Four models picked the **identical name, "Midnight Black."** The two odd ones out picked an atmospheric noun + color: "Storm Gray" (gpt), "Nebula Violet" (gemini).
- **The reviewer.** Four pages invented a glowing "verified purchase" review from a customer named **Sarah** — and the surnames arrived in matched pairs: two **Sarah K.** (deepseek, opus), two **Sarah L.** (gemini, mimo).
- **The furniture nobody asked for.** Navigation, image galleries, descriptions, reviews, a ★4.7 rating, a strikethrough discount, a buy-box — a full working store.

This is what people point at when they say "**slop**": nothing on the pages is *wrong*, and nothing on them is *anyone's*. Every detail rests at its most expected setting — the dead center of the genre, unedited.

## Why the magic and the slop are the same thing

"A product page" isn't a specification; it's a reference to something the user and the model have both seen a million times. Two sentences bought a thousand decisions the user never had to make or even know about. **Whatever you don't say still gets decided** — each gap fills with the most expected choice, and the most expected choice carries no one's intent. The magic (it knew what you meant) and the slop (none of it is yours) run on the same machinery; the only difference is whether anyone is actually deciding.

## Round 2: naming an exemplar

Add one clause — *"give the page an apple.com design and aesthetic"* — and the four models independently produce **the same look**: vast white space, giant type, the product floating alone against nothing.

But it isn't Apple-*like*; it's Apple. The screenshots and code show:

- Generated headline **"Pro. Beyond."** — Apple's real iPhone 14 Pro campaign tagline.
- **`<title>Aura Pro — Apple</title>`** — three of four titles claim to *be* Apple.
- **$549** — AirPods Max's exact launch price.
- **"A19 Pro chip"** — Apple's real chip line.

Form and content arrive **entangled**. The clause asked only for a *look*, but in everything the model has read, Apple's look and Apple's catalog travel together — ask for one and the other comes with it. Naming an exemplar doesn't inject your intent; it swaps the genre's defaults for *someone else's*. Precision is not intention.

## Round 3: the turn — a qualities-only brief

To strip out anything to impersonate, the exemplar is replaced with a design brief that is pure description — gpt-5.5's own account of apple.com's iPad page, with brand and product removed: *"spacious, luminous, meticulously composed… restrained palette, generous negative space… emphasize precision, thinness, material quality, and everyday elegance."*

Now the pages are **no longer Apple but still unmistakably that vibe** — cream and off-white palettes, thin serif headlines, generous negative space, museum-label captions — and, inside that shared mood, four genuinely different pages.

Except the content crept back. Described as thin, luminous, and weightless, four models each built a ~$1,000 aluminum slab: **The L-1** ("single billet of aerospace-grade alloy," 4.2 mm thin, $1,280), **Auralis One** ($899), **Lumen Slate** ("a surface so thin it disappears into the room," $1,290), **MONO** ($780). Describe a form, and its content creeps back in.

## So who *did* pick the headphones?

Nobody picked them. The user picked a **genre** — product pages — and that genre implied the headphones, the Midnight Black, and Sarah's review without anyone ever having to say so. Specifying a style, an exemplar, or a mood each just relocates the defaults; the one thing that never arrives on its own is the user's actual intention.
