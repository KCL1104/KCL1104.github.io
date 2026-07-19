#!/usr/bin/env node
/**
 * Bakes the static document view into index.html.
 *
 * Why this exists: an AI agent screening this resume usually does a plain HTTP GET and
 * converts HTML to text without executing JavaScript. If the resume only existed in the
 * JSON island or was only rendered at runtime, that reader would receive nothing. So the
 * fully-rendered document is written into the body as static bytes.
 *
 * How it avoids becoming a second copy of anything: it evaluates the SAME renderer region
 * out of index.html that the browser uses, in Node, with the output sink pointed at a
 * string. There is one set of renderers and one set of strings, not two.
 *
 * Usage:  node build.js
 * Then:   commit index.html + resume.md together.
 *
 * Zero dependencies, Node >= 18.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const INDEX = path.join(ROOT, 'index.html');

// Exact full-line markers. Deliberately matched with indexOf, never a regex: a regex over
// a 100KB HTML file is exactly how a build script silently eats half the document.
const ISLAND_OPEN = '<script type="application/json" id="resume-data">';
const ISLAND_CLOSE = '</' + 'script>';
const RENDER_BEGIN = '/* BEGIN:RENDERERS';
const RENDER_END = '/* END:RENDERERS */';
const DOC_BEGIN = '<!-- BEGIN:GENERATED doc-view -- DO NOT EDIT. Source: #resume-data. Run: node build.js -->';
const DOC_END = '<!-- END:GENERATED doc-view -->';
const LD_BEGIN = '<!-- BEGIN:GENERATED jsonld -- DO NOT EDIT. Source: #resume-data. Run: node build.js -->';
const LD_END = '<!-- END:GENERATED jsonld -->';

function fail(msg) {
    console.error('build.js: ' + msg);
    process.exit(1);
}

/** Returns [startOfInner, endOfInner] for content between two exact markers. */
function span(html, begin, end, what) {
    const a = html.indexOf(begin);
    if (a === -1) fail('missing marker for ' + what + ': ' + begin);
    const b = html.indexOf(end, a + begin.length);
    if (b === -1) fail('missing closing marker for ' + what + ': ' + end);
    return [a + begin.length, b];
}

const html = fs.readFileSync(INDEX, 'utf8');

// ---------------------------------------------------------------- island
const [islandStart, islandEnd] = span(html, ISLAND_OPEN, ISLAND_CLOSE, 'resume-data island');
const islandText = html.slice(islandStart, islandEnd);

// A literal "</scr"+"ipt" anywhere in the island terminates it early and blanks the page
// with no error anywhere. The JSON stays valid, the browser just stops reading. Catch it
// here rather than in production. Write it as <\/script inside the JSON string instead.
if (/<\/script/i.test(islandText)) {
    fail('#resume-data contains a literal "</scr' + 'ipt" which would truncate the island. ' +
         'Escape it as <\\/script inside the JSON string.');
}

let data;
try {
    data = JSON.parse(islandText);
} catch (e) {
    // The overwhelmingly likely cause is a literal "</scr"+"ipt" inside a string: the island
    // is sliced AT the first one, so JSON.parse sees a truncated document and reports a byte
    // offset rather than the real problem. Say the real problem out loud.
    fail('#resume-data is not valid JSON: ' + e.message +
         '\n  If this looks like an unexpected end of input, check for a literal "</scr' +
         'ipt" in one of your strings — it truncates the island. Write <\\/script instead.');
}

// ---------------------------------------------------------------- renderer region
const rbegin = html.indexOf(RENDER_BEGIN);
if (rbegin === -1) fail('missing marker: ' + RENDER_BEGIN);
const commentClose = html.indexOf('*/', rbegin);
if (commentClose === -1) fail(RENDER_BEGIN + ' comment is never closed');
const rend = html.indexOf(RENDER_END, commentClose);
if (rend === -1) fail('missing marker: ' + RENDER_END);
const rendererSrc = html.slice(commentClose + 2, rend);

