# First demo candidate review — 2026-10-05

Scope: whole change from briefing `8736dd2d5fae27b4679cc4f40e0f71016b50a799`, including new files. Lead performed a distinct source/capture review; this is not a claim that the independent Auditor chat reviewed it. Other lanes remain read-only and no task messages were sent.

Reviewed behavior and boundaries:

- Combat/input/touch/audio/impact are byte-identical to the accepted briefing baseline. Lab runtime is an exact copy of the original main module, with its own HTML/CSS. New scene uses the same movement, steering, partial/sticky assistance, reload/fire cadence and presentation effects.
- Pure mission owns health, three creature movement patterns, time, waves, single completion reward and second-adventure gating. Four render slots sync to mission state; dead creatures stop taking hits immediately. Reload, swap and visible reaction never stop mission progression.
- Save uses an independent device key. Purchases cannot repeat or overspend; writes are caught, and unavailable storage leaves gameplay usable with a visible warning. Save values are sanitized. Local save is prototype progression only.
- Static garden meshes are instanced by shared geometry/material. Creature slots (4), tracers/fruit pellets (16), impact particles (48), and audio voices (16) are bounded. No new runtime service/CDN/backend or paid job is needed.
- Packaging accepts only committed static runtime bytes and fingerprints each file. Release metadata names the source commit. No credentials, tests, node_modules, development server or ops scripts enter the served payload.
- Hosting operation edits only the Degree Choice vhost/current pointer, checks actual served test before archiving, compares exact copied/public hashes, validates nginx, prepares rollback, and checks fresh protected nginx/main-served identity before/after. Failed verification restores Degree Choice's previous root/config.

Findings resolved:

1. Short-screen garden overflow inherited gameplay `touch-action:none`; menu ancestors and buttons now permit vertical panning. A real CDP finger swipe scrolls the landscape card 145 pixels; gameplay still computes `touch-action:none`.
2. Initial archive verification raced asynchronous nginx reload; bounded retries allow the new worker generation to serve the route. The first failed attempt restored the original config; the completed retry verified all 13 archive files and unchanged protected state.
3. Browser effect recorder was lost on actual save/reload checks. Test now collects samples before each reload and reinstalls observation; no gameplay bypass or balance change was added.

4. Camera-vector bound asserted exact `<=8` at varying headings. The unchanged accepted clamp reproduces `8.000000000000002` (1.78e-15 rounding excess); the browser assertion now uses a 1e-9 tolerance and stores measured samples. No gameplay effect was altered.

Visual review: recovered actual desktop/two-finger/home/win/loss captures show a gardener, Blueberry/Peach weapons, three distinct creatures, sprout, garden beds/trees/fence, readable HUD and rewards. Focused revised captures confirm portrait and landscape menu/control fit. Exact passing evidence and frozen hashes are recorded in docs/dev/LAUNCH_RECEIPT.md after completion.

Remaining acceptance: physical iPhone Safari/Android two-thumb feel, zoom/safe-area behavior and frame pacing are owner/device checks. Chromium touch emulation establishes the checked rendered behavior only.
