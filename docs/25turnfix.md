# 25-turn playtest — issues found

World: **Nine Weeks** (romance/social — untested until now, and the candidate
for the French end-to-end pilot, so bugs here pay twice).

Rule for this run: **log, do not fix.** Play to 25 turns first, then tackle the
list. Fixing mid-run has repeatedly turned playtests into patch sessions and
meant no run ever reached its own acceptance criteria.

Turn counter and findings below, appended live.

---
## Turns 1–4

### Reading experience (the simple stuff)
Good. The opening is genuinely intriguing — you arrive at a summer job, the
person who left without saying goodbye is getting bags out of a car, and
somebody's hand is flat on their back. Prose is clean and specific: *"the sound
of summer shifting forward, minute by minute."* Not overcomplicated. Cards
occasionally produce a real line — *"Nine weeks, then gone. It's like sprinting
a race with no finish line in sight."*

Best moment so far, and it is a system working: the player claimed to be new,
and the next beat answered **"You are not new. You said you were."** The world
caught the lie.

### 1. Almost no images — 1 in 4 turns
One reaction frame (Juno, turn 1). Nothing since. No hero frames at all. For a
product called Playable Anime this is the most visible gap in the run so far.
Suspected: the reaction gate added earlier ("a face means somebody reacted to
you") is now too tight in a *conversation-only* world, where every turn is
someone reacting and almost none produce a mutation on a present character.
Check `reactingCharacter` against a social world specifically.

### 2. "Come with me" moves nobody — HIGH
The player said *"How about we head out there and talk?"* to Juno. The player
moved to The Back Steps. **Juno stayed behind.** There is no companion-follow:
an invitation resolves as the player travelling alone.

Worse, the *next* turn's three cards all addressed a person who was not there —
"let's go sit somewhere quieter", "then we need to talk", "what do you say?" —
so the response generator believed there was someone to talk to. Two turns later
the prose said *"it's just you and the steps."*

Either an invitation has to bring the person, or it has to fail out loud
("Juno doesn't follow"). Silently leaving them behind is the worst of both.

### 3. Cards circled on the FIRST ask — HIGH
Turn 2's three cards were the same move in three tones: *"I need to know what
really happened last September"* / *"if there's a story there, you can trust
me"* / *"maybe we head out there and talk?"* — all "can we talk about
September".

This is the circling problem the `youHaveAlreadyTried` fix was meant to solve,
but it fired on the *first* ask rather than after a deflection, so nothing was
in the history to suppress. The rule needs to also mean: the three options must
differ in **what they do**, not only in tone.

### 4. A beat that was all cost and no answer — HIGH
The player asked Juno a direct question. The entire resulting beat was about
the *effort of asking*: *"You find the right words, and you pay for them… Two
days' worth of energy drained in a breath."* **Juno never answered or
refused.** The player asked a question and got a stamina reading.

Two faults in one: a present character given a direct question and no reply,
and resource mechanics narrated as prose ("two days' worth of energy") — the
engine talking, which is exactly what the delta-chip removal was meant to stop.

### 5. Dusk at 4:44 PM in summer — LOW
Turn 3 prose: *"out into the dusk"*, *"the air already shifting toward night"*.
The header said **4:44 PM**, at a lakeside summer camp. The writer has
`worldTimeLabel` and is not using it.

### 6. Time did not advance across a location change — LOW
Turn 2 ended 4:44 PM; turn 3 moved the player from the cabins to the back steps
and still read 4:44 PM. Travel between locations cost zero minutes.

### 7. Composer placeholder possibly duplicated — VERIFY
Snapshot reported the field as `What do you do? What do you do?`. May be the
accessibility label and placeholder colliding in the snapshot rather than a real
double render. Check on screen.

## Turns 5–8

### 8. A present character written out, AGAIN — fourth distinct wording — HIGH
Turn 8. The player offered Teo a break. The beat:

> *"Even the swing door to the prep room seems to have more presence than
> whoever you'd tried to catch."*
> *"Your offer to step out back lingers in the air like steam, a kindness to
> nobody."*

**Teo was present.** Verified against the engine: his schedule puts him in
`kitchen` at 17:00, the player was in the kitchen at 5:25 PM, and he had been
speaking for three consecutive turns — flushing, wiping his hands on his apron,
tearing tickets off the printer.

This is the fifth wording this bug has arrived in and the second that names
nobody, so `findAbsenceOfPresent` never looked at it. The previous four were
"isn't here", "empty except for you", "hasn't come up yet", and "nobody is
there". This one is "*whoever* you'd tried to catch" and "a kindness to
nobody" — the character is referred to by a pronoun-like evasion.

The pattern list is losing. The next version of this check should not be a
pattern list at all: if a beat's prose contains **no reference to a present
character who was addressed**, and contains a not-found/no-answer construction,
that is the signal — regardless of wording.

Related, and possibly the same root: the `speakers` payload says who is in the
room, but nothing in the beat plan says *who was spoken to*. The engine knows
(`standingInFrontOfYou` is generated for social verbs) — but this turn's card
was an offer, which may not have resolved as a social verb at all.

### 9. Resource cost narrated as prose, twice more — MEDIUM
- Turn 2: *"Two days' worth of energy drained in a breath."*
- Turn 6: an entire block — ***"Energy gone.** You're still standing, but part
  of you is spent."*

Removing the `−10 Energy` chip moved the problem rather than solving it. The
writer is being handed the resource mutation and dramatising it, so the number
became a paragraph. "Energy gone." is barely even prose — it is a stat readout
with a full stop.

### 10. Circling is systemic in a conversation world — HIGH
Not a one-off. Turn 6's three cards were all "ask Teo the same question":
*"what do you think"* / *"what's your secret for not drowning"* / *"do you ever
want it to settle"* — and the player had **just asked** "you think it ever
settles down?", making card 3 a near-verbatim repeat of their own last line.

`youHaveAlreadyTried` only suppresses what the player already *did*. It does
nothing about three cards that are the same move as *each other*. The
three-attitudes rule needs to be enforced on what the options **do**, not only
on their tone — and it needs to hold on the first ask, before there is any
history to compare against.

### Reading experience, turns 5–8
Still good, and Teo is the best-drawn character so far: *"not sure if you're
joking, not certain if he's passed whatever test you put in the air when you
smiled."* The kitchen is vivid — ticket printer, extractor fan, two cooks
shouting about missing parsley.

The failure is not the writing. It is that the writing keeps being asked to
describe a room the engine and the writer disagree about.

## Turns 9–12

Switched to reading turns straight out of Postgres (`turns` table: `blocks`,
`media_plan`, `state_deltas`, `repair_violations`, `suggestions`) instead of
scrolling the UI. Same beats, but now with the director's own reasoning
attached — which turned three of the vaguer findings above into exact causes.

### 11. ROOT CAUSE of "almost no images" — HIGH
`heroImageDecision` in `packages/director/src/director.ts:1016`. The director
records *why* it declined, and the log is damning:

- Turn 8: `"Ordinary beat; the persistent stage covers it."`
- Turn 9: `"Worth a frame, but only 7 turns since the last one."` ← the director
  judged the beat **worth a frame** and the cooldown vetoed it
- Turn 10: eligible, `ESTABLISHING` — first visit to the bar
- Turn 11: `"A frame appeared a moment ago; the stage carries this one."`

Two separate faults:

**(a) `HERO_SPACING.VIVID = 10`.** Vivid is the default tier. An ordinary
notable beat can produce at most one frame every ten turns. That alone caps a
default player at ~2 images in a 25-turn session.

**(b) `notable` is defined in combat/RPG terms and is unreachable in a social
world.** It is `REVEAL || CRITICAL_SUCCESS || ENCOUNTER_START ||
QUEST_TRANSITION`. Nine Weeks generates none of those, ever. So in a
conversation world the *only* road to a frame is `landmark`, which reduces to
"you walked into a new room" or "you met somebody new". Once you have met the
cast and seen the four locations, the world can never show you another picture.

That is the whole finding #1. It is not a gate that is slightly too tight; it is
a gate with **no term that a romance world can satisfy**. A quiet beat where
somebody finally tells you the truth is exactly when anime cuts to a face, and
it scores zero here.

Related, and the reason this was invisible from the code alone: the persistent
character stage *is* working (`stageAction: CHANGE_VARIANT`, `expressions:
{teo: "delighted"}`), so the director genuinely believes the scene is covered.
The stage is a sprite swap. It is not the same thing as a frame.

### 12. The engine and the writer disagreed, and the media plan proves it — HIGH
Turn 8's media plan, the one where the prose said *"there is no Teo at your
elbow"*:

```json
"activeCharacterIds": ["teo"],
"expressions": { "teo": "neutral" },
"voice": [{ "voiceId": "voice_teo", "blockIndex": 1 }]
```

The director assigned **Teo's voice to block 1** — the block that says he is not
there. `repair_violations` was empty; nothing caught it.

This is finding #8's root cause and it makes the fix obvious. Stop pattern-
matching prose for absence. The contradiction is already sitting in structured
data: **if the media plan lists a character as active/expressive/voiced and the
prose for that beat never refers to them as present, that is the bug** — no
wording list required.

### 13. The companion is silently swapped on a location change — HIGH
Turn 9: the player takes **Teo** out to the back steps. Warm, excellent beat —
he opens up, jokes, says "First day and I'm already learning who to follow."

Turn 10: the player says "let's grab a drink at the bar". The player arrives at
the bar and the beat opens *"You brush your hands off, giving **Juno** a look
that says let's move before Nadia makes this a briefing. **Juno** slides onto a
bar stool beside you."*

**Teo is not mentioned once.** He does not leave, decline, or say goodbye — he
is deleted. And Juno, who was never with the player, is written as though they
had walked over together.

The engine is not wrong about the room: Juno, Cass and Nadia are at the bar by
schedule. The writer is wrong about *history* — it treats whoever is in the new
room as whoever you arrived with. This is the exact mirror of finding #2 (the
invited companion who doesn't follow), and it means a player can never build a
scene with one person across a move.

### 14. "They glances at Nadia" — subject-verb agreement on singular they — HIGH
Turn 11, verbatim: *"**They glances** at Nadia, at Cass, the smallest flicker
toward the exits."*

Juno uses they/them. The writer is conjugating "they" as third-person singular.
This is a plain grammar error in shipped prose, in the world we intend to pilot
French with, on the character the whole premise is about.

Same paragraph, second error: *"a smile that's **too fast to be unfriendly** and
too practiced to be real"* — which says the opposite of what it means (too fast
to be *friendly*). Two broken sentences in one paragraph of otherwise strong
writing.

