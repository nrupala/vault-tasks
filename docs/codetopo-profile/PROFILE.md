# Codetopo Profile — Vault Tasks (nrupala/vault-tasks)

**What this is.** The agent-facing map of this repository, generated with
Codetopo 0.9.1 (local engine, `~/.cargo/bin/codetopo`) so an arriving agent
can see the machine — topology, trust boundaries, money surface — before it
submits or changes anything. Read this first; the graph snapshot beside it
(`snapshot.json`, `stats.json`) is the measured evidence.

- **Repo:** nrupala/vault-tasks
- **Commit profiled:** `8b0bd521b762dec27aa2c3cfe9e6a3a7f2b66642` (main)
- **Engine:** codetopo 0.9.1 · index run 2026-11-18
- **Graph:** 53 files walked · 0 failed · 709 nodes · 1323 edges · audit chain valid (3 entries, head `791f9bd7…1191c`)
- **Nodes by kind:** external 479 · variable 56 · file 53 · module 51 · function 29 · interface 20 · doc 16 · class 4 · package 1
- **Edges by kind:** calls 665 · contains 229 · reads 202 · defines 136 · imports 89 · writes 2

## Coverage honesty

Codetopo extracts Rust, TypeScript/JavaScript and Python, plus Markdown as Doc nodes. This repo's application code is TypeScript/TSX (15 `.ts` + 14 `.tsx` files) plus small plain-JS config (5 `.js`) and is extracted at full symbol level. The Markdown files (14 `.md` + 2 `.MD`) are indexed as Doc nodes only. NOT covered at symbol level — Capacitor platform scaffolding residuals: Java (3 files, `android/` `MainActivity.java` + tests), Swift (1 file, `ios/`), Ruby (the `ios/App/Podfile`, Ruby DSL with no `.rb` extension), Gradle build scripts (6), and XML/plist/storyboard resources — stock Capacitor shells, not application logic.

## Topology

Single-app repo (`@vault/tasks`): the focused tasks app cut from the same vault core as the parent suite.

- `src/App.tsx` + `src/components/AppShell.tsx` — React shell; `TasksApp.tsx` (hierarchical checklists, deadlines, project tracking) is the product surface, with the shared suite components (`NotesApp.tsx`, `HabitsApp.tsx`, `LedgerApp.tsx`, `CalendarApp.tsx`, `AnalyticsApp.tsx`) carried in the same tree.
- `src/lib/core/` — the vault engine: `crypto.ts` (AES-256-GCM), `db.ts` (local persistence), `useVault.ts` / `useItems.ts` / `useSettings.ts`, `useVoiceCommands.ts`, `intelligence.ts`. Tests: `src/tests/crypto.test.ts`, `stress.test.ts`.
- `src/main.tsx` — entry point; `android/` + `ios/` are Capacitor native shells; the Vite web build is the product.

## Trust boundaries

- **Local-only, zero-knowledge:** task data is encrypted on-device (`src/lib/core/crypto.ts`); no account, auth server, session or token store exists in this repo — credential-term greps hit only vault-crypto code and docs.
- **No network trust boundary in the shipped app:** data stays in local storage under the vault key; adding any sync/account layer is a design change to the stated trust model, not a patch.
- **Blast radius:** `crypto.ts` and `db.ts` — every read/write passes through them (665 call edges in the graph).

## Money surface

**No money surface found.** Greps for `stripe|paddle|checkout|billing` over all TypeScript/TSX/JS source returned no hits; there is no upgrade/license module in this repo (unlike the parent vault-tracker), no payment SDK in `package.json`, and no checkout or webhook code at the profiled commit.

## How an agent should approach

1. Read `README.md`, then this profile, then the snapshot.
2. Use `codetopo` queries against the snapshot (descendants, blast-radius,
   symbol) before editing — especially around the hubs named above.
3. Do not add credentials, account identifiers or key material to any file
   here — names and paths only. Respect the trust boundaries above as
   design constraints, not suggestions.
4. Run the repo's own tests after any change; regenerate this profile
   (below) whenever the code changes.

## Regeneration

`docs/codetopo-profile/refresh.sh` (in this pack) re-downloads the repo
at a named ref, re-runs the index, and rewrites `snapshot.json`,
`stats.json` and the header block inputs of this profile. Regenerate at
every release / material change.

Release gate: NOT RUN — Guardian Mesh: NOT RUN (this profile pack is a
documentation artifact; it is not a release-gate or Guardian Mesh verdict).