let R;
try {
    R = new Function('RESUME', 'BASE_URL', rendererSrc +
        '\n; return { setLang, renderDoc, contentHash, canonicalSource, t, escapeHtml, fmtRange };'
    )(data, data.meta.canonical);
} catch (e) {
    fail('renderer region failed to evaluate in Node (it must stay DOM-free): ' + e.stack);
}

// ---------------------------------------------------------------- preflight checks
for (const [lang, rel] of Object.entries(data.meta.pdf)) {
    if (!fs.existsSync(path.join(ROOT, rel))) {
        fail('meta.pdf.' + lang + ' points at a missing file: ' + rel);
    }
}

// Bilingual coverage. A warning, not an error: Chinese is authored incrementally and a
// missing zh leaf falls back to English rather than rendering a hole. But it must be
// *visible*, otherwise the site quietly ships half-translated.
const missing = [];
(function walk(node, trail) {
    if (Array.isArray(node)) return node.forEach((v, i) => walk(v, trail + '[' + i + ']'));
    if (!node || typeof node !== 'object') return;
    if ('en' in node && typeof node.en === 'string') {
        if (node.en && !node.zh) missing.push(trail);
        return;
    }
    for (const k of Object.keys(node)) walk(node[k], trail ? trail + '.' + k : k);
})(data, '');

if (missing.length) {
    console.warn('build.js: ' + missing.length + ' leaf(s) have no Chinese, will fall back to English:');
    missing.forEach(p => console.warn('  - ' + p));
}

// ---------------------------------------------------------------- render (English only)
// The static base is ONE language. Chinese is not baked: a JS client re-renders live
// from the island via ?lang=zh (declared in the head's hreflang alternates), and no-JS
// Chinese readers have resume.md and the Chinese PDF. This is what removes the EN→ZH
// duplication from the payload every bot receives.
R.setLang('en');
const docHtml = R.renderDoc();

// Hash the island AND the renderer source. Section headings, tip lines and the banner live
// in the renderers, not the island, so an island-only hash would miss those edits entirely
// and ship a stale bake to exactly the no-JS readers this bake exists for.
const hash = R.contentHash(R.canonicalSource(data) + rendererSrc);

// ---------------------------------------------------------------- JSON-LD
// Identity, skills, education and awards ONLY. schema.org Person has no clean field for
// an employment history — that lives in resume.json (JSON Resume schema) instead.
// "<" is escaped so a stray "</script>" in any string cannot terminate the block early.
function jsonLd() {
    R.setLang('en');
    const c = data.contact;
    const person = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: data.personName,
        alternateName: data.alternateNames,
        jobTitle: R.t(data.title),
        description: R.t(data.about.intro),
        email: 'mailto:' + c.email,
        url: data.meta.canonical,
        image: data.meta.canonical + data.meta.photo,
        sameAs: [c.github, c.linkedin].filter(Boolean),
        knowsAbout: data.skills.reduce((all, g) => all.concat(g.items), []),
        knowsLanguage: data.languages.map(l => ({ '@type': 'Language', name: l.name.en })),
        award: data.about.hackathonAwards.map(a => a.en),
        alumniOf: data.education
            .filter(e => e.institutionType)
            .map(e => ({ '@type': e.institutionType, name: e.institution }))
    };
    const body = JSON.stringify(person, null, 2).replace(/</g, '\\u003c');
    return '    <script type="application/ld+json">\n' + body + '\n    </' + 'script>';
}

