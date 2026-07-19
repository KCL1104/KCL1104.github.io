# KCL1104.github.io

Bilingual (EN / 繁中) terminal-style resume, served as static files by GitHub Pages.

## Two views, one source

| | |
|---|---|
| **Terminal** (`/?view=terminal`) | The interactive version. Type commands. This is what a human gets by default. |
| **Document** (`/?view=doc`) | The whole resume expanded at once. **This is the default state of the page** — anything that does not run JavaScript (curl, ClaudeBot, GPTBot, ATS scrapers, readability extractors) receives it directly. |

Both views are produced by the *same* renderers from the *same* data, so they cannot drift.

## Editing content

All content — both languages — lives in one place: the
`<script type="application/json" id="resume-data">` island in `index.html`.

```
edit the island  →  node build.js  →  commit
```

`build.js` (zero dependencies, Node >= 18) evaluates the renderer region out of `index.html`
in Node, bakes the rendered document into `<main id="resume-doc">`, and regenerates the
JSON-LD block and `resume.md`.

**Never hand-edit between `BEGIN:GENERATED` and `END:GENERATED`.** It will be overwritten.

If you forget to run `build.js`, nothing visibly breaks: browsers re-render the document
live from the island, so only the raw bytes lag by one commit. The console logs a warning
when that happens.

### Conventions inside the island

- Prose leaves are `{ "en": "...", "zh": "..." }`. A missing `zh` falls back to `en`, and
  `build.js` lists every such leaf on stdout.
- Anything language-invariant (URLs, ids, dates, tech tokens, emails, numbers) is a bare
  string, written once. That is what makes structural drift between the two languages
  impossible.
- A literal `</script>` inside any string would truncate the island and blank the page.
  Write `<\/script`. `build.js` refuses to build if it finds one.

## Files

```
index.html    the whole app: styles, markup, data island, renderers
build.js      bakes the document view + JSON-LD + resume.md
resume.md     GENERATED - plain-text resume for agents
.nojekyll     required, else Jekyll rewrites resume.md to .html
resume/       source PDFs (EN + 中文)
```

## Local development

```sh
python3 -m http.server 8899   # then open http://localhost:8899/
```
