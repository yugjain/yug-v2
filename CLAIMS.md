# CLAIMS

Every number the site asserts, where it sits, and what state it is in. Nothing here has been
independently verified — the point of this file is to make each claim checkable against your own
records in one pass.

**Legend**

| | |
|---|---|
| ✅ | Single value, used consistently |
| ⚠️ | Formatting or wording variant — normalised in this pass |
| 🔁 | Repeats because it appears verbatim inside a testimonial quote (quotes are never edited) |
| ❓ | Only you can confirm it. Flagged, not changed |
| 🧮 | Derived arithmetic, not a source fact |

---

## 1. Changes made in this pass

| Old | New | Location | Why |
|---|---|---|---|
| `$10M → $13M`, `$9M+` | — | — | **Not present anywhere.** Searched `src/`, `index.html`, `public/`, `dist/`, `README`. No conflicting ARR figure existed to fix. |
| `eight years` | `ten years` | `content.ts` → essay 03 dek | Contradicted the hero's `10 yrs` (2016 start). You confirmed 10. |
| `$1M ARR portfolio` | `$1.0M ARR portfolio` | `content.ts` → role 01 `tag` | One notation for one number (`tag` is part of the row's live text). |
| `$1M ARR Salesforce` | `$1.0M ARR Salesforce` | `content.ts` → role 01 `summary` | Same. |
| `$1M+` (9 places) | `$1.0M+` | Hero headline, Elsewhere bio, testimonial 1 `org`, `index.html` description ×2, `og:description`, `twitter:description`, `noscript`, essay 01 | Same number, same notation. |
| `$1M portfolio` | `$1.0M portfolio` | `content.ts` → essay 02 §2 | Same. |
| `+30% net revenue expansion engine` | `+30% ARR expansion engine` | `content.ts` → essay 02 dek | NRR ≠ ARR. The rest of the site, and the figure you confirmed, describe ARR. |
| `Verified numbers` | `Selected results` | `Proof.tsx` → section hint | The page has no audit behind it. |
| `the numbers that survived diligence` | `the numbers, as I track them` | `content.ts` → `sectionNotes.proof` | Same. Neutral, still handwritten. |
| `Across 25+ enterprise accounts` | `Deepstash · activation redesign` | `Proof.tsx` metric 3 note | The note attached a Deepstash metric to a 2016–20 employer. Cross-employer conflation, not just duplication. |
| Hero order: `10 yrs` first | `+30%` first, retention second with `multi-year` scope | `Hero.tsx` → facts | Requested. `10 yrs` moves to third. |
| — | Optional NRR fact | `Hero.tsx` | Renders only when `pending.nrr` is filled. See OPEN_ITEMS. |

No other figures were changed. No testimonial quote was touched.

---

## 2. Money and growth

| Claim | Value | Where | State |
|---|---|---|---|
| Portfolio ARR, start | `$1.0M` | Hero headline + fact · Work 01 tag/impact/summary/bullet/stat · Proof metric 1 · testimonial 1 org · meta · OG image | ✅ |
| Portfolio ARR, now | `$1.3M` | Hero fact · Work 01 impact/bullet · Proof metric 1 note | ✅ |
| ARR growth | `+30%` | Hero fact · Work 01 stat · Proof metric 1 · testimonial 1 badge · essay 02 dek and §2 · meta | 🧮 1.0 → 1.3 = +30% · ❓ measurement window not stated on the page |
| Gross retention | `80%+` | Hero fact · Work 01 impact/bullet/stat · Proof metric 2 · essay 02 §3 · pitch note | ❓ below the usual SaaS benchmark; a reviewer will ask "80% of what, over what period?" |
| Portfolio qualifier | `$1.0M+` | Hero headline · Elsewhere bio · testimonial 1 org · meta · OG | ✅ floor, consistent with $1.3M |

## 3. Tenure

| Claim | Value | Where | State |
|---|---|---|---|
| NTT DATA | `2022 — Present` | Work row 01 | ❓ confirm "Present" is still true at publish time |
| Deepstash | `2020 — 2022` | Work row 02 | ✅ |
| Office Pulse · CoWorkingOps · WorkAmp | `2016 — 2020` | Work row 03 | ✅ |
| Total experience | `10 yrs` | Hero fact · essay 03 ("ten years") | 🧮 2016 → 2026 |

## 4. Outcomes

| Claim | Value | Where | State |
|---|---|---|---|
| Faster onboarding | `50%` | Work 02 impact/bullet/stat · Proof metric 3 · testimonial 3 quote + badge | 🔁 quote is verbatim · ❓ "from 90 days to 45?" — the page gives no baseline |
| Enterprise accounts | `25+` | Work 03 tag/impact/summary · Elsewhere bio | ❓ count and period |
| First B2B contract | `1st` | Work 02 stat | ✅ |
| QBR prep effort | `−65%` | Advisory → Firework stat | ❓ measured how? Over what sample? |

## 5. Advisory dossiers

| Claim | Value | Where | State |
|---|---|---|---|
| Mandates | `4 dossiers` | Advisory section hint | ✅ |
| Firework logos | `4` (`Samsung`, `Unilever`, `Titan`, `Bajaj Finserv`) | Advisory → Firework | ❓ protected as-is by your instruction; listed so you can check |
| HumanX logos | `5` (`BIAL`, `Amazon SmartBiz`, `SBI MF — InvesTap NXT`, `Seclore`, `Times Network`) | Advisory → HumanX | ❓ |
| Zoftware tracks | `3-track`, `30-60-90` | Advisory → Zoftware | ✅ internal framework labels |
| SmartKarrot | `Week 2`, `three core health signals` | Advisory → SmartKarrot | ❓ |
| Advisory dates | *(none)* | — | Deliberate: no year badges, per your instruction |

## 6. Writing shelf and essays

| Claim | Value | Where | State |
|---|---|---|---|
| Papers | `3` | Writing shelf | ✅ |
| Read times | `3 / 4 / 3 min` | Writing shelf, Reader | 🧮 estimates |
| Deck length | `60-slide`, `40 slides` | Essay 01 | ❓ illustrative or real? |
| Review length | `25-minute`, `3-page` | Essay 01 · Synthesizer copy | 🧮 recommendation, not a result |
| Deck-prep reduction | `80%` | Essay 01 §3 | ❓ distinct from the 80% gross retention — same number, different claim; readers may conflate them |
| Formatting time | `12 hours` | Essay 01 §3 | ❓ |
| Renewal lead time | `120 days` | How I work → step 03 | 🧮 method |
| Tenure in essay | `ten years` | Essay 03 dek | ✅ matches hero after this pass |
| Timezone engine | `24-hour` | Essay 03 §2 | 🧮 description of coverage |

## 7. Play and operational numbers

| Claim | Value | Where | State |
|---|---|---|---|
| Tempo | `92 bpm` | Guitar footer | ❓ *Stop This Train* is usually cited around 90–94; this is your number |
| Brew | `200°F`, `18g`, `60g`, `220g`, `30s`, `30 seconds` | AeroPress card | ✅ recipe |
| Retention floor | `80%` | Pitch → deep-lying pivot note | 🔁 echoes the GRR claim |
| Response time | `Reply within a day` | Contact section hint | ❓ a promise, not a fact |
| Booking length | `15 min` | Hero + contact CTAs | ✅ |
| Certifications | `4` across `2` orgs | Proof | ❓ expiry/verification not shown, by design |

## 8. Technical numbers (not claims about you)

`1200 × 630` OG image · `3` admin sections in the deck · viewport breakpoints. Listed only so the
table is complete.

---

## 9. Still unresolved

1. **Gross retention context.** `80%+` is below the ~90% SaaS benchmark a US hiring manager carries
   in their head. The page now pairs it with `multi-year contracts`, but the period and the
   calculation are not stated. Decide whether to add "over N years" or leave it.
2. **The 50% baseline.** "50% faster onboarding" has no from/to. Adding "90 → 45 days" (if true)
   would make it three times more persuasive.
3. **Two different 80%s.** Retention and deck-prep effort both use 80%. Not a conflict, but a
   skimming reader will assume they are the same metric.
4. **`+30%` window.** The page never says over what period the $1.0M → $1.3M happened.
