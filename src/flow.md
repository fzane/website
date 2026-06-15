# Continuous Flow Layout

A layout system for long-form scroll pages that present an argument in
staged beats — the territory usually claimed by slide decks — while
behaving like a document. Developed in
`drafts/types-of-intelligence/index-v7.html`; this file records the
structural rules so the style can be applied consistently to other
pages. It deliberately excludes visual styling (color, type families,
decoration): those belong to each page's own design system.

## The core idea

A presentation and an essay sit at two ends of a spectrum:

- A **presentation** quantizes content into screen-sized units. The
  unit of meaning is the slide; the reader's position is always "on"
  exactly one of them; navigation is discrete.
- An **essay** is one continuous column. The unit of meaning is the
  argument; the reader's position is wherever they happen to be;
  navigation is free scroll.

Continuous flow takes the *content discipline* of a presentation — one
idea per beat, each beat built as headline + evidence + takeaway — and
the *physics* of an essay: free scroll, natural heights, no forced
alignment. The page is a single column of beats that the reader moves
through at their own pace, with a small number of full-screen moments
reserved for the points that earn them.

## What it keeps from presentations

- **Beats.** Content is still authored as discrete, self-contained
  units, each making exactly one point. A beat that needs two points
  is two beats.
- **Staging.** Beats appear in a deliberate order and can reveal on
  entry (see Motion below). The author still controls pacing through
  structure, just not through a viewport lock.
- **Moments.** A few beats keep the full screen — the title, the
  finale, and the major assertions the whole argument pivots on.
  Filling the viewport is the strongest emphasis the medium has;
  it works *because* it is rare.
- **Acts.** Beats group into a handful of named chapters with explicit
  openers, and wayfinding (rail, progress indicators) operates at act
  level.

## What it rejects from presentations

- **Screen-sized units.** No `min-height: 100vh` on ordinary beats. A
  beat is as tall as its content plus rhythm spacing. Padding a short
  beat to fill a screen is dead air, and the amount of dead air varies
  with the reader's viewport — the design degrades on exactly the
  displays where it has the most room.
- **Snapping.** No scroll-snap, no JS settle/snap-back. Any mechanism
  that moves the page after the reader stops fights the reader's sense
  of control, and the fight gets worse as viewports get taller. If a
  beat must be framed, that is what a full-screen moment is for —
  composition, not force.
- **Uniform headline scale.** A display-scale headline every screenful
  is what makes a page read as a deck even with snapping removed. Each
  recurrence of the biggest type registers as "new slide." Display
  scale is reserved for act openers and moments; interior beats get
  crossheads a tier or two down, on a single line.
- **Per-beat furniture.** No page numbers, no per-beat footers, no
  "N / M" counters. A flowing page has no page boundaries to number.
  Wayfinding that enumerates beats reintroduces the deck mentally even
  when the layout doesn't.

## Structural roles

Every section on the page has exactly one of three roles:

1. **Moment** — full viewport height (`min-height: 100svh`), content
   centered. Used for: the title, the finale, and pivotal assertions.
   Budget: roughly a quarter of sections or fewer. If a background
   change is available (e.g. inverted/dark sections), moments are
   where to spend it — a full-bleed band that fills the screen is the
   clearest possible chapter break.
2. **Act opener** — natural height, but keeps the display-scale
   headline and gets extra top padding so the act starts with a
   breath. Carries a small "kicker" index line (act number + name) for
   wayfinding. Follows a moment wherever possible, so the chapter
   break and the chapter heading read as one gesture.
3. **Interior beat** — natural height, tight rhythm spacing,
   crosshead-scale headline on one line, figures pulled close. These
   are the body of the page; several share the viewport at once and
   should read as one continuous column.

## Spacing system

Two spacing values create the entire structure:

- **Within an act:** small, constant vertical padding between beats —
  on the order of 2–4× body line-height (v7 uses
  `clamp(36px, 6vh, 64px)` per beat edge). Tight enough that adjacent
  beats are obviously parts of the same chapter.
- **At act boundaries:** the moment provides the gap (a full screen of
  changed context), and the opener's extra top padding
  (~2–3× the interior value) provides the landing.

The contrast between these two scales *is* the sectioning. If interior
spacing creeps up toward the boundary spacing, the page decays back
into slides; if boundary spacing shrinks toward interior spacing, the
acts blur together.