// ---------------------------------------------------------------- resume.json
// JSON Resume schema (jsonresume.org). English only: the schema has no bilingual story,
// and this file exists for tools that want a structured employment history.
function resumeJson() {
    R.setLang('en');
    const c = data.contact;
    const seg = (u, last) => {
        const p = new URL(u).pathname.split('/').filter(Boolean);
        return last ? p[p.length - 1] : p[0];
    };
    const resume = {
        $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
        basics: {
            name: data.personName,
            label: R.t(data.title),
            image: data.meta.canonical + data.meta.photo,
            email: c.email,
            url: data.meta.canonical,
            summary: data.about.intro.en + '\n\n' + data.about.background.en,
            location: { city: c.city, countryCode: c.countryCode },
            profiles: [
                { network: 'GitHub', username: seg(c.github), url: c.github },
                { network: 'LinkedIn', username: seg(c.linkedin, true), url: c.linkedin }
            ]
        },
        work: data.experience.map(e => ({
            name: e.company,
            position: e.title.en,
            location: e.location.en || undefined,
            startDate: e.start,
            endDate: e.end,
            summary: e.description.en
        })),
        projects: data.projects.map(p => ({
            name: p.name,
            description: p.description.en,
            startDate: p.start,
            endDate: p.end,
            url: p.demo || p.github,
            roles: [p.role.en],
            keywords: p.tech
        })),
        education: data.education.map(e => {
            // "Bachelor of Science in Computer Science" → studyType + area; anything
            // without an " in " keeps the whole title as area rather than inventing one.
            const m = /^(.+) in (.+)$/.exec(e.title.en);
            return {
                institution: e.institution,
                studyType: m ? m[1] : undefined,
                area: m ? m[2] : e.title.en,
                startDate: e.start,
                endDate: e.end
            };
        }),
        awards: data.about.hackathonAwards.map(a => ({ title: a.en })),
        skills: data.skills.map(g => ({ name: g.category.en, keywords: g.items })),
        languages: data.languages.map(l => ({ language: l.name.en, fluency: l.proficiency.en }))
    };
    return JSON.stringify(resume, null, 2) + '\n';
}

// ---------------------------------------------------------------- llms.txt
function llmsTxt() {
    R.setLang('en');
    const base = data.meta.canonical;
    return [
        '# ' + R.t(data.name),
        '',
        '> ' + R.t(data.title) + '. ' + R.t(data.about.intro),
        '',
        '## Resume',
        '',
        '- [Resume (Markdown, EN + 繁體中文)](' + base + 'resume.md): the complete resume as plain Markdown',
        '- [Resume (JSON Resume schema)](' + base + 'resume.json): structured resume, including employment history',
        '- [Resume PDF (English)](' + base + data.meta.pdf.en + ')',
        '- [Resume PDF (繁體中文)](' + base + data.meta.pdf.zh + ')',
        '',
        '## Profiles',
        '',
        '- [GitHub](' + data.contact.github + ')',
        '- [LinkedIn](' + data.contact.linkedin + ')',
        ''
    ].join('\n');
}

