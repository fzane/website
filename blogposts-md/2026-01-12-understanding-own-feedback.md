---
title: "Understanding Your Own Feedback"
date: "2026-01-12"
subtitle: "You're a Great Critic of AI Output. That's the Problem."
description: "You know instantly when AI output is wrong but can't say why. That inarticulate reaction is the most valuable signal in the exchange."
---

In user interface design, there's a well-known principle: users are excellent at knowing what they don't want, and terrible at articulating why. Show someone a prototype and they'll tell you immediately that something feels off. Ask them what would feel right, and you get vague gestures toward "cleaner" or "more intuitive."

When you prompt an AI and react to its output, you're that user. You know immediately when something's off. The why stays stubbornly out of reach. And that's where things get interesting—because your inarticulate reaction is the most valuable signal in the whole exchange. The problem is what you do with it.

## The Simple Picture (That Misleads You)

Most people think prompting works like this: you ask for something, the AI produces it, you edit until it's right. Prompt → output → correction. A simple back-and-forth.

This picture makes correction feel obvious. Don't like the output? Say what's wrong. "Make it shorter." "Different tone." "Less formal." The AI adjusts, you react, repeat until done.

But this picture hides where things actually go wrong.

## What's Actually Happening

Instead, imagine four distinct steps in every exchange, several of which aren't directly visible to you:

**What you said.** Your prompt—the explicit articulation of what you want. Always incomplete, often imprecise, but it's what you've got.

**What it heard.** The AI's interpretation of your intent. This is invisible to you. It includes guesses about context, audience, purpose—things you may not have specified but the AI needs to assume something about.

**What it made.** The artifact—the actual output. This is what you see and react to.

**What you felt.** Your evaluative response. The "yes," "no," or "something's off" that fires when you encounter the output. You can ask this hidden oracle inside you for a thumbs up or thumbs down, but you often can't fully explain it.

These steps form a cycle. Your reaction (what you felt) has to feed back into a new prompt (what you said). And that translation is where things get complicated.

## Where It Goes Wrong

You prompt: "Write me a short bio for my website."

What it heard: professional context, formal register, comprehensive career summary. None of this was in your prompt. The AI inferred it from training—from patterns of what "short bio for website" usually means. This inference is a feature, not a bug; it's why you can write five words and get something usable. But when the inference is wrong, you're reacting to something you never saw.

What it made: "Dr. Sarah Chen is a distinguished researcher with over fifteen years of experience in computational biology. She has authored numerous peer-reviewed publications and..."

What you felt: Ugh. Stiff. Not me.

Now comes the critical moment. You need to turn that "ugh" into a new prompt. But you're a great critic and a poor articulator—you know you don't like it, but the _why_ is murky.

So you say: "Make it more casual."

The AI adjusts the artifact. You get the same bio with contractions and a friendlier sign-off. Still wrong. Because "too formal" wasn't the real problem—the AI's interpretation was wrong. It heard "professional bio" when you meant "personal website where I want to sound like a human being, not a CV."

You were addressing _what it made_ when you needed to address _what it heard_. This is _artifact fixation_—focusing on what you can see instead of what you can't.

Surface corrections—shorter, longer, different tone, more examples—address the artifact. They tell the AI to re-execute with adjustments. Intent corrections address the interpretation. They tell the AI that its picture of what you want is off, not just its execution.

The problem is that surface corrections are _easy_. You can point at the words and say what's wrong with them. Intent corrections require introspection: why do I dislike this? What did I actually want? What must the AI have assumed that led here?

That introspection is hard because you can't fully inspect your own evaluation function. You're a great critic—you know it's wrong—but articulating the criteria behind your judgment is a different skill. One most people haven't practiced.

## The Way Out

Next time you react negatively to AI output, before requesting another edit, ask yourself: can you articulate a concrete reason for the change?

"Shorter because this will be read on mobile and people scroll past walls of text"—that's a reason. You can imagine explaining it to someone and they'd nod. That's a surface correction; the AI understood, it just over-executed.

But "shorter because... it just feels like too much"? That vagueness is a signal. When you can't explain _why_ shorter would be better, you're probably not reacting to length at all. Something about the interpretation is off, and "shorter" is your best guess at a symptom.

Go back to the bio. "Make it more casual" doesn't come with a reason—it's a vague gesture at discomfort. But "I want to sound approachable because this is a personal site and I'm trying to attract collaborators, not impress hiring committees"—that's a reason. And it points upstream, at what the AI heard, not just what it made.

You can't fully inspect why you don't like something. But you can notice when you're reaching for a surface fix without a concrete reason—and treat that as a flag that the real problem is upstream.