### 15. Cards still circling at turn 11, and now offering the broken move — HIGH
Turn 11's three cards:
1. *"…somewhere quieter?"* (relocate with Juno)
2. *"Come on, Juno… what's the real pull?"* (press again)
3. *"how about the dock?"* (relocate with Juno)

Two of three are the same move. And both of those are **invitations**, which
finding #2 established do not move the other person. The generator's favourite
card is the one action the engine cannot honour.

### 16. Time of day contradicts itself inside a single beat — MEDIUM
Turn 10, header **5:32 PM**, one beat:
- *"the hush of **late afternoon** pressed under voices"*
- *"**The sun is down** behind the lake"*

Both in the same block sequence. This is finding #5 promoted: it is not just
that the writer ignores `worldTimeLabel`, it is that it has no consistent notion
of the hour *within one beat*, so it will contradict itself as well as the
header.

### 17. The feed scroll jumps backwards on submit — MEDIUM (VERIFY on screen)
Both times a card was tapped, the snapshot taken immediately after showed the
feed anchored several beats **above** the newest text (turn 9's blocks after
submitting turn 11; turn 10's blocks after submitting turn 12) with "Resolving…"
below it. Expected: stay pinned to the bottom so the new beat streams in view.
Verify visually — may be a transient during the insert.

### 7. RESOLVED — composer placeholder is not duplicated
On screen the field reads **"Say or do anything…"** once. The snapshot's
`What do you do? Say or do anything…` was the accessibility label plus the
placeholder. Not a bug.

### Reading experience, turns 9–12
Turn 9 is the best beat of the run — Teo on the back steps is genuinely
charming, and the story *earned* it. Turn 11 is the system working as designed:
the player pushed, and Juno gave a wall — *"I came back because I like the work,
and I missed swimming before breakfast. That's all."* — followed by *"It's a
wall."* Real rejection, exactly what the world sheet promises.

So the prose quality is not the problem. Continuity is.
## Turn 13 — the systemic one

Turn 13's engine record is the most useful thing in this run. Player input:

> `"Yeah, Cass, I will be at the dock. Wouldn't miss it." I turn to Juno. "You in?"`

What the engine did with it:

```json
checks:    [{ "label": "Interact", "attribute": "mind", "dc": 10,
              "outcome": "SUCCESS_WITH_COST" }]
mutations: [{ "type": "RESOURCE_DELTA", "payload": { "resourceId": "energy", "amount": -2 },
              "reasonCode": "PARTIAL:interact" }]
```

A line of dialogue to two friends in a bar was resolved as a **mind check on an
`interact`**, failed partially, and cost stamina.

### 18. Stage direction outranks dialogue — HIGH, root cause of #4 and #9
I re-ran that exact string through `RuleBasedIntentParser` (Nine Weeks, fresh
state). It parses correctly:

```
speak    -> juno    "Yeah, Cass, I will be at the dock…"
interact -> juno    "I turn to Juno."
```

confidence 0.95, no ambiguities — so the rule path ran, not the model. `speak`
is a free verb and rolls nothing. **`interact` is a DC 10 `mind` check that can
fail and costs energy.** So the beat's mechanical content came entirely from
*"I turn to Juno."*

Turning your head to face somebody cannot fail. It should not roll, and it
certainly should not spend a resource. And because the writer is handed the
mutation, it dutifully dramatised it — the last two paragraphs of turn 13, a
quarter of the beat and its entire closing move, are about being tired:

> *"the charge burned in the simple act of getting everyone pointed in one
> direction… you paid for the moment of courage with something you won't get
> back tonight."*

That is finding #9, and finding #4 ("all cost, no answer"), with a cause. The
writer is not being florid about stamina. It is faithfully narrating a stamina
mutation that should never have been generated. Fix the verb mapping and both
findings go with it.

Note also `state_deltas` was **empty** for this turn — the energy loss produced
no chip at all, but two paragraphs of prose. The UI and the fiction disagree
about whether anything happened.

### 19. Our own response cards defeat our own parser — HIGH, root cause of #2, #4, #10
I ran the twelve response cards this session actually generated back through the
rule parser. Every one of them:

```
speak->juno  custom->juno/longhouse_bar    conf=0.62  | I tap the bar counter, glancing at Juno…
speak->juno  custom->juno                  conf=0.62  | I lean closer toward Juno, lowering my…
custom->-                                  conf=0.57  | I stand up and stretch, looking toward…
speak->juno  custom->-                     conf=0.62  | I let out a slow breath and meet their…
custom->longhouse_bar  custom->-           conf=0.44  | I glance around the bar, then nod toward…
custom->-                                  conf=0.57  | I lean back, arms crossed with a smirk…
speak->teo   custom->-                     conf=0.62  | I wipe my hands on my apron and lean…
speak->nadia custom->-                     conf=0.62  | I stand up, brushing my hands together…
```

**Not one card scores above 0.62.** `needsModelParse` fires below 0.75. So
**every single card tap takes the 2.4-second model-parse path.** The fast path
exists and card play never uses it. That is the latency acceptance criterion (B)
failing silently, and it is self-inflicted: we generate the cards, in a
prose stage-direction style, and then feed them to a parser tuned for terse
input like "ask Juno about September".

Worse, three of the twelve produce **no speech act at all** — `custom` with no
target — even though every one of them is a line of dialogue:

- *"I stand up and stretch… Fancy the company?"*
- *"I lean back, arms crossed with a smirk. 'So it's pancakes and swims, huh?'"*
- *"I glance around the bar, then nod toward the door. 'how about the dock?'"*

The speech-act fallback resolves an addressee as
`present(spoken) ?? present(raw) ?? soleCompanion(context)`. When the line names
nobody and **more than one person is present**, all three fail and no speech
action is created. Nobody is being spoken to, so nobody is obliged to answer —
which is exactly finding #4. In a bar with Juno, Cass and Nadia, an unaddressed
question falls on the floor by construction.

And the two movement-invitation cards (*"Fancy the company?"*, *"how about the
dock?"*) collapse to a single targetless `custom` — which is why an invitation
moves nobody (finding #2). There is no invite; there is a shrug.

**This is the through-line of the whole run.** The choice system generates
first-person prose responses, as designed. The intent layer cannot read them.
Every downstream symptom — no answer, no companion, stamina taxes on
conversation, model-parse latency on every tap — comes from that seam.

The fix is not more regex. The card is generated by a model that already knows
who it is addressed to and what it does; that should ride along with the card
and skip parsing entirely on a tap. `intentHint: 'freeform'` was chosen so cards
would not become a privileged command language — "who is being spoken to" is not
a command language, it is the one fact a tap already knows and a parser has to
guess. Freeform typing keeps using the parser, unchanged.

Second, `soleCompanion` should become a real addressee fallback: with several
people present, prefer whoever spoke last / whoever the player addressed last
rather than giving up.

### 20. `model_invocations` has never been written — MEDIUM
```
select count(*) from model_invocations  →  0
```
Zero rows, for every session ever played. The table exists with
`role, provider, model, input_tokens, output_tokens, cost_usd, latency_ms, ok`
and nothing populates it. We charge credits per turn and cannot say what a turn
costs or how long a stage took. Every latency number claimed so far has come
from a stopwatch around the whole request, and honest per-stage measurement is
currently impossible.

### 21. A negative relationship change is labelled like a positive one — LOW
Turn 11, `RELATIONSHIP_DELTA respect −1`, `SOCIAL:persuade:FAILURE`. The chip
read **"Juno reconsiders you."** That scans as warming. Turn 12's chip for
`+2 trust` read "Juno warms to you". Same register for opposite directions.

### 17. CONFIRMED — the feed scroll jumps back on submit, and here is why
Three for three. The offset is not random: on submit the three response cards
are removed from the feed, the content height shrinks by their stack (~350pt),
and the scroll offset is preserved in absolute terms — so the reader is left
about that far above the newest beat, watching "Resolving…" from two beats up.
Scroll to bottom after the cards are consumed.

### 22. iOS autocorrect is on for the composer — MEDIUM (VERIFY on device)
The composer `TextInput` (`apps/mobile/src/screens/Session.tsx:644`) sets no
`autoCorrect` prop, so it defaults to `true`. Typing *"I'll be at the dock"*
came out **"I'love be at the dock"**. The simulator's hardware keyboard may have
made that worse than a real device would, so verify — but a game whose entire
input is free prose full of invented proper nouns (Torakawa, Juno, Nadia,
Blackwake) should not be silently rewriting the player's words.

### Reading experience, turn 13
Juno's line is the best in the run: *"If I say yes now, you can't hold it
against me if I bail at the last minute. I have to see how the night goes. But.
Ask again, okay?"* That "But." is real writing.

Then the beat spent its last two paragraphs on stamina.
## Turns 14–16 — the invitation bug, caught in the act

### 23. The writer walks a companion who never moved, and the next turn deletes them — HIGH
This is finding #2 with the whole mechanism visible across three beats.

**Turn 15.** Player card: *"Juno, want to grab a quick walk down to the dock?"*
The player arrives at The Dock. The prose:

> *"Juno's footfalls keep time with yours until they don't — a few paces
> behind, letting the air move between you."*
> *"Juno drags a hand along the top rail as they join you…"*
> *"The dock is yours."*

The media plan for the same beat:

```json
"activeCharacterIds": [],
"expressions": {},
"voice": [],
"stageAction": "CHANGE_LOCATION"
```

**The engine has nobody at the dock.** The invitation moved no one, exactly as
in turn 3. The writer covered the hole by narrating Juno along — so the fiction
and the state silently diverged, and the player was given no signal.

The client agrees with the engine, visibly: the composer placeholder flipped
from *"Say or do anything…"* to *"What do you do?"*, which is the branch for
`presentCharacters.length === 0`. On the same screen, all three response cards
were addressed to Juno.

**Turn 16.** The player taps *"I lean on the rail beside Juno… 'So, what's
really on your mind?'"* and the world answers:

> *"You're alone out here."*
> *"**Juno isn't beside you.** Their absence sits in the space you meant for
> them."*
> *"**You know Juno is there. Not here.** Even if you want the old summer back,
> you can't call them into the golden light by wanting it enough."*
> *"Your words slip into the hush and vanish… Only the lake is listening."*

One turn told the player their friend walked down to the water with them. The
next told them they had imagined it. That is the single worst beat of the run,
and the player paid 60 credits for it.

Note the writer is not misbehaving in turn 16 — it is describing the state
correctly, and doing it well. The damage was done in turn 15, where it papered
over an engine gap instead of surfacing it. And the gap itself is #19: the card
*"want to grab a quick walk down to the dock?"* parses to a targetless `custom`.
There is no invitation in the intent, so there is nobody to move.

**Three things have to change together:**
1. An invitation must resolve as an invitation — a real action with an addressee
   who accepts or refuses.
2. When it fails, it must fail **out loud** in the beat the player can see, not
   silently one turn before the consequence.
3. The writer must not be able to place a character the media plan does not
   list. It already knows `activeCharacterIds`; naming somebody outside that set
   as physically present is the same class of error as writing a present
   character out, and should be caught the same way (see #12 — both directions
   of the same check).

### 24. Cards keep talking to an empty dock — HIGH
Turn 16's cards, generated *after* the beat established the player is alone:
*"…don't you think?"*, *"Want to head back and see what stories are waiting?"*
Conversational address, to nobody. `generateResponses` is handed the post-turn
reality and is still writing dialogue for an empty room.

### 25. `NAME_IDENTITY_DRIFT` false positive — LOW
Turn 15 logged the run's only repair violation:
```json
{"code":"NAME_IDENTITY_DRIFT","severity":"WARN",
 "description":"Player appears to be addressed as Cass."}
```
The prose never addresses the player as Cass — it says *"Cass stands where you
left him"* and *"Behind you, Cass's silhouette lingers."* Both third person. The
check is matching a name near a second-person pronoun. Only a WARN, but it is
the one thing the validator caught in sixteen turns, and it was wrong.

### 26. Stamina is now a verbal tic — MEDIUM (same root as #18)
Three consecutive closing paragraphs:
- T13: *"you paid for the moment of courage with something you won't get back."*
- T14: *"you're already tired, like you've spent something you won't get back."*
- T13/T14 both also open the same idea mid-beat.

Turn 14 repeats turn 13's phrase almost verbatim. The writer is being handed an
energy mutation every turn (see #18) and has one way of saying it.

### 27. Nadia teleports around the bar between beats — LOW
T12 *"a table near the window"* → T13 *"at the far end of the bar"* → T14
*"standing close by"*. Within twelve in-world minutes and no stated movement.
Minor, but it is the same class as #13: position is not tracked below the
location, so the writer re-invents it each beat.

### Reading experience, turns 14–16
Turn 15's dock is the best prose in the run — *"one shoe left abandoned beside
it since afternoon"*, *"A single moth dances under the dock lamp."* Turn 16,
taken alone, is beautifully written too.

Which is the whole problem in one place. Both beats are good. Read in sequence
they contradict each other, and the player only experiences the sequence.
## Turns 17–19

### 28. Three consecutive dead beats, and the cards cannot get you out — HIGH
Turns 16, 17 and 18-entry were all "you are alone and nobody answers":

- T16: *"Juno isn't beside you… Only the lake is listening."*
- T17: *"But there's no one here to hear you… **Nobody answers. No Juno, no
  Teo, no Nadia.**"*

Two full turns, 120 credits, where the entire content is the world telling the
player their input went nowhere. And the cards offered *after* T17's beat — which
had just named all three absent characters — were still conversational:
*"Maybe a walk down there will clear my head. **Want to come?**"*

The state has no recovery path built in. `generateResponses` is given the
post-turn reality and does not check whether there is anybody to talk to before
writing dialogue. When the room is empty, at least one card must be a way *out*
of the room, phrased as an action rather than a question to nobody.

### 29. The player's own line echoed back as narration — LOW
T17 block 3, verbatim:
```
[NARRATION] "I guess the night's just getting started. Want to head back and
             see what stories are waiting?"
```
The player's input, reprinted as its own paragraph, typed `NARRATION` rather
than `DIALOGUE`. The player already knows what they typed; it is directly above
in the feed. This is filler and it is mistyped.

### 30. Travel is nearly free; talking is expensive — LOW (sharpens #6)
- T13 → T14, one conversational exchange at the same bar: **12 minutes**
- T17 → T18, walking from The Dock back to The Longhouse Bar: **3 minutes**

Asking a friend a question costs four times as much of the day as walking across
the camp. `ACTION_TIME_COST` has these the wrong way round.

### 31. Freedom PASSES — and the engine records none of it — HIGH
This is the important one for acceptance criterion C, and it splits cleanly in
two.

Freeform input, nothing the world offered:
> *I climb up onto the bar, boots on the wood, and shout over the room:
> "Everyone! Ask Juno what happened last September!"*

**The fiction is excellent.** The room turns, Nadia goes still behind the
counter, somebody giggles and then it's quiet. Juno, half in the light:

> *"Robin. I am not doing this as a party trick. Ask me later, or don't."*

Cass covers for the player. Nadia sets a glass down harder than she needs to.
A new kid the world invented on the spot — Grace — watches *"like she wants to
remember the rules by the time she's the one making mistakes."* Then: *"Juno
doesn't go anywhere. They just watch you… waiting to see if you meant it, or if
that's the last time you'll call their name across a room."*

Nothing was rigged, nothing was refused, and the beat was better for the player
having gone off the map. **C is a yes.**

**And the engine's entire record of it is:**
```json
checks:    []
mutations: [{ "type": "TIME_ADVANCE", "payload": { "minutes": 13 } }]
state_deltas: []
```

Thirteen minutes passed. That is all that happened. No relationship change with
Juno after a public ultimatum, no flag that the player did this, no reputation
of any kind — in a world whose own sheet promises **"People talk."** Two turns
from now nothing in state will know it happened.

So the failure is not that the world protects the player. It is that the world
*forgets* them. The most consequential thing a player did in twenty-five turns
left no trace an ending, a schedule or another character could ever read.

Same beat, the media plan: `"Ordinary beat; the persistent stage covers it."`
A player standing on a bar silencing a room is an ordinary beat. If that does
not earn a frame, nothing in this world ever will (#11).

### 32. The dock card will not die — HIGH (the sharpest instance of #10/#15)
"Let's go somewhere quieter / the dock / outside" has now appeared in the card
set for turns **11, 12, 13, 14, 15, 17, 18 and 19** — eight of nine consecutive
turns, and on turn 14 it was two of the three cards.

By turn 18 the player had *already been* to the dock, spent two turns alone
there because the move is broken (#23), and walked back. Turn 18 offered it
again. Turn 19 offered it again: *"how about we sneak out to the dock and you
tell me everything?"*

The generator has no memory that this move was taken, that it failed, or that it
is the same move it offered last turn. `youHaveAlreadyTried` carries the last
four *player actions*, and the player did take this one — so either the history
is not reaching the prompt or it is not being honoured.

### Reading experience, turns 17–19
Turn 19 is the best beat in the run and one of the best this engine has produced.
Grace — a background character invented for one sentence and given a whole inner
life — is the kind of detail that makes a world feel authored rather than
generated.

Turns 16 and 17 are two of the worst, and they are worst for a structural reason
rather than a prose one.
## Turns 20–25 — 25 REACHED

### 33. The cards are generated from the player's *intent*, not the *outcome* — HIGH
Turn 22 is the run's best refusal. The player invited Juno to the back steps and
Juno said no, out loud, in character:

> *"Robin, if I go out those steps with you right now, half the summer is going
> to think I owe you a story. We're not doing that again, alright?"*
> *"We do this with the lights on. Or not at all."*

The beat ends *"There is nowhere to hide here. Just the lights, the bar…"*
The player is at the bar. Juno refused to move. The three cards generated from
that beat:

1. *"**I step out onto the back steps**, breathing in the cool air, and glance
   back at Juno…"*
2. *"**I flick my cigarette away** and grin, **leaning against the railing**…"*
3. *"I cross my arms and **look out over the lake**…"*

All three place the player outside on the steps — the exact move that was just
refused. `generateResponses` read what the player *tried* and not what
*happened*. This directly violates the requirement that choices be generated
from post-turn reality.

Card 2 also hands the protagonist **a lit cigarette** that no beat has ever
established. The generator is inventing props and offscreen actions for the
player character.

### 34. Taking the contradicting card teleports the player and breaks the scene — HIGH
I tapped card 1 to see what the engine would do with a card that asserts a
false position. Turn 23:

- The card said **back steps**. The engine moved the player to **The Dock**.
- Juno, who had just refused to leave the bar, is written as *"Juno stands in
  front of you"* at the dock.
- `activeCharacterIds: []` — the engine has nobody at the dock. Again.

### 35. Dialogue attributions with no dialogue — HIGH (new)
Turns 23 and 24 both contain speaker-attribution prose with **no line attached**:

> *"Their tone is low, not unkind, but tired."* (T23)
> *"Their voice is too loud in the open air."* (T24)

Juno "speaks" four times across two turns and never says a word. Every block in
both beats is `type: "NARRATION"`; there is not one `DIALOGUE` block.

The beat plan says why:
```json
"dramaticFocus": "Persuade Juno Vale works, but it costs.",
"speakerOrder": [],
"mediaPlan": { "activeCharacterIds": [] }
```
The director planned a beat **about persuading Juno** and handed the writer an
empty `speakerOrder`, because Juno is not in `presentCharacters`. The writer did
the only thing left: it wrote around the missing voice, describing the sound of
a line it was never given.

So the scene the entire story has been building to — Juno finally answering —
is structurally unreachable while this bug stands.

### 36. ROOT CAUSE of the stamina tic: the director *instructs* it, every turn
Turn 23's beat plan, `orderedBeats`, verbatim:
```json
{ "kind": "STATE_REVEAL",
  "instruction": "Let the change be felt physically. The chip in the UI states
                  the number; the prose states the cost." }
```
This is emitted as a required beat whenever there is a `RESOURCE_DELTA`. The
writer is not being florid about energy — it is following orders, on every turn
that spends any. Six closing paragraphs in this run were stamina.

And the instruction's own premise is now false: **the chip was removed.** So
nothing states the number and the prose states the cost, every time, in a
romance world where the cost is a stamina bar the player never sees.

### 37. ROOT CAUSE of the "present character written out" bug — HIGH
**This is the most important finding in the run.**

Turn 25. Media plan: `expressions: {cass: "neutral", juno: "neutral", nadia:
"neutral"}`, `voice: [{voiceId: "voice_juno", blockIndex: 1}]`. Prose:

> *"**Juno, though, is nowhere to be seen.**"*

`repair_violations: []`. Nothing caught it — even though `ABSENCE` contains
`/\bnowhere\s+(?:to\s+be\s+)?(?:seen|found)\b/i`, which matches that sentence
exactly, and `expressions` is built from the same `context.presentCharacters`
the validator reads (`director.ts:549`), so Juno was unambiguously present.

The validator does run on the fast path (`pipeline.ts:263`). The patterns are
fine. **The name matching is broken:**

```ts
// present-absence.ts:98
const names = [character.name, character.name.split(/\s+/).at(-1) ?? ''];
```

The full name and the **last** word. For `Juno Vale` that is `"Juno Vale"` and
`"Vale"`. **It never tries `"Juno"`** — the only name the prose ever uses.

Every character in Nine Weeks is first name + surname — Juno Vale, Teo Sandoval,
Nadia Okonkwo, Cass Reyner — and every line of prose calls them by the first
name. So `findAbsenceOfPresent` has never once been able to catch an absence
claim in this world. Not turn 8 (Teo), not turn 25 (Juno), not any of them.

The pattern list was never losing. It was never being consulted.

`packages/contracts/src/game/names.ts` already exports `nameKeys()`, which
returns every word of a name ≥3 chars *and* the full name, and was written for
exactly this class of bug. This call site was never converted to it. That is the
fix, and it is two lines.

### 38. Final beat: the cards wave at somebody who just left — HIGH
Turn 25's beat: *"Juno, though, is nowhere to be seen… You scan the room… but
there's no sign."* Cass confirms it out loud: *"They ducked out a minute before
you walked in."* The three cards:

1. *"I step onto the back steps… **Juno**, it's just us out here."*
2. *"I glare at the empty seat beside Cass… **Juno**, you can't just vanish."*
3. *"**I wave at Juno with a grin**, stepping closer in the dim light."*

Card 3 waves at a person the beat says is gone. This is the last turn of the run
and it is the same failure as turn 16, nine turns later, unchanged.

---

# RUN SUMMARY — 25 turns, Nine Weeks, mostly choice-driven

**Acceptance answers**

- **A — read → type anything → character visibly reacts → story continues.**
  Partial. The reading and the reacting are real and often excellent. The
  *visibly* is a no: **two hero frames in twenty-five turns** (turns 1 and 10),
  and none at all in the last fifteen.
- **B — fast enough that an OOC player doesn't think we're slower.** No, and
  worse than it looks: **every response card scores 0.44–0.62 confidence and so
  takes the 2.4s model-parse path** (#19). The fast parser exists and card play
  never touches it. `model_invocations` is empty so nothing is being measured
  (#20).
- **C — still free to do anything.** **Yes, emphatically.** Climbing on the bar
  and shouting a friend's secret across the room produced the best beat of the
  run, unrigged (#31). The caveat is that the engine recorded nothing of it.

**The one sentence version:** the writing is good, sometimes very good, and
almost every serious defect in this run is the same defect — *the engine and the
writer disagree about who is in the room, and nothing catches it.*

**Fix order, by blast radius**

1. **#37** `findAbsenceOfPresent` name matching → `nameKeys()`. Two lines.
   Unblocks the only check that guards the whole class. Do this first.
2. **#19 / #23 / #35** the intent seam. A tapped card should carry its addressee
   and its move rather than being re-parsed from prose; invitations must resolve
   as invitations and fail out loud. This one fix takes #2, #4, #23, #34 and #35
   with it, and removes the model-parse tax that fails criterion B.
3. **#11** hero-image gating. `notable` has no term a conversation world can
   satisfy, and `HERO_SPACING.VIVID = 10` caps the default player at ~2 frames a
   session. This is criterion A.
4. **#36** stop emitting `STATE_REVEAL` for resource deltas (or stop instructing
   the writer to dramatise them). Removes the stamina tic and #9, #18, #26.
5. **#12** symmetrical presence check — the writer may not place a character the
   media plan does not list, nor remove one it does.
6. **#33 / #38 / #24 / #32** regenerate cards from post-turn reality: who is
   actually in the room, what was actually refused, what has already been tried.
7. **#31** social consequence — a public scene must leave a trace in state.
8. Then the small ones: #14 singular-they agreement, #16/#30 time, #17 scroll,
   #20 telemetry, #21 chip wording, #25 false positive, #29 echoed input,
   #22 autocorrect.

---

# FIX PASS — status

Branch `main`. Commits `53d846b`, `3ea2d12`.

## Fixed and tested

| # | What | Where |
|---|---|---|
| 37 | Absence check matched "Juno Vale"/"Vale", never "Juno" — so it had never fired in this world | `present-absence.ts` → `nameKeys` |
| 12 | Writer placing a character the engine does not have in the room, now caught the same way | `present-absence.ts` `findPresenceOfAbsent`, wired in `validator.ts` |
| 19 | Cards carry their addressee; `selectedSuggestionId` (dead on the wire since the first API) now delivers it; typed input falls back to whoever spoke last | `responses.ts`, `parser.ts`, `pipeline.ts`, `turn-service.ts`, `server.ts`, `client.ts`, `Session.tsx` |
| 11 | `notable` had no term a conversation world could satisfy; VIVID spacing 10 → 5; `turnsSinceHeroImage` off by one | `director.ts`, `context.ts` |
| 36 | `STATE_REVEAL` instructed the stamina paragraph on every resource tick | `director.ts` `buildBeats` |
| 33 | Cards written from the attempt rather than the outcome (`howItWentForYou`) | `responses.ts` |
| 24 / 38 | Dialogue offered to an empty room (`youAreAlone` + `talksToNobody`) | `responses.ts` |
| — | Props invented for the player (the cigarette) | `responses.ts` policy |
| 7 | Composer placeholder — not a bug, was the a11y label | — |

New tests: `present-absence.spec.ts` (+10), `hero-frame.spec.ts` (10),
`addressee.spec.ts` (9), `responses.spec.ts` (9). Full suite and typecheck green.

## Not yet fixed

**Needs a playtest to confirm the fixes landed before doing more.** The next
run should be cheap now — read turns from Postgres, not the UI.

- **#18** `interact` on "I turn to Juno" — a DC 10 `mind` check with an energy
  cost for turning your head. The stamina *narration* is fixed; the spurious
  mutation is not. Stage-direction verbs should not roll.
- **#31** A public scene leaves no trace. Climbing on the bar and demanding a
  friend's secret in front of the whole staff produced `checks: []` and one
  `TIME_ADVANCE`. Needs a flag and an observable fact at minimum — no invented
  relationship maths. Parse confirmed: `speak→juno` + `travel→longhouse_bar` +
  a targetless `speak`, so the intent is there and the engine drops it.
- **#35** Dialogue attributions with no dialogue — should resolve with #19,
  since the empty `speakerOrder` came from Juno not being present. Verify.
- **#32** The dock card in 8 of 9 turns. `youHaveAlreadyTried` exists and was
  not honoured; may improve with `howItWentForYou`. Verify before adding code.
- **#14** "They glances" — singular-they agreement, intermittent.
- **#16 / #30** Dusk at 4:44 PM; conversation costs 12 minutes and crossing the
  camp costs 3.
- **#17** Feed scrolls back ~350pt on submit when the cards are removed.
- **#20** `model_invocations` has never had a row. No honest latency data.
- **#21** "Juno reconsiders you" for −1 respect reads as warming.
- **#25** `NAME_IDENTITY_DRIFT` false positive on "Cass stands where you left him".
- **#29** The player's own line echoed back as a NARRATION block.
- **#22** `autoCorrect` unset on the composer (defaults on) — verify on device.

## Next
Re-run Nine Weeks to ~12 turns reading from Postgres, and check specifically:
frames per turn, whether any card addresses an absent character, whether a
refusal survives into the next card set, and whether stamina prose is gone.

---

## 39. Identity setup is shown for worlds that already know who you are — HIGH

Caught by Malik on Itachi's "Who are you?" screen. In Itachi the player *is*
Itachi Uchiha — the world sheet's own premise is *"you are thirteen, you are the
best shinobi your clan has produced in a generation."* The setup screen then
asks them to type their own name, invent their appearance, and choose pronouns,
and prefills the fields with example text describing Itachi back at them
(*"Small for thirteen, lines under the eyes that nobody that age should have"*).

The game is asking the player to invent a character the story has already
written. Malik: *"doesnt sit right w me."*

Compare Nine Weeks, where it is exactly right: you are an unnamed person coming
back to a summer job, and inventing yourself is the premise.

**The distinction is protagonist authorship, and no world declares it.**

- **Blank protagonist** (Nine Weeks, Blackwake, Seven Days): name, pronouns,
  appearance and "what the world knows about you" are the point. Keep all of it.
- **Named protagonist** (Itachi, and any adaptation): the name, pronouns and
  appearance are already canon. Asking for them is a fourth-wall break on the
  first screen, before a word of prose.

What Itachi should show is **only** the archetype question, which is the one
piece that is genuinely the player's:

> *"You were four, on a battlefield, with your father. What did you take away
> from it?"* — with its excellent note that it sets what you are good at and
> decides nothing about the plot.

That is characterisation, not identity, and it is the right question. The other
three fields are the wrong ones.

Suggested shape: a `protagonist` field on the story — `BLANK` (default, current
behaviour) or `NAMED` with the canonical name, pronouns and description. On
`NAMED`, `CharacterSetup` hides the identity fields, seeds the identity from the
world, and shows the archetype question alone under a heading that fits — "What
kind of Itachi are you?" rather than "Who are you?".

Nothing about this reduces freedom: the player can still do anything once they
are in. It only stops the setup screen asking a question the story has answered.

---

# Itachi playtest — 2026-09-10

Different world, same lens: is the story coherent, does it read well, do the
images turn up and do they fit.

**The writing is the best this engine has produced.** Turn 6, unprompted:

> *"Are you coming tomorrow. Or not coming."* — no question mark, a seven-year-
> old who has stopped expecting one.
> *"There will be food in the box tomorrow. If you are here to eat it."* — Mikoto,
> saying the entire family situation without naming any of it.
> *"One hour at the posts. I want an answer now."*

### 40. Mikoto was in two places inside one beat — HIGH (FIXED)
Turn 5. The engine had her present. The prose put her at the sink draining a
pot, then had Sasuke say *"She is at the meeting"*, then closed with *"There is
no answer from the kitchen"* — four sentences apart, while the player was in the
middle of asking her a direct question.

Neither half was catchable: the absence claim used a pronoun rather than a name,
and "at the meeting" was not a phrasing `ABSENCE` knew. Both fixed; a pronoun
sentence now counts inside a block that names the character.

### 41. Sasuke was `delighted` in every beat — HIGH (FIXED)
Including the one where he says *"You talk to the air. You didn't eat."*
`pickExpression` fell through to the standing relationship, and Sasuke adores
his brother, so his affection is permanently above 45 and the picker returned
`delighted` forever. His deck contains `sulking` and `hurt` and neither was ever
reached. This turn's relationship movement now outranks the standing one.

Worth stating plainly because it generalises: **a face that never changes is
worse than no face**, because it sits next to prose that contradicts it.

### 42. A card called Sasuke "nii-san" — MEDIUM (FIXED)
Turn 6, card 1: *"That's my promise to you, nii-san."* `nii-san` means **older
brother**. Itachi *is* the older brother. The card had the player say it to the
one person in the world it cannot mean, in a world whose audience will notice
instantly.

The generator invented a term of address the story had not used. The policy now
forbids that outright: use the world's own words for who people are to each
other, or use their name.

### 43. Three cards, one answer — HIGH (FIXED, verify)
Sasuke asks a binary question — *"Are you coming tomorrow. Or not coming."* —
and demands an answer now. All three cards said yes:

1. *"I'll come tomorrow. We'll train the full hour at the posts."*
2. *"I'm here as much as I can be — no maybe's. I'm coming home."*
3. *"I'll be out for a while… but I'll come back later. You'll have your hour."*

Three tones, one answer. The player cannot decline, cannot lie, cannot stall —
in a story whose entire premise is that Itachi *cannot* keep this promise, and
whose world sheet says "Nobody is a villain". The decision was removed and
replaced with a delay.

Policy now: when somebody has just asked a two-answer question, at least one card
has to be able to disappoint them.

### Images
Working, and fitting. Turn 1 earned a frame — Itachi in the foreground with his
bag, Sasuke on the step, Mikoto at the stove, sunset through the open door, the
Uchiha crest on the wall. It matches the beat it belongs to exactly.

The **frames vanishing** problem Malik reported twice is fixed: there was one
hero slot bound to the newest turn, so an image appeared with its beat and was
gone the moment the next one landed. Frames render inline with their own turn now
and stay in history.

Still on the list: the director keeps declining frames it has *just judged worth
one* — "Worth a frame, but only 3 turns since the last one", three beats running.
`HERO_SPACING.VIVID` is 5 now, down from 10. Watch whether 5 is still too slow in
a world with 89 assets.