## Typographic hierarchy (scale roles, not faces)

Three tiers, defined by role:

- **Display** — the largest scale. Appears only on the title, act
  openers, and moments. May break across lines for composition.
- **Crosshead** — roughly half display scale. Every interior beat's
  headline. Always a single line where possible; a crosshead that
  wraps to three lines is trying to be display and should be cut, not
  shrunk.
- **Body/caption** — running text and figure captions, unchanged from
  ordinary document setting.

The discipline that matters: scale maps to *structural role*, never to
how much the author likes the sentence. Promoting a favorite interior
line to display scale recreates the slide rhythm one beat at a time.

## The complete-unit rule

The reader must never need information that is off-screen to
understand what is on-screen. Since flow gives up viewport framing,
this is enforced by construction instead:

- A beat's headline, figure, and caption stay adjacent — close enough
  that they always enter the viewport together within a few hundred
  pixels.
- Figures are sized so the figure plus its caption fit comfortably
  inside a short viewport (~700px usable). A figure taller than that
  splits into two beats or shrinks.
- Never rely on two sibling beats being visible simultaneously; tall
  viewports show three at once, short ones show a fraction of one.

## Scroll behavior

- Free scroll, full stop. No snap, no settle, no scroll hijacking, no
  parallax tied to scroll position.
- `scroll-behavior: smooth` for anchor and programmatic jumps only.
- Keyboard (arrow/page keys) jumps beat-to-beat: scroll the next/
  previous beat's top to the viewport top. This gives readers who want
  deck-like stepping a way to get it, without imposing it on anyone.
- Anchors on every beat so acts and beats are linkable.

## Wayfinding

- A fixed rail (or equivalent) with **one entry per act**, not per
  beat — labeled, clickable, tracking the act currently mid-viewport.
- Act openers carry their own in-content index line ("02 — what we
  built" style), which is the primary orientation device while
  reading.
- A "scroll" cue on the title moment is acceptable; nothing else
  should instruct the reader how to move.
- No per-beat counters or footers (see above).

## Motion

- Reveal-on-enter is compatible with flow, but the trigger must fire
  as a beat **enters the lower edge of the viewport** (e.g.
  IntersectionObserver with a small bottom margin like `-12%`), not
  when it crosses mid-viewport. Mid-viewport triggers assume one beat
  per screen; in flow they leave visible content blank.
- Reveal once, then unobserve. Re-hiding content the reader scrolls
  back to is presentation logic.
- Stagger delays within a beat should stay short (under ~1s total);
  with several beats visible, long choreography reads as lag, not
  drama.
- Honor `prefers-reduced-motion` by showing everything immediately.

## Adaptation checklist

When converting a slide-style page to continuous flow:

1. Classify every section: moment, act opener, or interior beat. Be
   stingy with moments.
2. Remove viewport-height constraints from non-moments; replace with
   the two-scale spacing system.
3. Demote interior headlines to crossheads on one line (mind `<br>`s —
   replace with spaces, don't just hide them).
4. Pull interior figures closer to their crossheads.
5. Delete snapping/settling and any per-beat counters or footers.
6. Collapse wayfinding to act level; keep act kickers in content.
7. Retune reveal triggers to lower-viewport entry; cap stagger length.
8. Re-point keyboard paging at beat tops.
9. Check the complete-unit rule at a short viewport (~700px) and the
   density at a tall one (~1400px): a short viewport should always
   show at least one whole interior beat; a tall one should show
   2–3 inside an act and exactly one moment at the boundaries.
10. Reread the copy for deck language ("slide," "deck," "next page")
    that no longer matches the form.

## Known costs

Over-rotating into flow trades away real things — apply with eyes
open:

- Beats that earned their drama from display-scale staging flatten
  when demoted; the fix is selective promotion to act-opener scale,
  paid for by demoting something else.
- The author loses control of what shares the screen; juxtapositions
  the deck form guaranteed (one idea, alone, centered) now depend on
  the reader's viewport.
- Full-screen moments only stay powerful while they are scarce. The
  system degrades gracefully into "essay with occasional posters" —
  which is fine — but it cannot be pushed back toward "every beat is a
  poster" without becoming a deck again.
