# GATE·SPRINT

A dependency-free, static one-month study tracker for **4 focused hours per day**. It covers Speed–Time–Work, Permutations & Combinations, Probability & Statistics, and Machine Learning with daily learning tasks, question counts, and PYQ targets.

## Strategy

Use the four tasks as four 50-minute blocks, then keep the final 40 minutes for error-log review, spaced recall, or a short break. Learn a concept, solve the stated volume without notes, then do the PYQs topic-wise. Treat accuracy and an honest error log as the scorecard—not videos watched.

The two included playlists have complementary roles:

- [StatQuest — Statistics Fundamentals](https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9): intuition and visual explanations.
- [Probability Bootcamp — Steve Brunton](https://www.youtube.com/playlist?list=PLMrJAkhIeNNR3sNYvfgiKgcStwuPSts9V): mathematical probability foundations.

Use StatQuest first for a concept, then Brunton selectively when you need a derivation. Add the linked GATE papers, Andrew Ng course, and PYQ archive as practice—not as a reason to collect more resources.

## A one-month limitation (and opinion)

Thirty days is enough for a focused first pass, a useful formula/error notebook, and a baseline of timed practice; it is **not** enough to claim mastery of four broad subjects. This plan intentionally values breadth and feedback over perfect coverage. After day 30, repeat weak topics in a second cycle, increase PYQ difficulty, and add full-length mocks. If your exam is close, protect sleep and prioritize PYQs and analysis over finishing every video.

## Run locally

No build step or dependencies are required. Open `index.html` directly in a modern browser, or serve the folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`. Checkboxes and notes persist in `localStorage` on that browser/device; no account or network API is used. External resource links need internet access.

## Daily Git logging workflow

Keep the tracker and your study log together:

```bash
git init                         # once
git add index.html styles.css app.js README.md
git commit -m "chore: start GATE sprint"

# after each study day
git add .
git commit -m "study: day 07 probability bayes"
git log --oneline --decorate -10
```

Commit after a session even if the only change is a dated note in a separate `study-log.md` you maintain locally. Never commit credentials, answer keys with restricted content, or browser storage exports. Push to a remote only when you have intentionally created and secured that repository; this tracker does not create one.
