---
title: "Asking a Machine for Ideas"
slug: "ideas-bakery-strategy"
tag: "essay"
date: "2026-06"
description: "A bakery thought experiment about what happens when we ask AI for more, novel, or not-obvious ideas before we know exactly what we want."
source: "projects/ideas-bakery-strategy/index.html"
format: "essay with interactive data-viz figures — 'density well' charts and a clickable grid of each model's top-5 ideas drive the argument"
---

# Asking a Machine for Ideas

When we ask AI to *do* something, we can usually picture the result and describe it. When we ask it to *brainstorm*, we are asking for an idea we don't have yet — so we reach for words like **more**, **novel**, and **not-obvious**. The essay tests what an AI actually hears when those words go into a prompt.

## The setup

One prompt, run across seven models (deepseek-v4-pro, minimax-m3, glm-5.2, gemini-3.5-flash, gemini-3.1-pro, gpt-5.5, opus-4.8):

> you run a small town bakery, and a starbucks has just moved into town. give 25 strategies for responding to it. for each, give it a name and a 1 sentence description

The bakery is only a setting where we have strong intuitions to check the answers against. Every idea is tagged into one of three families, which the figures color-code:

- **Neighborly** — local sourcing, artisanal specialty, community events.
- **Business** — generic good-business advice plus MBA-style operations (loyalty cards, drive-thrus, delivery apps).
- **Unconventional** — genuinely strange ideas (a "Bread Bond," an AI mood-scanning kiosk).

A **★** marks any idea that names the rival (Starbucks) — the proxy for staying on the specific question rather than drifting into advice you'd give any bakery.

## The visuals

Two figure types carry the argument. A **"density well"** chart per treatment plots where the 25 ideas pile up across three columns (neighborly / business / unconventional): rival-naming answers cut a deep narrow notch, generic ones spread wide and shallow, and a faint dashed **ghost baseline** of the plain-ask curve sits behind each later treatment so you can read mass *leaving* one well and *arriving* in another. A **clickable grid** shows each model's top five ideas as colored cells, with before/after focal pairs comparing specific strategies.

## The five treatments and what each revealed

1. **The plain ask.** Answers collect in a deep **neighborly** well, with a smaller second **business** well. The models overlap heavily — which says the result isn't really about the models; they are reflecting our own common intuitions back at us.
2. **Ask for *more*** (read further down the list). No new ground — the list just gets less targeted and more business-like. Further, not elsewhere.
3. **Ask for *novel*** ("novel, innovative strategies"). Neighborly stays central and the first unconventional ideas appear, but most just weld a twist onto a baseline idea; even the names get hyped (*Scone-scription*). We meant "make it genuinely new"; the machine heard "make it *sound* new."
4. **Forbid the obvious** ("...but not ones that center on local sourcing, local identity, or unique artisanal features"). The center jumps to the **business** well — generic operations that barely mention Starbucks anymore. This move changed the *content* of the ideas, not their form; we couldn't say what we wanted, but knowing what we *didn't* want was enough to force the shift.
5. **Do both** (novel + the ban). It relocates like *not-obvious*, then twists like *novel* — the invention, now in the business well, turns into apps, kiosks, and gadgets.

## The mapping

Two things vary independently: the **neighborhood** an idea sits in (its content) and the **building** itself (its form).

- **more** → more buildings on the same street.
- **novel** → a strange building in the same old neighborhood.
- **not-obvious** → a new neighborhood of familiar building styles.
- **both** → surprising buildings in a new neighborhood.

These four words are not loose synonyms for "give me something better" — the AI, reflecting our own meaning back, did visibly different things with each, which is the evidence that the distinctions are real. New-in-form and new-in-content are separate requests, and the useful first step is deciding which one you actually want. The essay is careful about its own limits: this is one strongly-scripted setting with an obvious runner-up well, so the exact map won't transfer everywhere, and which lever you want depends on the situation.
