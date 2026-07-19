# KCL1104.github.io

Bilingual (EN / 繁中) terminal-style resume, served as static files by GitHub Pages.

## Two views, one source

| | |
|---|---|
| **Terminal** (`/?view=terminal`) | The interactive version. Type commands. This is what a human gets by default. |
| **Document** (`/?view=doc`) | Clean semantic HTML (`h1`–`h3`, `section`, `article`, real links), the whole resume at once. **This is the default state of the page** — anything that does not run JavaScript (curl, ClaudeBot, GPTBot, ATS scrapers, readability extractors) receives it directly, with zero terminal decoration in the markup. |

Both views render from the *same* `#resume-data` island, so content cannot drift. The
terminal cosplay (ASCII banner, prompts, `//` headers) exists only in the terminal
renderers and CSS `::before` — never in the document markup.

The static bake is **English only**. `?lang=zh` re-renders live from the island in the
browser (declared via `hreflang` alternates in the head); no-JS Chinese readers have
`resume.md` and the Chinese PDF.

## Editing content

All content — both languages — lives in one place: the
`<script type="application/json" id="resume-data">` island in `index.html`.

```
edit the island  →  node build.js  →  commit
```

`build.js` (zero dependencies, Node >= 18) evaluates the renderer region out of `index.html`
in Node, bakes the rendered document into `<main id="resume-doc">`, and regenerates the
JSON-LD block, `resume.md`, `resume.json` (JSON Resume schema) and `llms.txt`.

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
build.js      bakes the document view + JSON-LD + resume.md + resume.json + llms.txt
resume.md     GENERATED - plain-text resume for agents (EN + 繁中)
resume.json   GENERATED - JSON Resume schema (structured employment history)
llms.txt      GENERATED - entry point for LLM crawlers
robots.txt    allows everything, points at sitemap.xml
sitemap.xml   root URL + hreflang alternates
.nojekyll     required, else Jekyll rewrites resume.md to .html
resume/       source PDFs (EN + 中文)
```

## Local development

```sh
python3 -m http.server 8899   # then open http://localhost:8899/
```
