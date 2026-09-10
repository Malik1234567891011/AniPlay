# Working without burning the budget

Three agents on this project hit a session limit mid-task on 2026-09-10. Nothing
was lost — both had committed — but each restart pays again for everything the
dead context knew. This is how we stop doing that.

Read this once at the start of a long task. It is deliberately short; a
900-line document about saving context would be its own joke.

---

## The one principle

**Every request sends the entire conversation.** Not the last message — all of
it, every tool result you have ever received, on every turn. A one-line question
at hour six costs whatever six hours of accumulated tool output costs.

So the question is never "was that call worth it?" It is **"is that output
worth carrying for the rest of the session?"** A 4,000-token tool result you
consult once and never need again still bills on every subsequent turn.

Everything below follows from that.

---

## What actually cost us tokens (measured, this session)

Not theory. This is where a 25-turn playtest's budget went.

### 1. Reading a running app through its accessibility tree — the big one

To play one turn in the simulator I called `snapshot_ui`, read the result,
tapped, and repeated. Each snapshot came back at roughly **14–16k characters
(~3,500–4,000 tokens)**, and I needed a fresh one before nearly every tap
because element refs expire in seconds.

Almost none of it was information:

- Every snapshot listed all ~20 world cards on the Discover tab behind the
  session screen. Never once relevant. Present in all 25.
- The tool returns **each text node twice** (`e467` and `e468` are the same
  sentence). Half the payload is a literal duplicate.
- The story prose was **truncated** — I could see the last two paragraphs of a
  beat and had to scroll to read the rest, which cost another snapshot.

Mid-run I switched to reading the same turns out of Postgres — a 30-line
script against the `turns` table. Roughly **800–900 tokens per turn**, and it
carried *strictly more* than the UI did: the media plan, the beat plan, the
mutations, the repair violations, the exact check outcomes. Three of the run's
most important findings were only visible there.

**~4x cheaper and it found more bugs.** That is the whole lesson:

> When a system writes its own state somewhere queryable, read the state.
> Screenshots and accessibility trees are for checking what the *user sees* —
> layout, images, whether a thing rendered. Never for reading data.

I still took screenshots, deliberately, ~6 times in 25 turns, to answer
questions only pixels can answer ("did a hero image actually appear?").
That is the right use and it is cheap at that frequency.

### 2. Tool output you did not ask to be that big

`npm test` prints every passing test. I piped it through
`grep -E "Test Files|Tests |FAIL"` and got the same information in 8 lines.
Same for `tsc`: `> /tmp/tc.log 2>&1; echo "exit=$?"` and only read the log if
the exit code is non-zero.

Default to filtering. `head`, `tail`, `grep -c`, `--reporter=dot`, `-q`.

### 3. Re-reading files you already changed

If `Edit` succeeded, the edit is in the file. Reading it back to admire it
costs the whole file again. The harness errors on a failed edit; silence means
it worked.

### 4. Exploring instead of asking the code

`grep -n "symbol"` costs ~50 tokens. Reading four candidate files to find that
symbol costs ~8,000. When you know what you are looking for, search for it.

---

## Rules

1. **Query the database, not the UI.** Anything with a `turns`, `events` or
   `state` table. Write the read script once, into a temp file, and reuse it.
2. **Filter every command that can be verbose.** Especially test runners,
   typecheckers, installers, and `git log`.
3. **Read the range you need.** `sed -n '540,580p'` over `Read` on a
   2,000-line file. Use `Read` with `offset`/`limit` when you do use it.
4. **Never re-read a file you just wrote or edited.**
5. **Search before you read.** `grep -rn` to locate; read only the hit.
6. **One search, not five.** Batch independent lookups into a single command
   with `;` or `&&` rather than a round trip each.
7. **Screenshots are for pixels only** — layout, images, rendering. Six in a
   long session is fine; one per action is not.
8. **Delete temp scripts when done** so they never become context again.

---

## Checkpointing: turn the conversation into a document

This is the habit that actually saves a task from a dead session, and it is the
thing we were not doing.

**A finding that exists only in your conversation is one rate limit away from
being gone.** Every restart then re-derives it, at full cost.

So: **write conclusions to a file as you reach them, not at the end.**

- I logged all 38 playtest findings to `docs/25turnfix.md` *as I found them*,
  across 25 turns. When my session died the findings were on disk, and the fix
  pass started from the file instead of from a re-run of the playtest.
- Both other agents had committed their work. That is why a rate limit cost
  them a restart and not a rewrite.

A checkpoint file should hold what a *fresh* agent needs and nothing else:

```markdown
## State
Where the work actually is. Branch, last commit, what is done and verified.

## Decisions made
Conclusions and the evidence for them. This is the expensive part to re-derive —
a root cause found by reading five files is one sentence here.

## Next
The next concrete action, specific enough to start on without re-exploring.

## Dead ends
What was tried and did not work, so nobody pays for it twice.
```

Write it at natural boundaries: a phase done, a root cause found, a commit
made. Roughly **every 30–60 minutes of work, or after anything expensive to
re-derive.** It costs a few hundred tokens and it is the only thing that makes
a restart cheap.

Commit it. A checkpoint on disk in a dead worktree helps nobody.

---

## When you hit a limit

You will not always get a warning. So:

- **Commit early and often.** Working tree changes survive; conversation does
  not. A commit is a checkpoint that also happens to be code.
- **Update the checkpoint file before starting anything long**, not after.
- On restart, **read the checkpoint first** and trust it. Do not re-explore to
  confirm what it says unless something contradicts it.

---

## Session hygiene (for the human at the terminal)

From Anthropic's own guidance, the parts that apply to us:

- **`/clear` between unrelated tasks.** Free, and it drops the whole accumulated
  context. Costs nothing, unlike `/compact`, which has to read everything it
  summarizes.
- **`/compact <instruction>`** when continuity matters — e.g.
  `/compact focus on the findings and the files changed`.
- **Cache lifetime is one hour** on a subscription. A break longer than that
  means the next message reprocesses the entire context as a cache miss. Long
  gaps are expensive; a session left open overnight is worse than a fresh one.
- **Match the model to the job.** Opus for architecture and root-cause work,
  Sonnet for mechanical edits, Haiku for simple subagent tasks.
- **Keep CLAUDE.md under ~200 lines.** It loads on every session. Detailed
  workflow instructions belong in skills, which load on demand.
- **Prefer CLI tools to MCP servers** where both exist (`gh` over a GitHub MCP
  server): no per-tool definitions in context.
- **Delegate verbose operations to subagents** — the noise stays in their
  context and only the conclusion comes back.

Sources: [Manage costs effectively](https://code.claude.com/docs/en/costs),
[Sub-agents](https://code.claude.com/docs/en/sub-agents),
[Prompt caching](https://code.claude.com/docs/en/prompt-caching).
