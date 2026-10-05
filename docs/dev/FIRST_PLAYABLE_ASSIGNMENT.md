# Approved first playable — implementation packet

Owner has approved Juicy Rebels fruit/garden action and authorized the separate project plus CPU art resources. Setup is complete; the playable scene remains the next development outcome.

Lead Dev owns integration. Start from docs/JUICY_REBELS_PLAN.md and accepted combat18. Integrate src/garden.js into a separate garden/mission flow; keep a reference lab route for original combat checks. Blueberry/Peach weapons should visibly read as different fruit blasters, with accepted cadence, effects and input unchanged. Three creature silhouettes and behaviors; waves,90-second timer, health, clear victory/failure/retry, exactly-once seeds, local saved purchases, equipped berry jacket, visible plants/lantern and next adventure after two wins. Lemon attack/multiplayer are later work.

Recommended bounded specialist allocations, when user-authorized task messaging/implementation is dispatched:

- World & Art: one original low-poly fruit weapon/garden prop pilot using CPU Blender, saved .blend/GLB, neutral and actual-camera views; no shared main.js edits.
- Web & UI: garden/reward panel, readable health/timer/objectives, viewport/safe-area/touch continuity; agree IDs and state interface with Lead before edits.
- Combat: read-only parity review of accepted math/weapons/assist/effects; tune only on explicit owner feedback.
- Economy & Progression / Backend: review mission/save edge cases, exactly-once rewards and purchase reload; local save only.
- Auditor: frozen candidate review with exact source/test/package hashes, real playthrough and phone caveats.
- Deploy: frozen candidate to the dedicated Juicy release root, independent domain activation with protected-game guard and rollback; no live action before verified candidate.

Verification: meaningful logic tests, real desktop and two-finger mission play, win/replay/purchase/reload persistence, both weapons/reload, original combat parity, High/Low/Off, phone layouts, capture inspected visually, no console errors. Route substantial checks/renders through queued VPS; HF Pro CPU only for a bounded justified job with actual flavor/rate/access/persistence confirmed.

Record integration interfaces and file allocations in TEAM.md before parallel editing. This packet records approved scope; it does not silently send task messages or start a deployment.
