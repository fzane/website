You've probably read a lot of prompting advice that tells you to be specific, precise, and exhaustive: spell out the audience, the tone, the format, the dos and don'ts, and so on. At some point, though, it starts to feel harder to describe this hypothetical document than to just write the actual document yourself.

Is all of that really necessary? It depends. When you have a clear, specific thing you want and you want the model to check each of the criteria, yes. When you're not quite sure what you want — what precisely makes a good competitive analysis report? — things are different. With earlier models that needed a lot of handholding, you needed to be pedantic. With modern models, though, the real challenge usually isn't explaining _how_ to do something — it's clearly communicating _what_ you want.

Instead of communicating a list of properties, though, we can communicate through shared references. If that sounds too abstract, I ran a simple experiment in **[Who Picked the Headphones]([essay URL])**. I asked several different models to "make a product page for an e-commerce site." That short phrase was enough for every model to know it needed a whole set of pieces — a product image and gallery, buy buttons, customer reviews, a price, and the rest.

Look at what that did — pages of potential specification, compressed into a single phrase: "e-commerce product page."  That worked only because we and the AIs have this shared understanding of what that phrase means through real-world examples we've both seen.

At the same time, this compression leaves the AI to fill in a lot of gaps. Based on just that description, the models made pages about noise-cancelling headphones, with color names like "Midnight Black", and 4.7–4.8 star reviews. Those are also just the obvious, default answers to "what's on a product page", only along dimensions we're not used to noticing.

Now that we see this pattern, how do we make use of it in practice?

Instead of specifying everything up front, you can lean on these shared references to get most of the way there in just a few phrases and examples, and spend your own words only where necessary.

The simple case is that there just is a word for the thing you want.  That makes it easy to ask for it, but also means you're getting the exact same thing as everyone else using those words.  This is more like Googling an answer than creating something new.  In practice, you want to use standard names to land you near the target quickly, and then move more carefully as you get close.

**Start with a bad first version.** You need to start somewhere.  Take the most basic description for the thing that defines its shape: a product webpage for headphones, a blog post arguing some position.  Ask for the obvious thing, and the model will give you the default answer.

This is where it's easy to go wrong. You've got a plausible-looking output, so the instinct is to start polishing it into the final thing. Resist that urge. You have invested only one sentence of effort so far, and the answer in front of you is likely a "C." Polishing might get you to a "C+," but it won't get you to an "A" because there just isn't "A" material in it. It's fine to throw this one away. Its only job was to orient you.

**Name it with examples.** Having something concrete to look at makes it easier to say what you want as "similar to that but more like X".  A design can look like Apple or like LEGO.  A blog post can sound like a TED talk or like an academic paper.  These aren't better-or-worse versions of the same thing; they're different directions, and you get to pick one.

Each of those names answers many questions at once — a lot of specification work for very little input.  It does ask something of you, though.  You need to know these names and what they stand for.  You can't point at something if you don't know what it's called or even that it exists.

**Describe the difference.** Eventually the names run out.   There's no existing thing that's just what you mean. You wanted Apple's calm, but warmer: wood and stone, not aluminum and white. Now you start spelling it out, but working from a nearby starting point.  It's like this thing you're pointing at, but different in these specific ways.

Sometimes it's not easy to find the words for these differences.  One trick is to borrow them.  Think of some examples that have the quality you're after.  Ask the model to describe them and watch for the phrases that capture what you're trying to name.

That's the arc:  Pick a starting point that grounds you in the default answer and your reaction to it.  Narrow it down by pointing at common references until you hit fine distinctions you can't explain with them. Find the precise words for the difference you want.

To make that work, though, you have to accept that you're not writing and refining drafts — you're making lots of cheap prototypes and watching your own reactions to them.