// ---------------------------------------------------------------- resume.md
function markdown() {
    const out = [];
    const bullet = s => '- ' + String(s).trim();

    for (const lang of ['en', 'zh']) {
        R.setLang(lang);
        const T = k => R.t(k);
        const L = (en, zh) => (lang === 'zh' ? zh : en);

        out.push('# ' + T(data.name));
        out.push('');
        out.push('**' + T(data.title) + '**');
        out.push('');
        out.push([
            data.contact.email,
            data.contact.website,
            data.contact.linkedin,
            data.contact.github
        ].join(' · '));
        out.push('');

        out.push('## ' + L('Summary', '摘要'));
        out.push('');
        out.push(T(data.about.intro));
        out.push('');
        out.push(T(data.about.background));
        out.push('');
        data.about.focus.forEach(f => out.push(bullet(T(f))));
        out.push('');
        out.push('## ' + L('Awards', '得獎紀錄'));
        out.push('');
        data.about.hackathonAwards.forEach(a => out.push(bullet(T(a))));
        out.push('');

        out.push('## ' + L('Tech Stack', '技術棧'));
        out.push('');
        data.skills.forEach(g => out.push(bullet('**' + T(g.category) + '** — ' + g.items.join(', '))));
        out.push('');

        out.push('## ' + L('AI-Native Development', 'AI-native 開發方法'));
        out.push('');
        out.push(T(data.aiNative.summary));
        out.push('');
        data.aiNative.practices.forEach(p => out.push(bullet('**' + T(p.title) + '** — ' + T(p.detail))));
        out.push('');
        out.push('## ' + L('AI-Agent Development', 'AI Agent 開發'));
        out.push('');
        out.push(T(data.aiAgents.headline));
        out.push('');
        data.aiAgents.practices.forEach(p => out.push(bullet('**' + T(p.title) + '** — ' + T(p.detail))));
        out.push('');

        out.push('## ' + L('Work Experience', '工作經歷'));
        out.push('');
        data.experience.forEach(e => {
            out.push('### ' + T(e.title) + ' — ' + e.company);
            out.push('');
            out.push('*' + R.fmtRange(e.start, e.end) + (T(e.location) ? ' · ' + T(e.location) : '') + '*');
            out.push('');
            out.push(T(e.description));
            out.push('');
            out.push(L('Tech: ', '技術：') + e.tech.join(', '));
            out.push('');
        });

        out.push('## ' + L('Projects', '專案'));
        out.push('');
        data.projects.forEach(p => {
            out.push('### ' + p.name);
            out.push('');
            out.push('*' + [T(p.role), T(p.tag), R.fmtRange(p.start, p.end)].filter(Boolean).join(' · ') + '*');
            out.push('');
            out.push(T(p.description));
            out.push('');
            out.push(L('Tech: ', '技術：') + p.tech.join(', '));
            if (p.github) out.push('GitHub: ' + p.github);
            if (p.demo) out.push('Demo: ' + p.demo);
            if (p.award) out.push(L('Award: ', '獲獎：') + T(p.award));
            out.push('');
        });

        out.push('## ' + L('Education', '學歷'));
        out.push('');
        data.education.forEach(e => {
            out.push('### ' + T(e.title) + ' — ' + e.institution);
            out.push('');
            out.push('*' + R.fmtRange(e.start, e.end) + (T(e.location) ? ' · ' + T(e.location) : '') + '*');
            out.push('');
            out.push(T(e.description));
            out.push('');
        });

        out.push('## ' + L('Languages', '語言能力'));
        out.push('');
        data.languages.forEach(l => out.push(bullet(T(l.name) + ' — ' + T(l.proficiency))));
        out.push('');

        if (lang === 'en') {
            out.push('---');
            out.push('');
        }
    }

    return out.join('\n') + '\n';
}

// ---------------------------------------------------------------- write
let next = html;

function replaceSpan(source, begin, end, replacement, what) {
    const [a, b] = span(source, begin, end, what);
    return source.slice(0, a) + replacement + source.slice(b);
}

next = replaceSpan(next, DOC_BEGIN, DOC_END, '\n' + docHtml + '\n', 'doc-view');
next = replaceSpan(next, LD_BEGIN, LD_END, '\n' + jsonLd() + '\n', 'jsonld');

// Stamp the hash in both places. Targeted string edits rather than re-serialising the
// island, so the hand-authored JSON formatting survives untouched.
// This tag sits just OUTSIDE the marker span, so unlike every other edit here it is not
// covered by span()/fail(). String.replace on a non-match returns the source unchanged and
// throws nothing, which would silently pin an old hash forever — so assert it landed.
// Assert on the PATTERN, not on whether the string changed: when content is unchanged the
// hash is identical and the replacement is a legitimate no-op.
const STAMP = /(<main\b[^>]*\bid="resume-doc"[^>]*\bdata-src-hash=")[^"]*(")/;
if (!STAMP.test(next)) {
    fail('could not stamp data-src-hash on <main id="resume-doc">. ' +
         'Did the tag get reformatted or lose its data-src-hash attribute?');
}
next = next.replace(STAMP, '$1' + hash + '$2');
next = next.replace(/"sourceHash":\s*"[^"]*"/, '"sourceHash": "' + hash + '"');

fs.writeFileSync(INDEX, next);
fs.writeFileSync(path.join(ROOT, 'resume.md'), markdown());
fs.writeFileSync(path.join(ROOT, 'resume.json'), resumeJson());
fs.writeFileSync(path.join(ROOT, 'llms.txt'), llmsTxt());

const kb = n => (n / 1024).toFixed(1) + 'KB';
console.log('build.js: baked doc-view (' + kb(docHtml.length) + '), JSON-LD, resume.md, resume.json, llms.txt');
console.log('build.js: sourceHash ' + hash);
