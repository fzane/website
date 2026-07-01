# The Document Is the Interface

When AI collaboration goes wrong, people blame the prompt. They play with the wording, add more context, try again. Sometimes that helps. But often the prompt was fine—the problem was having the conversation in the wrong format entirely.

Chat is good for loose, exploratory feedback. It's bad for categorical choices, explicit approvals, or cases where silence is ambiguous. When you ask an AI to do work on your behalf, you're working through decisions, scope, and authority all in the same stream, and using the same informal language you use to chat. No wonder things sometimes go sideways.

Every AI collaboration involves negotiation—about which decisions need approval, about what you're actually trying to accomplish, about who does what. Chat buries that negotiation in a stream of text where it's easy to miss and hard to revisit. Documents make the negotiation explicit and editable.

## The Approval List

A friend was using AI to bulk-reorganize directories on his computer—hundreds of accumulated files that needed sorting. The problem wasn't capability. The AI could move files with the right tooling (in this case, Claude Code). The problem was trust. How could he be confident it wouldn't delete something important or misfile something he'd never find again?

The insight was to break the process into explicit steps. First, the AI produces a plan—a document listing every file it wants to move, with a one-line summary of each and where it thinks the file should go. Then the human pauses, actually reads the plan, and edits it—deleting actions that seem wrong, correcting misunderstandings, adding notes. Only then does the AI execute what the document authorizes. Three phases, with the document as the handoff point between thinking and doing.

That plan is a different kind of document than most people produce with AI. It's not an incomplete draft of the final output. It's a throwaway surface whose only purpose is making decisions explicit and correctable. The document exists to be edited, not to be preserved.

There's a reason signatures matter on contracts and vows matter in ceremonies. Some language doesn't describe what you'll do—it _does_ something. Philosophers call these "speech acts." Pressing "buy" on a website isn't describing a purchase—it's making one. The approval document works the same way. Editing the list _is_ the approval. When you delete a line, you've vetoed that action. When you leave a line untouched, you've authorized it. The document doesn't describe your decisions—it constitutes them.

Restaurants have a version of this: the order read-back. The waiter recites what you asked for before sending it to the kitchen. You're not composing anything—just verifying. "Here's what I heard. Correct me now or accept what arrives." An AI approval document serves the same function: a checkpoint where errors are cheap to fix, before they become expensive to undo.

## The Scope Document

Other failures aren't about wrong decisions but wasted effort. The AI produces something technically correct that completely misses what you actually needed. You specified the task; you just didn't specify the _point_.

This is where a different document helps—something closer to a meeting agenda than an approval list. Before a meeting, someone sends around a message: here's what I plan to cover, here's what I think we're trying to accomplish, here are the topics I'm explicitly _not_ addressing. Add items or object before we start.

An AI scope document works the same way. Before the AI does substantive work, it produces a brief statement: here's what I understand the goal to be, here's my planned approach, here's what I'm assuming is out of scope. You review it, correct the misunderstandings, and _then_ the work begins. In fact, some AI tools have already started building this in to their workflows. Deep Research features often ask clarifying questions before they spend ten minutes searching and synthesizing. That's a scope document—lightweight, but doing real work.

The key insight: **this document is designed to be thrown away.** It's not a draft of anything. It's a specification surface—more like a Google Sheet collecting everyone's lunch order than an essay awaiting revision. Nobody agonizes over the prose quality of a sandwich order. The lunch-order spreadsheet succeeds when everyone gets what they wanted, not when the spreadsheet itself is beautiful.

## The Role Document

A subtler failure mode: the AI does more than it should. You asked for feedback on your argument; it rewrote your prose. You asked for research; it made decisions you wanted to make yourself. The AI wasn't wrong about what you asked—it was wrong about where its authority ended.

This isn't just about restraining the AI—it's about protecting the parts of the work you actually value. Maybe you enjoy crafting conclusions. Maybe the research is tedious but the synthesis is where your judgment matters. A role document makes those preferences explicit: "Pull the data and summarize the sources. But I write the conclusion—that's where I actually think."

The question isn't only "what should the AI not do?" It's "what am I here for?" If you're not sure which parts of the work are yours to own, a role document forces the question.

Here's what this looks like in practice. Without a role document: "Edit this essay." You get back a polished version. Better in some ways, but your voice is gone, and you're not sure which changes were corrections versus preferences.

With a role document: "Mark sentences that are unclear. Flag arguments that need more support. Note where the structure loses momentum. But don't rewrite anything—I want to see what you see, then fix it myself." Now the diagnosis is the AI's, but the treatment is yours.

## What This Changes

"Write a better prompt" is often the wrong lesson. The right question is: what negotiation between you and the AI broke down, and what document would have made that negotiation explicit?

- Mistakes you can't catch → an approval document that surfaces decisions before execution
- Wasted effort on the wrong goal → a scope document that aligns on purpose before work begins
- AI overstepping its role → a role document that clarifies boundaries and authority

These aren't outputs. They're not drafts. They're interaction surfaces—documents designed to structure a conversation that chat handles poorly.

People are excited about using vibecoding tools to build custom apps—finally, software that fits your workflow instead of forcing your workflow into someone else's design. But this oversells the need for interactivity. Many tasks don't need buttons and forms. They need a document you can read, edit, and hand back. Apps require code and design. Documents require only writing and clear structure.  In settings that don't need real-time feedback, the document is often simpler, faster, and more legible.

My friend's file reorganization became easier because a simple list transformed an opaque, anxiety-producing process into something he could see, judge, and control.
