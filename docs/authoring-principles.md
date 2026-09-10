# Plotbreak authoring and interaction principles

What we know, written down so it is not relearned. Most of these were paid for
either by playing the product in the simulator or by studying how a successful
competitor structures its stories. Where a line exists because something broke,
the break is named — a principle without its scar tissue gets argued away.

## The product

**Read → type anything → the world visibly reacts → the story continues.** That
is the whole loop. Everything else is in service of it, and anything that makes
the main screen feel like a dashboard is working against it.

**Three ways to play, none second-class.** Lean back: read, tap a good response,
read. Lean forward: read, type anything. Hybrid: tap, tap, edit one, type
something strange, tap. A player must be able to cover the text box for thirty
minutes and still feel they are roleplaying, and cover the cards for thirty
minutes and find the world keeps up.

**The freedom is in the route, not the world.** Author the world deeply. Do not
author the player's path deeply. A vague world is not a free one — it is a thin
one.

**Do not add RPG systems to make it feel like a game.** The story makes it feel
like a game. Every meter, chip, objective and menu added to the main screen is
taken out of the fiction.

## Prose

**Length is not the enemy; boring is.** Beat budgets are 140/260/360/430 as the
*middle* of a range, moved by a count of what actually happened. Ninety-five
words could not establish a room, react in character, carry two people's
dialogue and leave the player somewhere to go, so it did the last badly.

**Short paragraphs, hard sentence variation.** Four hundred words in three
paragraphs is a wall on a phone; the same four hundred in twelve short ones
reads fast. A fragment is a sentence.

**Name the cost.** "Something shifts between you", "the air changes", "you feel
the weight of it" describe a consequence without containing one. The player
cannot act on them or even say what happened. Detected and stripped, because
prompt guidance has never held this — it is what a model reaches for when it has
more room than event.

**Nobody says the player's name three times in a line.** People who are actually
talking to you barely use your name at all.

## Characters

Every major character needs identity, current role, immediate want, long-term
want, fear, relationship to the player, voice, temperament, boundaries, a
secret, how they might change, and which reaction assets are theirs. This is
creator data for the AI, not a visible sheet.

**Strip the speaker names off the dialogue and the player should still know who
is talking.** Sentence length, vocabulary, what they joke about, what they will
not say. Two characters who would answer a question the same way means one is
not written yet.

**Authored data has to actually reach the writer.** The worlds were never
under-authored; the authoring did not arrive. Kai Sumire has a fear, a social
style and a boundary, and the writer got his name, pronouns and voice samples.
The cast was voiced correctly and motivated not at all. `speaker-brief.ts` is
the single projection both model stages use so they cannot drift again.

**Presence is the engine's decision.** Everyone in `speakers` is in the room and
cannot be written as absent, missing, or represented by an empty chair. Absence
was being used as an escape hatch from scenes the player had earned.

## State

**A variable exists to change behaviour, not to be displayed.** Describe what
low, medium and high *do* — "guarded, shares only survival rules" versus "takes
personal risks for you" — rather than what they measure. Never surface them
numerically by default.

**Keep the number small.** Seven is a competitor's maximum, not a target. Some
worlds want none.

## Lore

**Retrieve, do not dump.** Authored world knowledge — factions, places the
player is not standing in, people they are not talking to, techniques, items —
is derived per turn and retrieved on its own small budget. Retrieval used to
start empty in every session, so everything the author wrote about anywhere else
was invisible at runtime.

**A relevance floor is required.** Without one it returns the most *important*
facts every turn regardless, which is noise in every prompt.

## Endings

**Eligibility, never rails.** A world holds destinations, not a route. An ending
becomes reachable because the run actually arrived somewhere it makes sense.
Several should be losses. Walking away should be one of them.

**Two conditions.** A deterministic predicate the engine checks for free, and a
natural-language condition saying what the ending *means*, so a state that
qualifies on paper is only played when it also lands.

**An ending keyed on a flag nothing sets is worse than no ending** — it looks
like a destination in every audit and is unreachable in every session.

## Responses (the three cards)

**They are ready-to-play responses, not commands.** "Ask Dai about the five" is a
menu item. "I lean against the scorer's table and look at Dai. 'Everyone keeps
talking about those five like they were untouchable. What were they actually
like?'" is a line the player can feel they wrote.

**Generated from post-turn reality, after the beat is written.** The old
suggestions were rendered from standing affordances — who is present, what is
affordable — so the same card regenerated forever and the screen read as a
checklist with one item ticked.

**A choice set belongs to one scene and dies when any of it is used.** Never
carry a sibling forward. If the thing is still interesting, it is regenerated as
a new response to the new moment.

**Three different attitudes, not three errands.** Never "progress quest A /
progress quest B / be silly", and never one obviously correct option. Somebody
should plausibly pick each.

**Never announce the outcome.** The player authors the attempt and the style;
the world decides what happens.

**Never steer.** If the player quit the team, they are not offered three ways to
apologise to the coach. Generated options are the most invisible form of
railroading available.

**Same words, same meaning.** A tapped response goes through the identical
freeform path as typing it. There is no privileged card command language.

**Off the critical path.** Generated after the prose has streamed, so the player
is already reading. Story first, always.

## Screen

**No dice, difficulty bands, verdicts, resource costs or engine terms in
ordinary play.** "Risky · 9 Legs" and "PERSUADE MINA ARCLIGHT · MODERATE /
Failure" are the visible-game-system problem. A world that wants its mechanics
seen opts in.

**Responses live in the story feed, not pinned above the composer.** Pinned,
they cost lines of prose on every screen and sit in the player's eye while they
are still reading, which reads as "choose before you finish".

**One scrollable transcript.** No "earlier beats" fold, no dimmed history. The
story is a thing you can read back.

## Images

**A reaction frame means somebody reacted to you.** Not every turn has a face on
it. Crossing a room gets prose.

**Who owns the beat?** Then: how are they reacting? Never a character because
their emotion was easier to classify.

**Reuse is fine.** A cached frame that correctly says "Tomo is furious" beats a
bespoke one nine seconds later.

**Covers are not supposed to match.** A shelf of identical house style is the
boring version. Composition rules are about working at thumbnail size.

## Working on this codebase

**Two implementations of every AI stage, and the fast path is production.** Any
rule added to one silently misses the other. Nothing fails; the prose just gets
worse. Share one constant or projection and lock it with a parity test.

**Typecheck is a separate gate from tests.** vitest passes while tsc fails.

**The adversarial sweep is where the real bugs come from.** It plays every world
badly on purpose. A lexicon written for one genre is silently wrong in another —
"deck" is violence on land and furniture on a ship.
