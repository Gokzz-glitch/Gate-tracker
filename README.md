# GATE·SPRINT

Dependency-free, static HTML/CSS/JS tracker for a focused 30-day GATE DA revision cycle. Open `index.html` directly or run `python -m http.server 8000`.

## Interleaving strategy

This is intentionally **not** four isolated subject blocks. Every day has:

1. an exact main-topic set of subtopics;
2. a short secondary revision from another area;
3. topic-matched practice; and
4. mixed PYQs plus an error-log review.

The sequence revisits each area several times, moves from foundations to mixed sets, and finishes with integrated consolidation. A learning checkbox controls the paper links under that learning row: links are visibly gated until the learning session is marked complete, so practice follows understanding rather than becoming a generic test-series list.

## Sources and verification caveat

The day cards link to stable, known resources: the GATE official question-paper archive, IndiaBix topic practice pages, StatQuest, Khan Academy, and Andrew Ng's course page. The official archive is a source, not an assertion that every year contains every listed topic. Before recording a PYQ, open the paper/PDF, verify the year and topic yourself, and log the exact question number in your notes. No exact paper section or year is claimed by this tracker.

## Storage and compatibility

Progress and notes remain in `localStorage` under `gate-sprint-v1`. The app reads the existing `done` and `notes` fields, so progress from the previous tracker continues to work. No account, API, or dependency is required. Reset removes only this tracker key.

## Gemini decision

Gemini is deliberately omitted. A static study tracker does not need a model API, and shipping a key would expose it. There is no hard-coded credential or network proxy. If an assistant is added later, it must use an explicitly user-entered key stored locally with a prominent warning that browser storage is not a secure secret vault.

## Validation

The app is plain browser JavaScript. Validate syntax with:

```bash
node --check app.js
```

Then open the page and confirm that checking a learning row enables its paper links, filtering works, and pre-existing `gate-sprint-v1` progress remains visible.
